import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { useMiniProduct } from '../../utils/useMiniProduct';
import useFavoritesSearchParams from './useFavoritesSearchParams';
import { useRouter } from 'next/router';
// import useStore from '../useStore/useStore';
import { GET_FAVORITES, GET_PRODUCT } from '../../apollo/queries';
import { REMOVE_FAVORITES, ADD_FAVORITES } from '../../apollo/mutations';
import { Favorites, MiniFavoriteProduct } from './types';

const useFavorites = (): Favorites => {
    const limit = 10;
    const { query } = useRouter();

    const searchParams = useFavoritesSearchParams(query);

    const {
        data: dataFavorites,
        error: fetchError,
        loading: fetchLoading,
        fetchMore,
        refetch,
    } = useQuery(GET_FAVORITES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            params: searchParams,
        },
    });
    const [removeFavorite] = useMutation(REMOVE_FAVORITES);
    const [addFavorites, { loading: addLoading }] = useMutation(ADD_FAVORITES);
    const [stateData, setStateData] = useState<any>(undefined);
    const [offset, setOffset] = useState<number>(0);
    const [addError, setAddError] = useState<ApolloError>({});
    const [removeFromFavorites] = useMutation(REMOVE_FAVORITES);

    useEffect(() => {
        if (dataFavorites) setStateData(dataFavorites);
    }, [dataFavorites]);

    const handleAddToFavorites = async (id, onCompleted, onError) => {
        setAddError({});
        await addFavorites({
            variables: { id },
            onCompleted() {
                refetch({ params: searchParams });
                onCompleted?.();
            },
            onError(e) {
                setAddError(apolloError(e));
                onError(apolloError(e));
            },
        });
    };
    const handleRemoveFavorite = async (id: string, onCompleted, onError) => {
        await removeFavorite({
            variables: { id },
            update(cache) {
                const data = JSON.parse(
                    JSON.stringify(
                        cache.readQuery({
                            query: GET_FAVORITES,
                            variables: {
                                params: searchParams,
                            },
                        }),
                    ),
                );
                data.customer.getFavoritesV2.results = data.customer.getFavoritesV2.results.filter((i) => i.id !== id);
                cache.writeQuery({
                    query: GET_FAVORITES,
                    variables: {
                        params: searchParams,
                    },
                    data,
                });
                onCompleted?.();
            },
            onError(e) {
                onError(apolloError(e));
            },
            onCompleted() {
                removeFromFavorites({
                    variables: { id: id },
                    refetchQueries: [GET_PRODUCT, 'Product'],
                });
            },
        });
    };
    const handleLoadMore = async () => {
        if (fetchError) return;
        await fetchMore({
            variables: {
                params: {
                    ...searchParams,
                    offset: offset + limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getFavoritesV2: {
                            ...previousResult.customer.getFavoritesV2,
                            count: fetchMoreResult.customer.getFavoritesV2.count,
                            next: fetchMoreResult.customer.getFavoritesV2.next,
                            results: [
                                ...previousResult.customer.getFavoritesV2.results,
                                ...fetchMoreResult.customer.getFavoritesV2.results,
                            ],
                        },
                    },
                };
            },
        });
    };

    const data = useMemo<MiniFavoriteProduct[]>(() => {
        if (stateData?.customer) {
            return stateData.customer.getFavoritesV2.results.map((item) => ({
                ...useMiniProduct(item),
                handleRemoveFavorite: (onCompleted, onError) => handleRemoveFavorite(item.id, onCompleted, onError),
            }));
        }
        return [];
    }, [stateData]);

    return {
        errors: {
            addError,
            fetchError: apolloError(fetchError),
        },
        loadings: {
            fetchLoading,
            addLoading,
        },
        data,
        handleLoadMore,
        hasMore: !!stateData?.customer.getFavoritesV2.next,
        count: stateData?.customer.getFavoritesV2.count ?? 0,
        handleAddToFavorites,
    };
};

export default useFavorites;
