import { useEffect, useState, useMemo, useCallback } from 'react';
import { MiniProduct } from '../../utils/useMiniProduct';
import { useOrderDetail } from '../useOrderDetail';
import { IUseSelectableOrder, TSelectableOrder } from './types';

const useSelectableOrder = (): IUseSelectableOrder => {
    const { error, loading, data } = useOrderDetail();
    const {
        items: { items: products },
        orderId,
        status,
    } = data;
    const [selectableItems, setSelectableItems] = useState<TSelectableOrder[]>([]);
    const [selectedItems, setSelectedItems] = useState<MiniProduct[]>([]);

    const handleSelectItem = (selectedID: string) => {
        setSelectableItems((prev) =>
            prev.map((prevItem) =>
                prevItem.selectedID === selectedID ? { ...prevItem, selected: !prevItem.selected } : prevItem,
            ),
        );
    };

    useEffect(() => {
        setSelectableItems(
            products
                .map((product) => {
                    const unflattenProducts: TSelectableOrder[] = [];
                    for (let index = 0; index < product.amount; index++) {
                        unflattenProducts.push({
                            product,
                            selected: false,
                            selectedID: `${product.id}${index}`,
                            handleSelectItem: () => {
                                handleSelectItem(`${product.id}${index}`);
                            },
                        });
                    }
                    return unflattenProducts;
                })
                .flat(),
        );
    }, [products]);

    const createSelectedItems = useCallback(() => {
        setSelectedItems(selectableItems.filter((item) => item.selected).map((item) => item.product));
    }, [selectableItems]);

    return useMemo(
        () => ({
            error,
            data,
            loading,
            orderId,
            status,
            selectableItems,
            selectedItems,
            createSelectedItems,
        }),
        [selectableItems, selectedItems],
    );
};

export default useSelectableOrder;
