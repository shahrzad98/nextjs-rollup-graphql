import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import orderStatusName from '../useOrders/orderStatusName';
import { OrderStatusName } from '../useOrders';
import { GET_ORDER } from '../../apollo/queries';
import orderDescription from '../useOrders/orderDescription';
import useOrderActions from '../useOrders/useOrderActions';
import { apolloLocalState } from '../../apollo';
import { OrderState, OrderStatus, PaymentMethod } from './types';

const useOrderStatus = (): OrderStatus => {
    const { query, push } = useRouter();
    const { data: d, refetch } = useQuery(GET_ORDER, {
        variables: {
            orderId: query.orderId as string,
        },
    });

    const order = d?.customer.getOrderV3;

    const data = useMemo<NonNullable<typeof order>>(() => {
        return order || <NonNullable<typeof order>>{};
    }, [order]);

    const statusName = useMemo(() => {
        if (order) return orderStatusName(+order?.status, +(order?.previous_status ?? 0));
    }, [order]);

    const stepDescription = useMemo(() => {
        if (statusName) return orderDescription(data, statusName, 'FULL');
    }, [statusName, data]);

    const orderActions = useOrderActions(async (actionType) => {
        switch (actionType) {
            case 'CARD_TO_CARD_PAYMENT':
                refetch();
                apolloLocalState.modify({
                    fields: {
                        getOrdersV3(cachedName) {
                            return cachedName.toUpperCase();
                        },
                    },
                });
                break;
            case 'UNRECEIVED_ORDER':
                refetch();
                break;
            case 'RECEIVED_ORDER':
                refetch();
                break;
            case 'REMOVE_ORDER':
                push({
                    pathname: '/profile/orders',
                });
                break;
            default:
                throw new Error('Action does not exist!');
        }
    });

    const paymentMethod = (): PaymentMethod => {
        return data?.registration_type === 3 ? 'CARD_TO_CARD' : 'GATEWAY';
    };

    const progressStep = (): number => {
        const payMethod = paymentMethod();
        const steps: { [p: string]: { [s: string]: number } } = {
            CARD_TO_CARD: {
                WAITING_FOR_APPROVAL: 1,
                WAITING_FOR_PAYMENT: 1,
                WAITING_FOR_PAYMENT_APPROVAL: 2,
                IN_PREPARING: 3,
                SENT: 4,
                UNRECEIVED: 4,
                RECEIVED: 5,
                OVERTIME_REQUEST_BY_MERCHANT: 1,
                OVERTIME_PAYMENT_BY_CUSTOMER: 1,
                OVERTIME_ORDER_BY_MERCHANT: 2,
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 2,
                CANCELED_REQUEST_BY_MERCHANT: 1,
                CANCELED_ORDER_BY_MERCHANT: 2,
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 2,
            },
            GATEWAY: {
                UNPAID: 1,
                EXPIRED: 1,
                PAID: 1,
                IN_PREPARING: 2,
                SENT: 3,
                UNRECEIVED: 3,
                RECEIVED: 4,
                OVERTIME_ORDER_BY_MERCHANT: 1,
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 1,
                CANCELED_ORDER_BY_MERCHANT: 1,
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 1,
            },
        };
        if (statusName && steps[payMethod][statusName]) {
            return steps[payMethod][statusName];
        }
        return 1;
    };

    const orderState = (): OrderState => {
        const payMethod = paymentMethod();
        const state: { [p: string]: { [s: string]: OrderState } } = {
            CARD_TO_CARD: {
                WAITING_FOR_APPROVAL: 'SUCCESS',
                WAITING_FOR_PAYMENT: 'SUCCESS',
                WAITING_FOR_PAYMENT_APPROVAL: 'SUCCESS',
                IN_PREPARING: 'SUCCESS',
                SENT: 'SUCCESS',
                RECEIVED: 'SUCCESS',
                UNRECEIVED: 'ERROR',
                OVERTIME_REQUEST_BY_MERCHANT: 'ERROR',
                OVERTIME_PAYMENT_BY_CUSTOMER: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
                CANCELED_REQUEST_BY_MERCHANT: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
                EXPIRED: 'ERROR',
                UNPAID: 'ERROR',
            },
            GATEWAY: {
                PAID: 'SUCCESS',
                IN_PREPARING: 'SUCCESS',
                SENT: 'SUCCESS',
                RECEIVED: 'SUCCESS',
                EXPIRED: 'ERROR',
                UNRECEIVED: 'ERROR',
                UNPAID: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
            },
        };
        if (statusName && state[payMethod][statusName]) {
            return state[payMethod][statusName];
        }
        return 'SUCCESS';
    };

    //Todo: Mohsen
    const stepTitle = () => {
        const payMethod = paymentMethod();
        const step = progressStep();
        const title: { [paymentMethod: string]: { [step: number]: string } } = {
            CARD_TO_CARD: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
            },
            GATEWAY: {
                1: '',
                2: '',
                3: '',
                4: '',
            },
        };
        if (title[payMethod][step]) {
            return title[payMethod][step];
        }
        return '';
    };

    // const handleRefund: HandleRefundOrder = (orderId: string) => {
    //     push({
    //         pathname: '/profile/orders/refund/[orderId]',
    //         query: {
    //             orderId,
    //         },
    //     });
    // };

    return useMemo<OrderStatus>(() => {
        const { expired_at } = data;

        const hasStepExpireTime: Partial<OrderStatusName[]> = [
            'WAITING_FOR_PAYMENT',
            'WAITING_FOR_APPROVAL',
            'WAITING_FOR_PAYMENT_APPROVAL',
            'PAID',
            'UNPAID',
        ];

        return {
            paymentMethod: paymentMethod(),
            progressStep: progressStep(),
            stepDescription,
            stepTitle: stepTitle(),
            statusName,
            orderState: orderState(),
            can_return_request: data.can_return_request,
            ...(hasStepExpireTime.includes(statusName) && {
                expired_at: new Date(expired_at),
            }),
            // ...(statusName === 'RECEIVED' &&
            //     data.can_return_request && {
            //         handleRefundOrder: () => handleRefund(data?.id),
            //     }),
            ...(statusName === 'RECEIVED' &&
                !data.is_finished &&
                !data.received_by_customer && {
                    handleUnrecivedOrder: () => orderActions.handleUnreceivedOrder(data?.id, 17),
                    loading: orderActions.loading,
                    error: orderActions.error,
                }),
            ...(statusName === 'UNRECEIVED' && {
                handleRecivedOrder: () => orderActions.handleUnreceivedOrder(data?.id, 5),
                loading: orderActions.loading,
                error: orderActions.error,
            }),
            ...(statusName === 'UNPAID' &&
                paymentMethod() == 'GATEWAY' && {
                    handleRemoveOrder: orderActions.handleRemoveOrder,
                    handleRePayOrder: orderActions.handleRePayOrder,
                    loading: orderActions.loading,
                    error: orderActions.error,
                }),
            ...(statusName === 'WAITING_FOR_PAYMENT' && {
                handleSubmitCardToCardPayment: orderActions.handleSubmitCardToCardPayment,
                paymentInformation: {
                    id: data?.id,
                    owner_card_number: data?.owner_card_number,
                    cost: data?.cost,
                    owner_card_name: data?.owner_card_name,
                },
                loading: orderActions.loading,
                error: orderActions.error,
            }),
        };
    }, [data, statusName, stepDescription, orderActions.loading]);
};

export default useOrderStatus;

//Todo: Currently, this part is commented because it cannot be updated after the expiration date.
// useEffect(() => {
//     let interval;
//     if (Object.keys(data).length) {
//         const { status } = data;
//         if (orderStatuses[status] === 'WAITING_FOR_APPROVE' || orderStatuses[status] === 'WAITING_FOR_PAYMENT') {
//             const { expired_at } = data;
//             const expire = new Date(expired_at).getTime();
//             interval = setInterval(async () => {
//                 if (expire - new Date().getTime() <= 0) {
//                     clearInterval(interval);
//                     await refetch({
//                         orderId: query.orderId,
//                     });
//                 }
//             }, 1000);
//         }
//     }
//     return () => clearInterval(interval);
// }, [data]);
