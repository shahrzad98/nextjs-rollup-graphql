import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@apollo/client';

export type SSRQuery<TCustomData = any, TQueryResult = any> = (
    customData?: TCustomData,
) => (apolloClient: ApolloClient<NormalizedCacheObject>, ctx?: any) => Promise<any | ApolloQueryResult<TQueryResult>>;

export type SSRQueries<TQueryResult = any> = (
    apolloClient: ApolloClient<NormalizedCacheObject>,
    ctx?: any,
) => Promise<any | ApolloQueryResult<TQueryResult>>;
