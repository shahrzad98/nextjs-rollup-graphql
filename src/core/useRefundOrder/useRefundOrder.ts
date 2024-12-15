import { useCallback } from 'react';
// MAJOR
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

// HOOKS
import useSelectableOrder from './useSelectableOrder';
import { useUser } from '../useUser';

// ASSETS
import { RETURN_ORDER } from '../../apollo/mutations';
import apolloError from '../../apollo/apolloError';

// TYPES
import { ApolloError } from '../../apollo';
import { IRefundedValueOrder, IUseRefundOrder } from './types';

const reasonItems = ['کالا ایراد فنی دارد', 'کالا آسیب دیده است', 'کالا غیر اصل میباشد', 'گارانتی معتبر نمیباشد'];

const useRefundOrder = (): IUseRefundOrder => {
    const { push } = useRouter();
    const { data: userData } = useUser();
    const {
        info: { last_name, first_name, phone_number },
    } = userData;
    const {
        selectableItems,
        createSelectedItems,
        selectedItems,
        error: orderError,
        loading,
        data,
    } = useSelectableOrder();
    const { status, orderId } = data;
    const [error, setError] = useState<ApolloError>(orderError);
    const [card_number, setCardNumber] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [reasons, setReasons] = useState<IRefundedValueOrder[]>([]);

    const [createReturnOrder, { loading: retrunLoading }] = useMutation(RETURN_ORDER);

    useEffect(() => {
        setError(apolloError(orderError));
    }, [orderError]);

    const handleNextStep = (reasonValues?: IRefundedValueOrder[]) => {
        [
            () => {
                const isSelected = selectableItems.some((item) => item.selected);
                if (isSelected) {
                    createSelectedItems();
                    setStep(2);
                }
            },
            () => {
                const notEmptyReasons =
                    Array.isArray(reasonValues) &&
                    reasonValues.length &&
                    reasonValues.every((item) => item.description && item.orderItemId && item.reason);
                if (notEmptyReasons) {
                    setReasons(reasonValues);
                    setStep(3);
                }
            },
            async () => {
                if (card_number && status.can_return_request) {
                    await createReturnOrder({
                        variables: {
                            content: {
                                order: +orderId,
                                items: reasons.map((item) => ({
                                    images: item?.images || [],
                                    description: item.description,
                                    reason: item.reason,
                                    order_item: +item.orderItemId,
                                })),
                                first_name,
                                last_name,
                                phone_number,
                                card_number,
                            },
                        },
                        onCompleted: () => {
                            push({
                                pathname: '/profile/orders/refund/success/[orderId]',
                                query: {
                                    orderId,
                                },
                            });
                        },
                        onError: (e) => {
                            setError(apolloError(e));
                        },
                    });
                }
            },
        ][step - 1]?.();
    };

    const navigateBack = useCallback(() => {
        step > 1
            ? setStep((prev) => prev - 1)
            : push({
                  pathname: '/profile/orders/[orderId]',
                  query: {
                      orderId,
                  },
              });
    }, [step]);

    const userInfo = {
        last_name,
        first_name,
        phone_number,
        card_number,
    };

    return useMemo(
        () => ({
            selectableItems,
            error: error,
            loading: loading || retrunLoading,
            status,
            data,
            selectedItems,
            step,
            handleNextStep,
            reasonItems,
            info: {
                ...userInfo,
                handleChangeCardNumber: setCardNumber,
            },
            navigateBack,
            navigateToOrdersPage: () => {
                push({
                    pathname: '/profile/orders',
                });
            },
            navigateToReturnedOrderPage: () => {
                push({
                    pathname: '/profile/orders',
                    query: {
                        status: 'returned',
                    },
                });
            },
        }),
        [step, selectedItems, selectableItems, userInfo, retrunLoading],
    );
};

export default useRefundOrder;
