import { defaultDataIdFromObject, InMemoryCache } from '@apollo/client';
import cacheIntegration from '../utils/cacheIntegration';
import { ApolloConfig } from './apolloClient';
import { customizationSchemaVar } from './vars';

export const cache = (storeId: number, apolloConfig: ApolloConfig) => {
    return new InMemoryCache({
        dataIdFromObject(responseObject) {
            switch (responseObject.__typename) {
                case 'CustomerQuery':
                    return `CustomerQuery:${storeId}`;
                case 'CustomerMutation':
                    return `CustomerMutation:${storeId}`;
                default:
                    return defaultDataIdFromObject(responseObject);
            }
        },
        typePolicies: {
            Query: {
                fields: cacheIntegration(apolloConfig?.inMemoryCacheConfig?.typePolicies?.Query?.fields ?? {}, {
                    customizationSchema: {
                        read() {
                            return customizationSchemaVar();
                        },
                    },
                }),
            },
            TransactionTypes: {
                keyFields: ['gateway_type'],
            },
        },
    });
};

export default cache;
