import { GET_BLOG_ARTICLE } from '../../apollo/queries';
import { SSRQuery } from './types';

const getBlogArticle: SSRQuery = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');

    const res = await apolloClient.query({
        query: GET_BLOG_ARTICLE,
        variables: { id: ctx.query?.article[0] },
        errorPolicy: 'ignore',
    });

    return res;
};

export default getBlogArticle;
