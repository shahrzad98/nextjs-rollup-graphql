import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_ORDERS_STATUS_COUNT } from '../../apollo/queries';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import useOrdersSearchParams from './useOrdersSearchParams';
import apolloError from '../../apollo/apolloError';
import { OrdersStatusCount, Statuses } from './types';

const useOrdersStatusCount = (): OrdersStatusCount => {
    const { query, push, pathname } = useRouter();

    const { data, loading, error, networkStatus } = useQuery(GET_ORDERS_STATUS_COUNT, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
    });

    const searchParams = useOrdersSearchParams();

    //Don't change these variables
    const waitingForPaymentsIds = [15, 14, 1];
    const receivedIds = [5];
    const inProgressIds = [2, 3, 16, 4, 17];
    const canceledIds = [6, 11, 12, 10, 13, 8];
    //***

    const handleChangeTab = async (status: string) => {
        let _query = { ...query };

        delete _query.page;

        status === 'waitingForPayment'
            ? delete _query.status
            : (_query = {
                  ..._query,
                  status,
              });

        await push({
            pathname,
            query: _query,
        });
    };

    const statuses = useMemo<Statuses>(() => {
        const _statuses: Statuses = {
            waitingForPayment: {
                count: 0,
                selected: searchParams.status === 'WAITING_FOR_PAYMENT',
            },
            inProgress: {
                count: 0,
                selected: searchParams.status === 'PROCESSING',
            },
            received: {
                count: 0,
                selected: searchParams.status === 'RECEIVED',
            },
            returned: {
                count: 0,
                selected: searchParams.status === 'RETURNED',
            },
            canceled: {
                count: 0,
                selected: searchParams.status === 'CANCELED',
            },
        };

        if (!error && !loading && data) {
            const {
                customer: {
                    getOrderStatusCount: { returns_count, status_count },
                },
            } = data;

            for (const i of status_count) {
                if (waitingForPaymentsIds.includes(i.status)) {
                    _statuses.waitingForPayment.count += i.total;
                }
                if (receivedIds.includes(i.status)) {
                    _statuses.received.count += i.total;
                }
                if (inProgressIds.includes(i.status)) {
                    _statuses.inProgress.count += i.total;
                }
                if (canceledIds.includes(i.status)) {
                    _statuses.canceled.count += i.total;
                }
            }

            _statuses.returned.count = returns_count;
        }

        return _statuses;
    }, [data, loading, error, searchParams]);

    return {
        statuses,
        handleChangeTab,
        loading: networkStatus === NetworkStatus.refetch || networkStatus === NetworkStatus.loading,
        error: apolloError(error),
    };
};

export default useOrdersStatusCount;
