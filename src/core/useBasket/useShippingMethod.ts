import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import apolloError from '../../apollo/apolloError';
import { useRouter } from 'next/router';
import useStore from '../useStore/useStore';
import { GET_SHIPPING_ADDRESS_SOCKET } from '../../apollo/queries';
import persianFullDate from '../../utils/persianFullDate';
import { Shipping, ShippingMethod } from './types';
import { shpingVar } from '../../apollo/LocalState/setShipingWay';

const useShippingMethod = (): ShippingMethod => {
    const [getShippingMethod, { error, loading }] = useLazyQuery(GET_SHIPPING_ADDRESS_SOCKET, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
    });

    const { pathname, push, query } = useRouter();
    const { basket } = useStore();
    const sokectShpingList = useReactiveVar(shpingVar);

    const [stateData, setStateData] = useState<any[]>([]);
    const [approximateSendingDate, setApproximateSendingDate] = useState<string>('');

    useEffect(() => {
        if (sokectShpingList) setStateData(sokectShpingList ?? []);
    }, [sokectShpingList]);

    useEffect(() => {
        if (stateData && basket.data.shipping !== '0') {
            const t = stateData.find((ele) => ele.id == basket.data.shipping)?.approximate_sending_date;
            const start = t?.start ? new Date(t.start) : null;
            const end = t?.end ? new Date(t.end) : null;
            if (start && end) {
                setApproximateSendingDate(
                    `سفارش شما در بازه ${persianFullDate(start)} تا ${persianFullDate(end)} به دستتان می‌رسد.`,
                );
            } else {
                setApproximateSendingDate('ابتدا روش ارسال را انتخاب کنید');
            }
        }
    }, [basket.data.shipping, stateData]);

    const fetchShippingMethod = async () => {
        if (parseInt(basket.data.address)) {
            await getShippingMethod({
                variables: {
                    addressId: basket.data.address,
                },
            });
        } else {
            await push({
                pathname,
                query: {
                    ...query,
                    step: ['address'],
                },
            });
        }
    };

    const handleSelectShipping = (id: string) => {
        basket.handleUpdateLocalBasket({ shipping: id });
    };

    const shippingList = useMemo<Shipping[]>(() => {
        return stateData
            .filter((i) => i.cost != -2)
            .map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    timeSendingDays: item.time_sending,
                    cost: item.cost,
                    selected: basket.data.shipping === item.id,
                    loading: item.cost == -3 ? true : false,
                    handleSelectShipping: () => handleSelectShipping(item.id),
                };
            });
    }, [stateData, basket.data.shipping, sokectShpingList]);
    return {
        fetchShippingMethod,
        approximateSendingDate,
        shippingList,
        error: apolloError(error),
        loading,
    };
};

export default useShippingMethod;
