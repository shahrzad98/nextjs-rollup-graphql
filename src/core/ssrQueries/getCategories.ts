import { GET_CATEGORIES } from '../../apollo/queries';
import { SSRQuery } from './types';

const getCategories: SSRQuery = () => (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');
    const params = {
        has_product: true,
        all: true,
    };
    return apolloClient.query({
        query: GET_CATEGORIES,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

export default getCategories;
