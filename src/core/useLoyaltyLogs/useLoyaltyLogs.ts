import { useQuery } from '@apollo/client';
import { GET_LOYALTY_LOGS } from '../../apollo/queries';
import { useEffect, useMemo, useState } from 'react';
import apolloError from '../../apollo/apolloError';
import { LoyaltyLog, LoyaltyLogs } from './types';

const useLoyaltyLogs = (): LoyaltyLogs => {
    const limit = 10;

    const { data, error, loading, fetchMore } = useQuery(GET_LOYALTY_LOGS);

    const [stateData, setStateData] = useState<any>(undefined);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        if (data) setStateData(data);
    }, [data]);

    const handleLoadMore = async () => {
        if (loading) return;
        await fetchMore({
            variables: {
                params: {
                    offset: offset + limit,
                    limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getLoyaltyLogs: {
                            ...previousResult.customer.getLoyaltyLogs,
                            count: fetchMoreResult.customer.getLoyaltyLogs.count,
                            next: fetchMoreResult.customer.getLoyaltyLogs.next,
                            results: [
                                ...previousResult.customer.getLoyaltyLogs.results,
                                ...fetchMoreResult.customer.getLoyaltyLogs.results,
                            ],
                        },
                    },
                };
            },
        });
    };

    const logs = useMemo<LoyaltyLog[]>(() => {
        if (stateData) {
            const idToDisplayName = {
                1: 'A',
                2: 'B',
                3: 'C',
                4: 'D',
            };
            return stateData.customer.getLoyaltyLogs.results.map((item) => {
                return {
                    id: item.id,
                    strategy: idToDisplayName[item?.data?.game] ?? '',
                    reason: item.reason,
                    date: new Intl.DateTimeFormat('fa-IR').format(new Date(item.created_at)),
                    time: new Intl.DateTimeFormat('fa-IR', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(item.created_at)),
                    account_credit: item.account_credit,
                    amount: item.amount,
                };
            });
        }
        return [];
    }, [stateData]);

    return {
        loading,
        error: apolloError(error),
        data: { logs },
        handleLoadMore,
        hasMore: !!stateData?.customer.getLoyaltyLogs.next,
        count: stateData?.customer.getLoyaltyLogs.count ?? 0,
    };
};

export default useLoyaltyLogs;
