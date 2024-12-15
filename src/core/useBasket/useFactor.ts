import { useMemo } from 'react';
import { Factor } from './types';
import { apolloLocalState } from '../../apollo';
import { GET_STORE_INFO } from '../../apollo/queries';
import { BasketItems, DiscountCode, LoyaltyCredit, LoyaltyGift, Packing, ShippingMethod } from './types';

const useFactor = ({
    basketItems,
    shippingMethod,
    packing,
    discountCode,
    loyaltyCredit,
    loyaltyGift,
}: {
    basketItems: BasketItems;
    shippingMethod: ShippingMethod;
    packing: Packing;
    discountCode: DiscountCode;
    loyaltyCredit: LoyaltyCredit;
    loyaltyGift: LoyaltyGift;
}): Factor => {
    const { tax: storeTax } = apolloLocalState.readQuery({ query: GET_STORE_INFO })?.customer?.getStoreInfo || {};
    return useMemo<Factor>(() => {
        const shippingCost = shippingMethod.shippingList.find((i) => i.selected)?.cost || 0,
            packingCost = packing.packs.find((i) => i.selected)?.cost || 0,
            isSetDiscountCode = !!discountCode.discount.code,
            productsCount = basketItems.products.reduce<number>((previousValue, currentValue) => {
                return previousValue + currentValue.amount;
            }, 0),
            discountInProduct = basketItems.products.reduce<number>((previousValue, currentValue) => {
                return (
                    previousValue + (currentValue.online_primary_cost - currentValue.online_cost) * currentValue.amount
                );
            }, 0),
            tax = basketItems.products.reduce<number>((previousValue, currentValue) => {
                return previousValue + (!storeTax ? 0 : Math.round(currentValue.tax));
            }, 0),
            totalCost =
                Math.round(tax) +
                basketItems.products.reduce<number>((previousValue, currentValue) => {
                    return previousValue + currentValue.online_cost * currentValue.amount;
                }, 0),
            discountByCodeCost = isSetDiscountCode
                ? discountCode.discount.type === 'percent'
                    ? totalCost * discountCode.discount.amount > discountCode.discount.limit
                        ? discountCode.discount.limit
                        : Math.round(Math.floor(totalCost * discountCode.discount.amount))
                    : discountCode.discount.amount
                : 0,
            totalCostAfterDiscount =
                totalCost - discountByCodeCost < 0 ? 0 : totalCost - discountByCodeCost + (shippingCost + packingCost),
            totalProductsCost = basketItems.products.reduce<number>((previousValue, currentValue) => {
                return previousValue + currentValue.online_primary_cost * currentValue.amount;
            }, 0),
            totalCostAfterLoyalty = totalCostAfterDiscount - (loyaltyCredit.selected ? loyaltyCredit.credit : 0);

        let loyaltyGiftCost;

        if (loyaltyGift.active) {
            switch (loyaltyGift.strategy) {
                case 'A':
                    if (totalCost >= loyaltyGift.limit) loyaltyGiftCost = loyaltyGift.value;
                    break;
                case 'B':
                    if (totalCost * loyaltyGift.value < loyaltyGift.limit)
                        loyaltyGiftCost = totalCost * loyaltyGift.value;
                    else loyaltyGiftCost = loyaltyGift.limit;
                    break;
                case 'C':
                    loyaltyGiftCost = basketItems.products
                        .map((i) => (i.has_loyalty ? i.bonus_value * i.amount : 0))
                        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                    break;
                case 'D':
                    loyaltyGiftCost = Math.round(
                        Math.floor(
                            basketItems.products
                                .map((i) => (i.has_loyalty ? i.tax + i.online_cost * i.amount : 0))
                                .reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
                                loyaltyGift.value,
                        ),
                    );
                    break;
                default:
                    loyaltyGiftCost = 0;
                    break;
            }
        }

        return {
            discount: discountInProduct + discountByCodeCost,
            totalProductsCost,
            totalCost: totalCostAfterLoyalty < 0 ? 0 : totalCostAfterLoyalty,
            productsCount,
            shippingCost,
            packingCost,
            tax,
            loyalty: totalCostAfterLoyalty < 0 ? totalCostAfterDiscount : loyaltyCredit.credit,
            loyaltyGift: loyaltyGiftCost,
        };
    }, [
        basketItems.products,
        shippingMethod.shippingList,
        packing.packs,
        discountCode.discount,
        loyaltyCredit.selected,
        loyaltyGift.strategy,
    ]);
};

export default useFactor;
