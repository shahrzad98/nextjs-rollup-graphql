import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export {};

declare global {
    interface Window {
        apolloClient: ApolloClient<NormalizedCacheObject>;
    }
}
