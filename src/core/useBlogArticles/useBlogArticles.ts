import { useMemo, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_BLOG_ARTICLES } from '../../apollo/queries';
import apolloError from '../../apollo/apolloError';
import { usePagination } from '../../utils/usePagination';
import { useRouter } from 'next/router';
import useDidUpdateEffect from '../../utils/useDidUpdateEffect';
import moment from 'moment-jalaali';
import { IArticle, IBlogArticles, Search } from './types';

const useBlogArticles = ({ offset = 0, limit = 10 } = {}): IBlogArticles => {
    const { query, pathname, replace } = useRouter();

    const [_search, setSearch] = useState<string>('');

    const [_offset, setOffset] = useState<number>(offset);
    const _limit = limit;

    const { data, loading, error, fetchMore, networkStatus } = useQuery(GET_BLOG_ARTICLES, {
        notifyOnNetworkStatusChange: true,
        variables: {
            params: {
                offset: query.page ? (+query.page - 1) * _limit : offset,
                limit: _limit,
                search: query.search ? decodeURIComponent(query.search as string) : undefined,
            },
        },
    });

    useDidUpdateEffect(() => {
        const timeout = setTimeout(async () => {
            if (_search) {
                await replace(
                    {
                        pathname,
                        query: {
                            ...query,
                            page: 1,
                            search: encodeURIComponent(_search),
                        },
                    },
                    undefined,
                    { shallow: true },
                );
            } else {
                delete query.search;
                await replace(
                    {
                        pathname,
                        query: {
                            ...query,
                            page: 1,
                        },
                    },
                    undefined,
                    { shallow: true },
                );
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [_search]);

    const pagination = usePagination(data?.customer?.getBlogArticles, undefined, _limit);

    const handleLoadMore = async () => {
        if (error || loading) return;
        await fetchMore({
            variables: {
                params: {
                    offset: _offset + _limit,
                    limit: _limit,
                    search: query.search ? decodeURIComponent(query.search as string) : undefined,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + _limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getBlogArticles: {
                            ...previousResult.customer.getBlogArticles,
                            count: fetchMoreResult.customer.getBlogArticles.count,
                            next: fetchMoreResult.customer.getBlogArticles.next,
                            results: [
                                ...previousResult.customer.getBlogArticles.results,
                                ...fetchMoreResult.customer.getBlogArticles.results,
                            ],
                        },
                    },
                };
            },
        });
    };

    const articles = useMemo<IArticle[]>(() => {
        if (!data?.customer?.getBlogArticles) return [];
        return data.customer.getBlogArticles.results.map((article) => ({
            ...article,
            published_at: article.published_at ? moment(article.published_at).format('jYYYY/jMM/jDD HH:mm:ss') : '',
            link: {
                href: {
                    pathname: '/blog/[...article]',
                    query: {
                        article: [article.id, article.slug],
                    },
                },
            },
        }));
    }, [data]);

    const search = useMemo<Search>(() => {
        return {
            value: _search,
            handleChange: (value) => setSearch(value),
            handleClear: () => setSearch(''),
        };
    }, [_search]);

    return {
        data: articles,
        search,
        loading: loading || networkStatus === NetworkStatus.fetchMore,
        error: apolloError(error),
        handleLoadMore,
        hasMore: !!data?.customer.getBlogArticles.next,
        count: data?.customer.getBlogArticles.count ?? 0,
        pagination,
        next: data?.customer.getBlogArticles.next,
    };
};

export default useBlogArticles;
