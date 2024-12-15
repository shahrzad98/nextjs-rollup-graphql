import handleCreateOptionValue from '../handleCreateOptionValue';
import { MiniProduct } from './types';

const useMiniProduct = (product: any): MiniProduct => {
    const { min_variant, details } = product;
    const variant = min_variant || details?.variant;
    const orderItemId = product.id;
    const id = product.id || variant?.id;
    const variantId = variant?.id;
    const tax = product.min_variant.tax;
    const singleTax = product.min_variant.single_tax;
    const label = product?.label || variant?.product_serialized?.label || '';
    const image =
        product?.main_image?.image ||
        product?.image?.image ||
        variant?.images?.at(0)?.image ||
        variant?.product_serialized?.images?.at(0)?.image ||
        '';
    const images = product?.images?.map((image) => image?.image) || [];
    const primaryCost = variant?.primary_cost;
    const cost = variant?.cost;
    const optionValues = variant?.option_values || [];
    const amount = product?.unit_amount || 1;
    const hot_offer_expired_date = product?.hot_offer_expired_date;
    const colors = product?.colors || [];
    const singleCost = product?.single_cost;

    return {
        label,
        id,
        variantId,
        orderItemId,
        image,
        images,
        colors,
        cost: cost * amount,
        primaryCost: primaryCost * amount,
        tax,
        singleTax,
        optionValues: handleCreateOptionValue(optionValues),
        link: {
            href: {
                pathname: '/product/[...product]',
                query: {
                    product: [id, label?.replace(/ /gi, '-')],
                },
            },
        },
        amount,
        singleCost,
        ...(hot_offer_expired_date && { hotOfferExpireDate: new Date(hot_offer_expired_date) }),
        isHotOffer: !!hot_offer_expired_date,
        discountPercent: primaryCost - cost > 0 ? (((primaryCost - cost) / primaryCost) * 100).toFixed() : 0,
        orderable_count: product?.orderable_count,
    };
};

export default useMiniProduct;
