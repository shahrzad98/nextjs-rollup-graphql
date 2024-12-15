import apolloError from '../../apollo/apolloError';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import useStore from '../useStore/useStore';
import { GET_POCKET } from '../../apollo/queries';
import { Packing } from './types';
import { useRouter } from 'next/router';

const usePacking = (): Packing => {
    const { asPath } = useRouter();

    const {
        data: queryData,
        error,
        loading,
    } = useQuery(GET_POCKET, {
        skip: asPath !== '/profile/cart/shipping',
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });

    const [stateData, setStateData] = useState<any[]>([]);
    const { basket } = useStore();

    useEffect(() => {
        if (queryData) setStateData(queryData.customer.getPocket);
    }, [queryData]);

    const handleSelectPack = (packing) => {
        basket.handleUpdateLocalBasket({ packing });
    };

    const packs = useMemo(() => {
        return stateData.map((item) => ({
            cost: item.cost,
            name: item.name,
            id: item.name,
            selected: basket.data.packing === item.id,
            handleSelectPack: () => handleSelectPack(item.id),
        }));
    }, [stateData, basket.data.packing]);

    return {
        packs,
        error: apolloError(error),
        loading,
    };
};

export default usePacking;
