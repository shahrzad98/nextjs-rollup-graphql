import { useRouter } from 'next/router';
import { OrdersSearchParams } from './types';

const status = (query) => {
    switch (query.status) {
        case 'inProgress':
            return 'PROCESSING';
        case 'received':
            return 'RECEIVED';
        case 'returned':
            return 'RETURNED';
        case 'canceled':
            return 'CANCELED';
        default:
            return 'WAITING_FOR_PAYMENT';
    }
};

const useOrdersSearchParams = (): OrdersSearchParams => {
    const { query } = useRouter();
    const searchParams: OrdersSearchParams = {
        status: status(query),
        offset: ((query.page ? +query.page : 1) - 1) * 10,
    };

    for (const i in searchParams) if (!searchParams[i]) delete searchParams[i];

    return searchParams;
};

export default useOrdersSearchParams;
