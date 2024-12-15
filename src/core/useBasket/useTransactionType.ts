import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '../useStore/useStore';
import { useQuery } from '@apollo/client';
import apolloError from '../../apollo/apolloError';
import { GET_TRANSACTION_TYPES } from '../../apollo/queries';
import { isUserLoggedIn } from '../isUserLoggedIn';
import { Transaction, TransactionType } from './types';

const useTransactionType = (/*{ totalCost }: { totalCost: number }*/): TransactionType => {
    const { pathname, push, query } = useRouter();

    const {
        data: queryData,
        loading,
        error,
    } = useQuery(GET_TRANSACTION_TYPES, {
        skip: !isUserLoggedIn(),
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [stateData, setStateData] = useState<any[]>([]);

    const { basket } = useStore();

    useEffect(() => {
        if (queryData) setStateData(queryData.customer.getTransactionTypes);
    }, [queryData]);
    // useEffect(() => { //Todo: Fix re render
    //     if (totalCost <= 0) {
    //         basket.handleUpdateLocalBasket({ transaction: '1' });
    //         setStateData(stateData.filter((i) => i.gateway_type === '1'));
    //     } else if (queryData) {
    //         basket.handleUpdateLocalBasket({ transaction: '' });
    //         setStateData(queryData?.customer?.getTransactionTypes || []);
    //     }
    // }, [stateData, totalCost]);
    useEffect(() => {
        (async () => {
            if (query.step?.at(0) === 'payment') {
                if (basket.data.shipping === '0') {
                    await push({
                        pathname,
                        query: {
                            ...query,
                            step: ['shipping'],
                        },
                    });
                }
            }
        })();
    }, [query.step]);

    const transactions = useMemo<Transaction[]>(() => {
        return stateData.map((item) => ({
            name: item.persian_gateway_type,
            selected: +basket.data.transaction === item.gateway_type,
            gatewayType: item.gateway_type,
            handleSelectTransactionType: () => basket.handleUpdateLocalBasket({ transaction: item.gateway_type + '' }),
        }));
    }, [stateData, basket.data.transaction]);

    return { transactions, error: apolloError(error), loading };
};

export default useTransactionType;
