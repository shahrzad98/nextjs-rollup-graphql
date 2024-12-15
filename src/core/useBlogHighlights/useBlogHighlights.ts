import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BLOG_HIGHLIGHTS } from '../../apollo/queries';
import apolloError from '../../apollo/apolloError';
import { IBlogHighlights, IHighlight } from './types';

const useBlogHighlights = ({ offset = 0, limit = 10 } = {}): IBlogHighlights => {
    const { data, loading, error } = useQuery(GET_BLOG_HIGHLIGHTS, {
        variables: {
            params: {
                offset,
                limit,
            },
        },
    });

    const highlights = useMemo<IHighlight[]>(() => {
        if (!data?.customer?.getBlogHighlights) return [];
        return data.customer.getBlogHighlights.results.map((item) => ({
            ...item,
            article: {
                ...item.article,
                link: {
                    href: {
                        pathname: '/blog/[...article]',
                        query: {
                            article: [item.article.id, item.article.slug],
                        },
                    },
                },
            },
        }));
    }, [data]);

    return {
        data: highlights,
        loading,
        error: apolloError(error),
    };
};

export default useBlogHighlights;
