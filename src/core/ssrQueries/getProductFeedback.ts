import { GET_PRODUCTS_FEEDBACK } from '../../apollo/queries';
import { SSRQuery } from './types';

const getProductFeedback: SSRQuery =
    ({ limit = 10, offset = 0 }) =>
    async (apolloClient, ctx) => {
        if (typeof ctx === 'undefined') throw new Error('Context is required!');

        const res = await apolloClient.query({
            query: GET_PRODUCTS_FEEDBACK,
            variables: { productId: ctx.query?.product[0], params: { limit, offset } },
            errorPolicy: 'ignore',
        });

        return res;
    };

export default getProductFeedback;
