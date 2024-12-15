import React from 'react';
import App from 'next/app';
import cacheIntegration from '../../utils/cacheIntegration';
import authenticationHandler from '../../utils/authenticationHandler';
import { SSRQueries, ssrQueries } from '../ssrQueries';
import ThemeProvider from '../../components/ThemeProvider';
import { addApolloState, initializeApollo, useApollo } from '../../apollo/apolloClient';
import Cookies from 'cookies';
import { getCookie, setCookie } from '../../utils/cookies';
import { ThemeConfig } from './types';
import Router from 'next/router';

const initializeApp = (
    Component: any,
    themeConfig: ThemeConfig,
    queries: SSRQueries[] = [
        ssrQueries.getAppearance(),
        ssrQueries.getStoreInfo(),
        ssrQueries.getProfile(),
        ssrQueries.getCategories(),
        ssrQueries.getUserType(),
        themeConfig.customization?.schema && ssrQueries.getThemeCustomization(themeConfig.customization),
    ].filter(Boolean),
) => {
    const MyApp = (props) => {
        const client = useApollo(props.pageProps, themeConfig.apollo, props.storeId);

        return (
            <ThemeProvider customization={themeConfig.customization} apolloClient={client}>
                <Component {...props} />
            </ThemeProvider>
        );
    };

    MyApp.getInitialProps = async (appContext) => {
        const { ctx } = appContext;
        const isServer = !!ctx.req;

        const routes = ctx.asPath.split('/');
        const firstRoute = routes[1];

        if (+firstRoute) {
            let _asPath = ctx.asPath.replace('/', '');
            _asPath = _asPath.replace(firstRoute, '');
            _asPath = _asPath || '/';

            if (isServer) {
                ctx.res.writeHead(307, { Location: _asPath });
                ctx.res.end();
            } else Router.replace(_asPath);
            return;
        }

        let _storeId = '';
        if (process.env.STORE_ID) _storeId = process.env.STORE_ID;
        else {
            if (isServer) {
                if (ctx?.req?.headers?.['store-id']) _storeId = ctx?.req?.headers?.['store-id'];
                else {
                    const cookies = new Cookies(ctx.req, ctx.res);
                    const cookieStoreId = cookies.get('storeId');
                    if (cookieStoreId) _storeId = cookieStoreId;
                }
            } else {
                const clientCookieStoreId = getCookie('storeId');
                if (clientCookieStoreId) _storeId = `${clientCookieStoreId}`;
            }
        }

        if (!themeConfig?.apollo) {
            throw new Error('You must configure apollo in themeConfig file.');
        }
        if (!themeConfig?.customization?.config?.themeName) {
            throw new Error('You must set themeName in themeConfig file.');
        }

        if (_storeId) {
            const apolloClient = initializeApollo(+_storeId, null, themeConfig.apollo);
            ctx.apolloClient = apolloClient;

            if (isServer) {
                const cookies = new Cookies(ctx.req, ctx.res);
                cookies.set('storeId', _storeId, { httpOnly: false });
            } else setCookie('storeId', _storeId);

            await Promise.all(queries.map((query) => query(apolloClient, ctx)));

            await authenticationHandler(appContext, apolloClient);

            const initialThemeData = addApolloState(apolloClient);

            const appProps = await App.getInitialProps(appContext);

            return {
                pageProps: cacheIntegration(initialThemeData, appProps.pageProps ?? {}),
                storeId: +_storeId,
            };
        } else {
            return {
                pageProps: {
                    statusCode: 404,
                },
            };
        }
    };

    return MyApp;
};

export default initializeApp;
