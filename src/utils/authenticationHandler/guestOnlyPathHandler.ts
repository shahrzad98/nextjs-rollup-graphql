import Router from 'next/router';

const guestOnlyPathHandler = async (appContext: any, isAuthenticated: boolean): Promise<void> => {
    const {
        ctx: { req, res },
    } = appContext;

    const isServer = typeof window === 'undefined' && !!req;

    const redirectToRequestedPath = async () => {
        if (isServer) {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        } else {
            await Router.back();
        }
    };

    if (isAuthenticated) {
        await redirectToRequestedPath();
    }
};

export default guestOnlyPathHandler;
