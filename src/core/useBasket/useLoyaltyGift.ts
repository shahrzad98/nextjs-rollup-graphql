import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_STORE_INFO } from '../../apollo/queries';
import { LoyaltyGift, Strategy } from './types';

const useLoyaltyGift = (): LoyaltyGift => {
    const { earning, is_earning_loyalty_active } =
        useQuery(GET_STORE_INFO, { context: { headers: { 'accept-language': 'fa-IR' } } }).data?.customer
            .getStoreInfo || {};

    return useMemo<LoyaltyGift>(() => {
        return {
            active: is_earning_loyalty_active as boolean,
            strategy: earning?.game_type_display.toUpperCase() as Strategy,
            value: earning?.game_type_display === 'a' ? earning?.value : (earning?.value as number) / 100,
            limit: earning?.limit as number,
        };
    }, [earning, is_earning_loyalty_active]);
};

export default useLoyaltyGift;
