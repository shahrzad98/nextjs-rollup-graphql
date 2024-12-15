import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import apolloError from '../../apollo/apolloError';
import useStore from '../useStore/useStore';
import { isUserLoggedIn } from '../isUserLoggedIn';
import { GET_LOYALTY_CREDIT } from '../../apollo/queries';
import { LoyaltyCredit } from './types';

const useLoyaltyCredit = (): LoyaltyCredit => {
    const {
        error,
        loading,
        data: queryData,
    } = useQuery(GET_LOYALTY_CREDIT, {
        skip: !isUserLoggedIn(),
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [stateData, setStateData] = useState<number>(0);

    const { basket } = useStore();

    useEffect(() => {
        if (queryData) setStateData(queryData.customer.getLoyaltyCreditV2.loyalty_credit);
    }, [queryData]);

    const handleSelectLoyaltyCredit = () => {
        basket.handleUpdateLocalBasket({ useLoyalty: !basket.data.useLoyalty });
    };

    return {
        handleSelectLoyaltyCredit,
        loading,
        error: apolloError(error),
        credit: stateData,
        selected: basket.data.useLoyalty,
    };
};

export default useLoyaltyCredit;
