import { Strategy } from '../useBasket';
import { ApolloError } from '../../apollo';

export interface LoyaltyLog {
    strategy: Strategy;
    reason: string;
    date: string;
    time: string;
    account_credit: number;
    amount: number;
    id: string;
}

export interface LoyaltyLogs {
    data: {
        logs: LoyaltyLog[];
    };
    error: ApolloError;
    loading: boolean;
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
}
