import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../../apollo/queries';
import { OrderInvoice } from './types';

const useOrderInvoice = () => {
    const { query } = useRouter();
    const { data: d } = useQuery(GET_ORDER, {
        variables: {
            orderId: query.orderId as string,
        },
    });

    const order = d?.customer.getOrderV3;

    const data = useMemo<NonNullable<typeof order>>(() => {
        return order || <NonNullable<typeof order>>{};
    }, [order]);

    return useMemo<OrderInvoice>(() => {
        const {
            reference_code,
            created_at,
            cost,
            address,
            received_at,
            status,
            pocket,
            registration_type,
            shipping_time_count,
            receiver_name,
            receiver_last_name,
            receiver_number,
            shipping,
            post_tracking_number,
            order_description,
        } = data;

        return {
            reference_code: reference_code,
            created_at: created_at ? new Intl.DateTimeFormat('fa-IR').format(new Date(created_at)) : '',
            cost,
            address: address?.address,
            received_at: received_at ? new Intl.DateTimeFormat('fa-IR').format(new Date(received_at)) : '',
            status: status,
            packingMethod: pocket?.name ?? '',
            paymentMethod: registration_type === 3 ? 'کارت به کارت' : 'پرداخت آنلاین',
            shipping_time_count: shipping_time_count,
            receiver_name: `${receiver_name || ''} ${receiver_last_name || ''}`,
            receiver_number: receiver_number && String(receiver_number).replace(/\+98/, '0'),
            shippingMethod: shipping?.name,
            post_tracking_number: post_tracking_number,
            order_description: order_description,
        };
    }, [data]);
};

export default useOrderInvoice;
