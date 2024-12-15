import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_FEEDBACK } from '../../apollo/queries';
import { useRouter } from 'next/router';
import apolloError from '../../apollo/apolloError';
import { useState } from 'react';
import { Options, ProductFeedback } from './types';

const useProductFeedback = (options?: Partial<Options>): ProductFeedback => {
    const [page, setPage] = useState<number>(1);

    const initOptions = (options?: Partial<Options>): Options => {
        const defaults: Options = {
            offset: 0,
            limit: 10,
        };

        return {
            ...defaults,
            ...options,
        };
    };

    const { query } = useRouter();

    const { limit, offset } = initOptions(options);

    const { data, loading, error, fetchMore, refetch } = useQuery(GET_PRODUCTS_FEEDBACK, {
        notifyOnNetworkStatusChange: true,
        variables: {
            productId: query.product?.length ? query.product[0] : '0',
            params: {
                offset,
                limit,
            },
        },
        skip: !query.product || !query.product?.length,
    });

    const pageHandlerDesktop = async (page: number) => {
        await refetch({
            productId: query.product?.length ? query.product[0] : '0',
            params: {
                offset: (page - 1) * 10,
                limit: 10,
            },
        });
    };

    const paginationHandler = async (page: number) => {
        const newOffset = (page - 1) * limit;

        setPage(page);
        const pagesNumberFetchBefore: number = (data?.customer.getProductFeedback?.results?.length || 0) / limit;

        if (page > pagesNumberFetchBefore) {
            await fetchMore({
                variables: {
                    params: {
                        offset: newOffset,
                        limit,
                    },
                },

                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    const newData = {
                        ...prev,
                        customer: {
                            ...prev.customer,
                            getProductFeedback: {
                                ...prev.customer.getProductFeedback,
                                results: [
                                    ...prev.customer.getProductFeedback.results,
                                    ...fetchMoreResult.customer.getProductFeedback.results,
                                ],
                            },
                        },
                    };
                    return Object.assign({}, prev, newData);
                },
            });
        }
    };

    return {
        data: {
            pages: Array.from(
                {
                    length: +(data?.customer.getProductFeedback.count || 0) / limit || 1,
                },
                (_, i) => i + 1,
            ),
            page,
            resultsPerPage:
                data?.customer.getProductFeedback?.results.slice((page - 1) * limit, (page - 1) * limit + limit) || [],
            results: data?.customer.getProductFeedback?.results ?? [],
            count: data?.customer.getProductFeedback?.count ?? 0,
        },
        loading: loading,
        pageHandlerDesktop,
        error: apolloError(error),
        paginationHandler,
    };
};

export default useProductFeedback;
