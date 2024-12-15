import { initializeApollo } from '../apollo/apolloClient';
import { GET_SITE_MAP } from '../apollo/queries';

export const siteMap = async (storeId, themeConfig): Promise<string> => {
    const apolloClient = initializeApollo(storeId, null, themeConfig.apollo);
    const {
        data: { customer },
    } = await apolloClient.query({
        query: GET_SITE_MAP,
    });

    return customer?.getSitemap;
};
