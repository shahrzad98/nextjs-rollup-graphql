// MAJOR
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

// ASSETS AND TYPES
import apolloError from './../../apollo/apolloError';
import { GET_RETURNED_ORDER } from '../../apollo/queries';
import useReturnedOrderStatus from './useReturnedOrderStatus';
import useReturnedOrderInvoice from './useReturnedOrderInvoice';
import useReturnedOrderItems from './useReturnedOrderItems';
import { IUseReturnedOrderDetail, TFactor } from './types';

const useReturnedOrderDetail = (): IUseReturnedOrderDetail => {
    const { push } = useRouter();

    const {
        query: { orderId },
    } = useRouter();

    const { loading, error } = useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId as string,
        },
    });

    const status = useReturnedOrderStatus();
    const invoice = useReturnedOrderInvoice();
    const items = useReturnedOrderItems();

    const factor = useMemo<TFactor>(
        () => ({
            items,
            approvedProductsCount: items.reduce((acc, currentValue) => acc + currentValue.count, 0),
            allReturnedCost: items.reduce((acc, currentValue) => acc + currentValue.returned_cost, 0),
        }),
        [items],
    );

    const navigateToFactor = () => {
        push({
            pathname: '/profile/orders/returned/factor/[orderId]',
            query: {
                orderId,
            },
        });
    };

    return {
        data: {
            status,
            invoice,
            items,
            ...(status.step === 3 && { navigateToFactor, factor }),
        },

        error: apolloError(error),
        loading,
    };
};
export default useReturnedOrderDetail;
