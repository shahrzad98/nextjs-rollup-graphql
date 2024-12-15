import { SSRQuery } from './types';
import { GET_USER_TYPE } from '../../apollo/queries';

const getUserType: SSRQuery = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');

    const { req } = ctx;

    if (req) {
        const { n_access } = req.cookies;
        if (n_access)
            return apolloClient.query({
                errorPolicy: 'ignore',
                query: GET_USER_TYPE,
                context: {
                    headers: {
                        authorization: `Bearer ${n_access}`,
                    },
                },
            });
    }
};

export default getUserType;
