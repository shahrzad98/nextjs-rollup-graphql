import { GET_SUGGESTION_PRODUCTS } from '../../apollo/queries';
import { SSRQuery } from './types';

const getSuggestionProducts: SSRQuery = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');
    if (!ctx.query.product || !ctx.query.product?.length) throw new Error('ProductId is required!');

    const params = {
        offset: 0,
        limit: 20,
        productId: ctx.query?.product[0],
    };
    const data = await apolloClient.query({
        query: GET_SUGGESTION_PRODUCTS,
        variables: { ...params },
        errorPolicy: 'ignore',
    });

    return data;
};

export default getSuggestionProducts;
