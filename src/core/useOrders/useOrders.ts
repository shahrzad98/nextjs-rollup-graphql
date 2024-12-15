import useOrdersStatusCount from './useOrdersStatusCount';
import useOrdersList from './useOrdersList';
import useOrdersSearchParams from './useOrdersSearchParams';
import { NetworkStatus, useQuery } from '@apollo/client';
import apolloError from '../../apollo/apolloError';
import { GET_ORDERS } from '../../apollo/queries';
import { Orders } from './types';

const useOrders = (): Orders => {
    const statusCount = useOrdersStatusCount();
    const ordersList = useOrdersList();
    const searchParams = useOrdersSearchParams();

    const { loading, error, networkStatus } = useQuery(GET_ORDERS, {
        notifyOnNetworkStatusChange: true,
        variables: {
            params: searchParams,
        },
    });

    return {
        data: {
            statusCount,
            ordersList,
        },
        loading: loading || networkStatus === NetworkStatus.refetch,
        error: apolloError(error),
    };
};
export default useOrders;
