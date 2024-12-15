/* eslint-disable no-case-declarations */
import { ApolloClient, from, InMemoryCache, NormalizedCacheObject, TypePolicies } from '@apollo/client';
import { useMemo } from 'react';
import cache from './cache';
import cacheIntegration from '../utils/cacheIntegration';
import { createUploadLink } from 'apollo-upload-client';
import { FieldPolicy, FieldReadFunction } from '@apollo/client/cache/inmemory/policies';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { setNextCookie } from '../utils/authenticationHandler/nextCookie';
import { handleRefreshToken } from '../utils/authenticationHandler/handleRefreshToken';

interface LimitedApolloConfig extends TypePolicies {
    Query: {
        fields: {
            [fieldName: string]: FieldPolicy | FieldReadFunction;
        };
    };
}

export interface ApolloConfig {
    uri: string;
    inMemoryCacheConfig: {
        typePolicies: LimitedApolloConfig;
    };
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
export let apolloLocalState: InMemoryCache;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const getNewToken = async () => {
    const token = await handleRefreshToken();
    if (!token) return '';
    else return token;
};

const authLink = setContext((_, { headers }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    return {
        headers: {
            ...(token && { authorization: `Bearer ${token}` }),
            ...headers,
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            switch (err.extensions.code) {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver
                case 'UNAUTHENTICATED':
                    // Modify the operation context with a new token
                    const oldHeaders = operation.getContext().headers;
                    (async () => {
                        const newToken = await getNewToken();

                        if (newToken) {
                            setNextCookie(newToken);

                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: `Bearer ${newToken}`,
                                },
                            });
                            // Retry the request, returning the new observable
                            return forward(operation);
                        }
                    })();
            }
        }
    }

    if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
    }
});

const retryLink = new RetryLink({
    delay: {
        initial: 400,
        max: Infinity,
        jitter: true,
    },
    attempts: {
        max: 6,
        retryIf: (error) => {
            return !!error.networkError;
        },
    },
});
const createApolloClient = (storeId: number, apolloConfig: ApolloConfig) => {
    if (!apolloConfig) throw new Error('apolloConfig is required!');

    apolloLocalState = cache(storeId, apolloConfig);

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        connectToDevTools: process.env.NODE_ENV !== 'production',
        link: from([
            errorLink,
            authLink,
            retryLink,
            createUploadLink({
                uri: apolloConfig.uri,
                credentials: 'same-origin',
                headers: {
                    storeid: storeId,
                },
            }),
        ]),
        cache: apolloLocalState,
    });
};

export const initializeApollo = (
    storeId: number,
    initialState: NormalizedCacheObject | null = null,
    apolloConfig: ApolloConfig,
): ApolloClient<NormalizedCacheObject> => {
    const _apolloClient = apolloClient ?? createApolloClient(storeId, apolloConfig);

    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore(cacheIntegration(initialState, existingCache));
    }

    // create new apollo and remove cache when window is undefined
    if (typeof window === 'undefined') {
        return _apolloClient;
    }

    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>) => {
    return { [APOLLO_STATE_PROP_NAME]: client.cache.extract() };
};

export const useApollo = (appProps: any, apolloConfig: ApolloConfig, _storeId) => {
    const storeId = _storeId ? parseInt('' + _storeId) : 0;
    const state = appProps[APOLLO_STATE_PROP_NAME];
    return useMemo<ApolloClient<NormalizedCacheObject>>(
        () => initializeApollo(storeId, state, apolloConfig),
        [storeId, state],
    );
};
