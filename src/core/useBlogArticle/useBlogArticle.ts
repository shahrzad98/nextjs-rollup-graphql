import { useMutation, useQuery } from '@apollo/client';
import { GET_BLOG_ARTICLE } from '../../apollo/queries';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { useRouter } from 'next/router';
import { LIKE_BLOG_ARTICLE } from '../../apollo/mutations';
import { useMemo, useState } from 'react';
import { isUserLoggedIn } from '../isUserLoggedIn';
import moment from 'moment-jalaali';
import { Article } from './types';

const useBlogArticle = (): Article => {
    const { query, pathname, push } = useRouter();

    const [likeError, setLikeError] = useState<ApolloError>({});

    const { data, loading, error } = useQuery(GET_BLOG_ARTICLE, {
        variables: {
            id: query.article?.length ? query.article[0] : '0',
        },
        skip: !query.article || !query.article?.length,
    });

    const [likeArticle, { loading: likeLoading }] = useMutation(LIKE_BLOG_ARTICLE);

    const handleLikeArticle = async (onCompleted) => {
        if (isUserLoggedIn()) {
            await likeArticle({
                variables: { id: query.article?.length ? query.article[0] : '0' },
                onCompleted() {
                    onCompleted?.();
                },
                onError(e) {
                    setLikeError(apolloError(e));
                },
            });
        } else {
            await push({
                pathname: '/auth/login',
                query: {
                    ...query,
                    _back_to: pathname,
                },
            });
        }
    };

    const article = useMemo<Article['data']>(() => {
        if (!data?.customer?.getBlogArticle) return undefined;
        return {
            ...data.customer.getBlogArticle,
            published_at: data.customer.getBlogArticle?.published_at
                ? moment(data.customer.getBlogArticle.published_at).format('jYYYY/jMM/jDD HH:mm:ss')
                : '',
        };
    }, [data]);

    return {
        data: article,
        like: {
            loading: likeLoading,
            handleClick: async (onCompleted) => await handleLikeArticle(onCompleted),
            error: apolloError(likeError),
        },
        error: apolloError(error),
        loading,
    };
};

export default useBlogArticle;
