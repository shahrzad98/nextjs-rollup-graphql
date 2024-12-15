import { GET_APPEARANCE } from '../../apollo/queries';
import { SSRQuery } from './types';

const getAppearance: SSRQuery = () => (apolloClient) => {
    return apolloClient.query({
        errorPolicy: 'ignore',
        query: GET_APPEARANCE,
    });
};

export default getAppearance;
