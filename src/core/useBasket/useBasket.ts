import useBasketItems from './useBasketItems';
import useFactor from './useFactor';
import { useRouter } from 'next/router';
import useBasketAddress from './useBasketAddress';
import useShippingMethod from './useShippingMethod';
import { useEffect, useMemo, useState } from 'react';
import useTransactionType from './useTransactionType';
import usePacking from './usePacking';
import useDiscountCode from './useDiscountCode';
import useLoyaltyCredit from './useLoyaltyCredit';
import useLoyaltyGift from './useLoyaltyGift';
import useStore from '../useStore/useStore';
import { useMutation, useQuery } from '@apollo/client';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import useDescription from './useDescription';
import { CREATE_ORDER } from '../../apollo/mutations';
import { GET_VARIANTS_STOCK } from '../../apollo/queries';
import { Basket, BasketStep, OutOfStockItem, ProductItems } from './types';

const useBasket = (): Basket => {
    const { query, pathname, push } = useRouter();
    const { basket } = useStore();

    const basketItems = useBasketItems();
    const basketAddress = useBasketAddress();
    const shippingMethod = useShippingMethod();
    const discountCode = useDiscountCode();
    const packing = usePacking();
    const loyaltyCredit = useLoyaltyCredit();
    const loyaltyGift = useLoyaltyGift();
    const description = useDescription();
    const factor = useFactor({ basketItems, shippingMethod, packing, discountCode, loyaltyCredit, loyaltyGift });
    const transactionType = useTransactionType(/*{ totalCost: factor.totalCost }*/);

    const [createOrder] = useMutation(CREATE_ORDER);
    const { data } = useQuery(GET_VARIANTS_STOCK, {
        skip: query.step?.at(0) !== 'items' || !basketItems.products.length,
        fetchPolicy: 'no-cache',
        variables: {
            ids: basketItems.products.map((item) => item.variant.variant_id).filter(Boolean),
        },
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [paymentError, setPaymentError] = useState<ApolloError>({});
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [outOfStockItems, setOutOfStockItems] = useState<OutOfStockItem[]>([]);

    useEffect(() => {
        (async () => {
            if (query.step?.at(0) === 'shipping') {
                await shippingMethod.fetchShippingMethod();
            }
        })();
    }, [query.step]);

    const payOrder = async () => {
        const { data } = basket;
        setPaymentError({});
        setPaymentLoading(true);
        await createOrder({
            variables: {
                content: {
                    address: data.address,
                    canceled_url: `${window.origin}/cart/payment/redirect`,
                    items: data.items.map((item) => ({
                        unit_amount: item.amount,
                        variant: item.variant_id,
                    })),
                    ...(data.packing && { pocket: data.packing }),
                    receiver_last_name: data.receiverInfo.lastName as string,
                    receiver_name: data.receiverInfo.firstName as string,
                    receiver_number: data.receiverInfo.phoneNumber as string,
                    redirect_url: `${window.origin}/cart/payment/redirect`,
                    shipping: data.shipping,
                    gateway_type: +data.transaction,
                    use_loyalty: data.useLoyalty,
                    voucher: data.discount,
                    ...(data.description.length && { customer_description: data.description }),
                },
            },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            onError(e) {
                setPaymentError(apolloError(e));
                setPaymentLoading(false);
            },
            onCompleted(data) {
                basket.handleClearBasket();
                if (data.customer.createOrder.registration_type == 3) {
                    push({
                        pathname: '/cart/payment/success',
                        query: {
                            order: data.customer.createOrder.id,
                        },
                    });
                } else if (data.customer.createOrder.gateway_link) {
                    window.location.replace(data.customer.createOrder.gateway_link);
                } else {
                    push({
                        pathname: '/profile/orders/[orderId]',
                        query: {
                            orderId: data.customer.createOrder.id,
                        },
                    });
                }
            },
        });
    };
    const handleChangStep = (step) => {
        const _nextStep: BasketStep = step;
        const currentStep = query.step?.at(0) || 'items';
        if (currentStep != step) {
            const q = { ...query };
            q.step = _nextStep;
            push({
                pathname,
                query: q,
            });
        }
    };
    const handleNextStep = async () => {
        const currentStep = query.step?.at(0) || 'items';
        let _nextStep: BasketStep = 'items';

        switch (currentStep) {
            case 'items':
                if (!basket.data.items.length) return;
                _nextStep = 'address';
                break;
            case 'address':
                if (basket.data.address === '0') return;
                _nextStep = 'shipping';
                break;
            case 'shipping':
                if (basket.data.shipping === '0') return;
                _nextStep = 'payment';
                break;
            case 'payment':
                _nextStep = 'pay-order';
                break;
            default:
                _nextStep = 'items';
        }

        if (_nextStep === 'pay-order') {
            if (paymentLoading) return;
            await payOrder();
            return;
        }

        const q = { ...query };

        if (_nextStep === 'items') delete q.step;
        else q.step = _nextStep;

        await push({
            pathname,
            query: q,
        });
    };

    const products = useMemo(() => {
        if (data?.customer?.getVariantsStock && data?.customer?.getVariantsStock?.length) {
            const stocks = [...data.customer.getVariantsStock];
            const withStock: ProductItems[] = [];
            basketItems.products.forEach((item) => {
                const findedStock = stocks.find((stockItem) => stockItem?.id == item.variant.variant_id);
                if (findedStock) {
                    if (findedStock?.orderable_count === 0) {
                        if (!outOfStockItems.some((outItem) => outItem.variant.variant_id == findedStock.id)) {
                            const cloneItem: OutOfStockItem = { ...item };
                            delete cloneItem.handleDecrementAmount;
                            delete cloneItem.handleIncrementAmount;
                            delete cloneItem.handleRemove;
                            setOutOfStockItems((prevItems) => [...prevItems, cloneItem]);
                        }
                        item.handleRemove();
                    } else withStock.push(item);
                } else withStock.push(item);
            });
            return withStock;
        } else return basketItems.products;
    }, [basketItems]);

    return {
        factor,
        paymentLoading,
        paymentError,
        description,
        steps: {
            items: {
                ...basketItems,
                products,
                outOfStockItems,
            },
            addresses: basketAddress,
            shipping: {
                shippingMethod,
                packing,
            },
            payment: {
                transaction: transactionType,
                discount: discountCode,
                loyaltyCredit,
                loyaltyGift,
            },
        },
        activeStep: (query.step?.at(0) as BasketStep) || 'items',
        handleNextStep,
        handleChangStep,
    };
};

export default useBasket;
