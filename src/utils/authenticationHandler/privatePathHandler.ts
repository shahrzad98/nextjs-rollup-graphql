import qs from 'query-string';
import Router from 'next/router';

const privatePathHandler = async (appContext: any, isAuthenticated: boolean): Promise<void> => {
    const {
        ctx: { req, res, pathname, query },
    } = appContext;

    const isServer = typeof window === 'undefined' && !!req;

    const redirectToLogin = async () => {
        if (isServer) {
            res.statusCode = 302;
            res.setHeader('Location', `/auth/login?_back_to=${pathname}&${qs.stringify(query)}`);
            res.end();
        } else {
            await Router.push({
                pathname: '/auth/login',
                query: {
                    ...query,
                    _back_to: pathname,
                },
            });
        }
    };

    if (!isAuthenticated) await redirectToLogin();
};

export default privatePathHandler;
