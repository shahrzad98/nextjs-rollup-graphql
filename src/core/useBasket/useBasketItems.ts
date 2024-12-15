import { useMemo } from 'react';
import apolloError from '../../apollo/apolloError';
import useStore from '../useStore/useStore';
import handleCreateOptionValue from '../../utils/handleCreateOptionValue';
import { BasketItems, ProductItems } from './types';

const useBasketItems = (): BasketItems => {
    const { basket } = useStore();

    const basketItems = useMemo<ProductItems[]>(() => {
        const _items: ProductItems[] = [];

        for (const item of basket.data.items) {
            const {
                id,
                amount,
                product_id,
                online_cost,
                has_loyalty,
                online_primary_cost,
                variant_name,
                image,
                variant_id,
                bonus_value,
                product_label,
                option_values,
                orderable_count,
                single_tax,
            } = item;

            _items.push({
                id,
                image: image?.image ?? '',
                product_label,
                product_id,
                amount,
                single_tax,
                online_cost,
                online_primary_cost,
                has_loyalty,
                tax: single_tax * amount,
                bonus_value,
                link: {
                    href: {
                        pathname: '/product/[...product]',
                        query: {
                            product: [product_id, product_label?.replace(/ /gi, '-')],
                        },
                    },
                },
                optionValue: option_values
                    ? option_values?.some((item) => item.option)
                        ? handleCreateOptionValue(option_values)
                        : option_values
                    : [],
                variant: {
                    variant_name,
                    variant_id,
                    orderable_count,
                },
                handleIncrementAmount: () => basket.handleItemsAmount(variant_id, 'increment'),
                handleDecrementAmount: () => basket.handleItemsAmount(variant_id, 'decrement'),
                handleRemove: () => basket.handleItemsAmount(variant_id, 'remove'),
                handleAddToFavorites: (onCompleted) => basket.handleAddToFavorites(product_id, variant_id, onCompleted),
            });
        }

        return _items;
    }, [basket.data.items]);

    return {
        loading: !basket.initialSync,
        error: apolloError({}),
        products: basketItems,
    };
};

export default useBasketItems;
