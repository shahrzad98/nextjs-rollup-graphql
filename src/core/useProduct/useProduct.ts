import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../apollo/queries';
import apolloError from '../../apollo/apolloError';
import { useRouter } from 'next/router';
import useVariants from './useVariants';
import { Product, Variant } from './types';
import useImages from './useImages';
import { useMemo } from 'react';
import { useStore } from '../useStore';
import handleCreateOptionValue from '../../utils/handleCreateOptionValue';
import { ADD_FAVORITES, REMOVE_FAVORITES } from '../../apollo/mutations';
import { isUserLoggedIn } from '../isUserLoggedIn';

const useProduct = (): Product => {
    const { query } = useRouter();
    const { basket } = useStore();

    const {
        data: d,
        loading,
        error,
    } = useQuery(GET_PRODUCT, {
        variables: {
            id: query.product?.length ? query.product[0] : '0',
        },
        skip: !query.product || !query.product?.length,
    });

    const product = d?.customer.getProduct;

    const data = useMemo<NonNullable<typeof product>>(() => {
        return product || <NonNullable<typeof product>>{};
    }, [product]);

    const [addToFavorites, { loading: addFavoriteLoading }] = useMutation(ADD_FAVORITES);
    const [removeFromFavorites, { loading: removeFavoriteLoading }] = useMutation(REMOVE_FAVORITES);

    const { options, selectedVariant, handleSelectedVariant, variants, handleOptionValueIsSelected } =
        useVariants(product);

    const { images } = useImages(product);
    const {
        label,
        voter_number,
        average_score,
        profit_percent,
        productId,
        category,
        tax,
        has_loyalty_gift,
        feedback_count,
        single_tax,
    } = useMemo(() => {
        return {
            productId: data?.id,
            category: data?.category,
            tax: data?.tax,
            label: data?.label,
            voter_number: data?.voter_number,
            average_score: Math.round((data?.average_score || 0) * 10) / 10,
            profit_percent: data?.profit_percent,
            feedback_count: data?.feedback_count,
            has_loyalty_gift: data?.has_loyalty_gift,
            single_tax: data?.tax,
        };
    }, [data]);

    // const { data: favoriteData } = useQuery(queries.IS_FAVORITE, {
    //     skip: !isUserLoggedIn() || !productId,
    //     variables: { id: productId },
    // });

    const handleAddToBasket = (onCompleted) => {
        if (selectedVariant && !!Object.keys(selectedVariant)?.length) {
            basket.handleAddToBasket({
                image: selectedVariant?.images?.length ? selectedVariant?.images[0] : images[0],
                amount: 1,
                product_label: label,
                bonus_value: 0,
                has_loyalty_gift: has_loyalty_gift,
                tax: tax ? tax : 0,
                product_id: productId,
                option_values: handleCreateOptionValue(selectedVariant?.option_values || []),
                online_cost: selectedVariant?.cost,
                online_primary_cost: selectedVariant?.primary_cost,
                variant_id: +selectedVariant?.id,
                variant_name: label,
                orderable_count: selectedVariant?.orderable_count,
                single_tax: single_tax,
            });
            onCompleted?.();
        }
    };

    const addOrRemoveToFavorites = async () => {
        if (productId && isUserLoggedIn()) {
            if (data?.is_favorite)
                await removeFromFavorites({
                    variables: { id: productId },
                    refetchQueries: [GET_PRODUCT, 'Product'],
                });
            else
                await addToFavorites({
                    variables: { id: productId },
                    refetchQueries: [GET_PRODUCT, 'Product'],
                });
        }
    };

    const stockUpdatedSelectedVariant = useMemo<Variant | null>(() => {
        if (!selectedVariant) return null;
        const itemInBasket = basket.data.items.find((item) => item?.variant_id == selectedVariant?.id);

        if (itemInBasket) return { ...selectedVariant, orderable_count: itemInBasket?.orderable_count };
        return selectedVariant;
    }, [selectedVariant, basket.data.items]);

    return {
        data: {
            images,
            category,
            options,
            selectedVariant: stockUpdatedSelectedVariant,
            variants,
            label,
            voter_number,
            feedback_count,
            average_score,
            profit_percent,
            description: data?.description,
            features: data?.features,
            is_favorite: !!data?.is_favorite,
        },
        handleSelectedVariant,
        handleOptionValueIsSelected,
        handleAddToBasket,
        updateBasketLoading: basket.updateBasketLoading,
        addOrRemoveToFavorites,
        favoriteLoading: addFavoriteLoading || removeFavoriteLoading,
        loading,
        error: apolloError(error),
    };
};

export default useProduct;
