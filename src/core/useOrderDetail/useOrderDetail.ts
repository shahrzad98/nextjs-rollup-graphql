import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../../apollo/queries';
import useOrderInvoice from './useOrderInvoice';
import useOrderItems from './useOrderItems';
import useOrderStatus from './useOrderStatus';
import apolloError from '../../apollo/apolloError';
import { useMemo, useCallback } from 'react';
import { OrderDetail } from './types';

const useOrderDetail = (): OrderDetail => {
    const { query, push } = useRouter();

    const orderId = useMemo<string>(() => {
        return query.orderId as string;
    }, [query.orderId]);

    const { loading, error } = useQuery(GET_ORDER, {
        variables: {
            orderId: orderId,
        },
    });

    const invoice = useOrderInvoice();
    const items = useOrderItems();
    const status = useOrderStatus();

    const navigateToOrdersPage = useCallback(() => {
        push({
            pathname: '/profile/orders',
        });
    }, []);

    return {
        loading,
        error: apolloError(error),
        data: {
            invoice,
            items,
            status,
            orderId,
        },
        navigateToOrdersPage,
    };
};

export default useOrderDetail;
