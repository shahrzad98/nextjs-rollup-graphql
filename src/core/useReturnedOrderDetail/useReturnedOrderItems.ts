// MAJOR
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

// ASSETS
import { useMiniProduct } from '../../utils/useMiniProduct';
import { GET_RETURNED_ORDER } from '../../apollo/queries';

// TYPES
import { IReturnedItem, IUseReturnedOrderItem } from './types';

const useReturnedOrderItems = (): IUseReturnedOrderItem[] => {
    const {
        query: { orderId },
    } = useRouter();

    const { data: d } = useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId as string,
        },
    });

    const [items, setItems] = useState<IReturnedItem[]>([]);

    useEffect(() => {
        if (d) setItems(d.customer.getReturnedOrder.items);
    }, [d]);

    return useMemo<IUseReturnedOrderItem[]>(
        () =>
            items.map((item) => {
                const {
                    id,
                    status_display,
                    reason,
                    returned_cost,
                    status,
                    count,
                    description,
                    reply_reason,
                    reply_description,
                    relative_voucher_amount,
                    order_item,
                    images,
                } = item;

                const { single_cost, single_primary_cost, single_profit, single_tax } = order_item;

                return {
                    id,
                    reason,
                    description,
                    images,
                    reply_reason,
                    reply_description,
                    status,
                    status_display,
                    returned_cost,
                    count,
                    single_cost,
                    single_primary_cost,
                    relative_voucher_amount,
                    single_profit,
                    single_tax,
                    order_item: useMiniProduct(order_item),
                };
            }),
        [items],
    );
};
export default useReturnedOrderItems;
