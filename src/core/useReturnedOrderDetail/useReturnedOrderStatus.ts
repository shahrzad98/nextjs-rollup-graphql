// MAJOR
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

// ASSETS
import { GET_RETURNED_ORDER } from '../../apollo/queries';
import returnedOrderDescription from '../useOrders/returnedOrderDescription';
import { IUseReturnedOrderStatus } from './types';

const useReturnedOrderStatus = (): IUseReturnedOrderStatus => {
    const {
        query: { orderId },
    } = useRouter();

    const { data: d } = useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId as string,
        },
    });

    const order = d?.customer.getReturnedOrder;

    const data = useMemo<NonNullable<typeof order>>(() => {
        return order || <NonNullable<typeof order>>{};
    }, [order]);

    const { status, status_display } = data;

    return useMemo<IUseReturnedOrderStatus>(
        () => ({
            step: status || 0,
            status_display: status_display || '',
            step_description: returnedOrderDescription(status, 'FULL') || '',
        }),
        [data],
    );
};
export default useReturnedOrderStatus;
