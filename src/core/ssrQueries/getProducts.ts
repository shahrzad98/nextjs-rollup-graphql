import useProductsSearchParams from '../useProducts/useProductsSearchParams';
import { GET_PRODUCTS } from '../../apollo/queries';
import { ProductSearchParams } from '../useProducts';
import { SSRQuery } from './types';

const getProducts: SSRQuery<Partial<ProductSearchParams>> = (customQuery) => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');
    const params = useProductsSearchParams(customQuery ? { ...ctx.query, ...customQuery } : ctx.query);
    return await apolloClient.query({
        query: GET_PRODUCTS,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

export default getProducts;
