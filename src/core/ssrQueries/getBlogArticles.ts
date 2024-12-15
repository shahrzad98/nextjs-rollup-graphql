import { GET_BLOG_ARTICLES } from '../../apollo/queries';
import { SSRQuery } from './types';

const getBlogArticles: SSRQuery = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined') throw new Error('Context is required!');
    const params = {
        offset: +ctx.query?.page ? +ctx.query?.page * 10 - 10 : 0,
        limit: 10,
        search: ctx.query?.search,
    };

    return await apolloClient.query({
        query: GET_BLOG_ARTICLES,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

export default getBlogArticles;
