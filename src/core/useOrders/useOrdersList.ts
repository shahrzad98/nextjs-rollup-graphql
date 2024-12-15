import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../apollo/queries';
import { useMemo, useState } from 'react';
import useOrdersSearchParams from './useOrdersSearchParams';
import moment from 'moment-jalaali';
import apolloError from '../../apollo/apolloError';
import orderStatusName from './orderStatusName';
import useOrderActions from './useOrderActions';
import orderDescription from './orderDescription';
import returnedOrderDescription from './returnedOrderDescription';
import { Order, OrdersList } from './types';

const useOrdersList = (): OrdersList => {
    const limit = 10;

    const searchParams = useOrdersSearchParams();

    const {
        data: d,
        error,
        fetchMore,
        loading,
    } = useQuery(GET_ORDERS, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: {
            params: searchParams,
        },
    });

    const data = useMemo(() => {
        if (d) return d;
    }, [d]);

    const [offset, setOffset] = useState<{ [key: string]: number }>({
        PROCESSING: 0,
        RECEIVED: 0,
        RETURNED: 0,
        CANCELED: 0,
        WAITING_FOR_PAYMENT: 0,
    });

    const orderActions = useOrderActions();

    const handleLoadMore = async () => {
        if (loading) return;
        await fetchMore({
            variables: {
                params: {
                    ...searchParams,
                    offset: offset[searchParams.status] + limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => ({
                    ...prev,
                    [searchParams.status]: prev[searchParams.status] + limit,
                }));
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getOrdersV3: {
                            ...previousResult.customer.getOrdersV3,
                            count: fetchMoreResult.customer.getOrdersV3.count,
                            next: fetchMoreResult.customer.getOrdersV3.next,
                            results: [
                                ...previousResult.customer.getOrdersV3.results,
                                ...fetchMoreResult.customer.getOrdersV3.results,
                            ],
                        },
                    },
                };
            },
        });
    };

    const orders = useMemo<Order[]>(() => {
        const _orders: Order[] = [];

        if (data) {
            const {
                customer: {
                    getOrdersV3: { results },
                },
            } = data;

            for (const order of results) {
                const {
                    id,
                    status,
                    previous_status,
                    items,
                    reference_code: referenceCode,
                    created_at: createdAt,
                    cost,
                    owner_card_name,
                    owner_card_number,
                    is_finished,
                    received_by_customer,
                    returns,
                } = order;

                const isReturn = false;
                // const isReturn =  searchParams.status === 'RETURNED';

                const statusName = orderStatusName(+status, +(previous_status ?? 0));
                const stepDescription = isReturn
                    ? returnedOrderDescription(returns?.status || 1, 'SUMMERY')
                    : orderDescription(order, statusName, 'SUMMERY');

                _orders.push({
                    link: {
                        href: {
                            pathname: isReturn ? '/profile/orders/returned/[orderId]' : '/profile/orders/[orderId]',
                            query: {
                                orderId: isReturn ? String(returns?.id) : id,
                            },
                        },
                    },
                    id: isReturn ? String(returns?.id) || id : id,
                    referenceCode: isReturn ? returns?.reference_code || referenceCode : referenceCode,
                    createdAt: moment(isReturn ? returns?.created_at || createdAt : createdAt).format('jYYYY/jMM/jDD'),
                    cost,
                    products: items.map((item) => {
                        const {
                            details: {
                                variant: { product_serialized },
                            },
                        } = item;

                        const { label: name, images, id: productId } = product_serialized || {};

                        return {
                            image: images?.at(0)?.image || '',
                            name: name || '',
                            link: {
                                href: {
                                    pathname: '/product/[...product]',
                                    query: {
                                        product: [String(productId), String(name?.replace(/ /gi, '-'))],
                                    },
                                },
                            },
                        };
                    }),
                    statusName,
                    stepDescription,
                    ...(statusName === 'RECEIVED' &&
                        !is_finished &&
                        !received_by_customer && {
                            handleUnrecivedOrder: () => orderActions.handleUnreceivedOrder(id, 17),
                            loading: orderActions.loading,
                            error: orderActions.error,
                        }),
                    ...(statusName === 'UNRECEIVED' && {
                        handleRecivedOrder: () => orderActions.handleUnreceivedOrder(id, 5),
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                    ...(statusName === 'UNPAID' && {
                        handleRemoveOrder: orderActions.handleRemoveOrder,
                        handleRePayOrder: orderActions.handleRePayOrder,
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                    ...(statusName === 'WAITING_FOR_PAYMENT' && {
                        handleSubmitCardToCardPayment: orderActions.handleSubmitCardToCardPayment,
                        paymentInformation: {
                            orderId: order.id,
                            cardNumber: owner_card_number,
                            cost,
                            cardOwnerName: owner_card_name,
                        },
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                });
            }
        }

        return _orders;
    }, [data]);

    return {
        orders,
        error: apolloError(error),
        loading,
        handleLoadMore,
        hasMore: !!data?.customer.getOrdersV3.next,
        count: data?.customer.getOrdersV3.count ?? 0,
    };
};

export default useOrdersList;
