import { GET_PRODUCT } from '../../apollo/queries';
import { SSRQuery } from './types';

const getProduct: SSRQuery = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');

    const res = await apolloClient.query({
        query: GET_PRODUCT,
        variables: { id: ctx.query?.product[0] },
        errorPolicy: 'ignore',
    });

    return res;
};

export default getProduct;
