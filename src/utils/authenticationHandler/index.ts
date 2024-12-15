import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import privatePathHandler from './privatePathHandler';
import guestOnlyPathHandler from './guestOnlyPathHandler';
import { isUserLoggedIn } from '../../core/isUserLoggedIn';

interface AuthenticationHandler {
    (appContext: any, apolloClient: ApolloClient<NormalizedCacheObject>): Promise<void>;
}

interface Configs {
    private: boolean | { [key: string]: string[][] | string[] };
    guestOnly: boolean;
}

const authenticationHandler: AuthenticationHandler = async (appContext: any) => {
    const configs: Configs = {
        private: false,
        guestOnly: false,
        ...(appContext.Component.setPageConfig ?? appContext.ctx.setPageConfig ?? {}),
    };

    const canCheckAuthentication = (config) => {
        if (config === true) return true;
        if (typeof config === 'object' && !Array.isArray(config)) {
            const { query } = appContext.ctx;
            if (!Object.keys(query).length) return false;
            for (const queryConfigKey in config) {
                if (!query[queryConfigKey]) return false;
                for (const queryConfigValue of config[queryConfigKey]) {
                    if (!Array.isArray(query[queryConfigKey]) && Array.isArray(queryConfigValue))
                        throw new Error('Dynamic query config format cannot match query type');
                    if (Array.isArray(query[queryConfigKey]) && !Array.isArray(queryConfigValue)) {
                        throw new Error(
                            'Dynamic route format cannot match query config type' +
                                '\nRead more about dynamic routes:\n' +
                                '\nhttps://nextjs.org/docs/routing/dynamic-routes#catch-all-routes',
                        );
                    }
                    if (Array.isArray(queryConfigValue)) {
                        return queryConfigValue.every((q) => query[queryConfigKey]?.includes(q));
                    } else {
                        return configs[queryConfigKey].includes(query[queryConfigKey]);
                    }
                }
            }
            return false;
        }
        return false;
    };
    const authenticated = isUserLoggedIn();

    if (configs.private && configs.guestOnly) {
        throw new Error('A page cannot be both guestOnly and private at the same time.');
    }

    if (configs.private && canCheckAuthentication(configs.private)) {
        await privatePathHandler(appContext, authenticated);
    }
    if (configs.guestOnly && canCheckAuthentication(configs.guestOnly)) {
        await guestOnlyPathHandler(appContext, authenticated);
    }
};

export default authenticationHandler;
