import { GET_PROFILE } from '../../apollo/queries';
import { SSRQuery } from './types';

const getProfile: SSRQuery = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');

    const { req } = ctx;

    if (req) {
        const { n_access } = req.cookies;
        if (n_access) {
            return apolloClient.query({
                errorPolicy: 'ignore',
                query: GET_PROFILE,
                context: {
                    headers: {
                        authorization: `Bearer ${n_access}`,
                    },
                },
            });
        }
    }
};

export default getProfile;
