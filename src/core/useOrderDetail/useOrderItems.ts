import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useMiniProduct } from '../../utils/useMiniProduct';
import { GET_ORDER } from '../../apollo/queries';
import { OrderItems } from './types';

const useOrderItems = (): OrderItems => {
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

    return useMemo<OrderItems>(() => {
        return {
            items: data?.items?.map((item) => useMiniProduct(item)) || [],
            productsCount: (data?.items || []).reduce((prev, current) => prev + current.unit_amount, 0),
            pocket_cost: data?.pocket_cost ?? 0,
            customer_shipping_cost: data.customer_shipping_cost ?? 0,
            tax: data?.tax ?? 0,
            cost: data?.cost ?? 0,
            total_discount_cost: data?.total_discount_cost ?? 0,
            totalProductsCost: data?.items?.reduce(
                (prev, current) => prev + current.details.variant.cost * current.unit_amount,
                0,
            ),
            loyalty_amount: data.loyalty_amount,
        };
    }, [data]);
};

export default useOrderItems;
