import { GET_BLOG_HIGHLIGHTS } from '../../apollo/queries';
import { SSRQuery } from './types';

const getBlogHighlights: SSRQuery = () => (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');
    const params = {
        offset: 0,
        limit: 10,
    };
    return apolloClient.query({
        query: GET_BLOG_HIGHLIGHTS,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

export default getBlogHighlights;
