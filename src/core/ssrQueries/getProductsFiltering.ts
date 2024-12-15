import { GET_PRODUCT_FILTER_PARAMS } from '../../apollo/queries';
import { ProductSearchParams } from '../useProducts';
import { SSRQuery } from './types';

const getProductsFiltering: SSRQuery<Partial<ProductSearchParams>> = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');
    const params = ctx.query.categoryNames[0] ? { category: ctx.query.categoryNames[0] } : {};
    return await apolloClient.query({
        query: GET_PRODUCT_FILTER_PARAMS,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

export default getProductsFiltering;
