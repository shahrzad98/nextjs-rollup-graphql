import { GET_STORE_INFO } from '../../apollo/queries';
import { SSRQuery } from './types';

const getStoreInfo: SSRQuery = () => (apolloClient) => {
    return apolloClient.query({
        errorPolicy: 'ignore',
        query: GET_STORE_INFO,
    });
};

export default getStoreInfo;
