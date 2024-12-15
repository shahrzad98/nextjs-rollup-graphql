import * as React from 'react';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import StoreProvider from '../core/useStore/StoreProvider';
import { Customization } from '../core';

interface ThemeProviderProps {
    children: any;
    apolloClient: ApolloClient<NormalizedCacheObject>;
    customization: Customization;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    return (
        <ApolloProvider client={props.apolloClient}>
            <StoreProvider customization={props.customization}>{props.children}</StoreProvider>
        </ApolloProvider>
    );
};

export default ThemeProvider;
