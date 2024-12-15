// MAJOR
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

// ASSETS
import moment from 'moment-jalaali';
import { GET_RETURNED_ORDER } from '../../apollo/queries';
import { IUseReturnedOrderInvoice } from './types';

const useReturnedOrderInvoice = (): IUseReturnedOrderInvoice => {
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

    const {
        reference_code,
        order_reference_code,
        created_at,
        order_created_at,
        first_name,
        last_name,
        phone_number,
        card_number,
    } = data;

    return useMemo<IUseReturnedOrderInvoice>(
        () => ({
            reference_code,
            order_reference_code,
            created_at: moment(created_at).format('jYYYY/jMM/jDD'),
            order_created_at: moment(order_created_at).format('jYYYY/jMM/jDD'),
            first_name,
            last_name,
            phone_number,
            card_number,
        }),
        [data],
    );
};
export default useReturnedOrderInvoice;
