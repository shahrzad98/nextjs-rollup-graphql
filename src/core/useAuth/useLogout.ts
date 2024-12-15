import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '../useStore/useStore';
import { clearNextCookie } from '../../utils/authenticationHandler/nextCookie';
import { apolloLocalState } from '../../apollo';
import { GET_STORE_INFO } from '../../apollo/queries';
import { Logout } from './types';

const useLogout = (): Logout => {
    const router = useRouter();
    const { basket } = useStore();

    const [loading, setLoading] = useState(false);

    const storeId = apolloLocalState.readQuery({ query: GET_STORE_INFO })?.customer.getStoreInfo.id;

    const handleLogout = async () => {
        setLoading(true);
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');

            await clearNextCookie();
            basket.handleLogoutBasket();

            // apolloLocalState.modify({
            //     fields: {
            //         customer(_, { INVALIDATE }) {
            //             return INVALIDATE;
            //         },
            //     },
            // });

            apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getUserType' });
            apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getProfile' });
            apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getLoyaltyCreditV2' });
            apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getAddresses' });
            apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getTransactionTypes' });
            apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getBasket' });
            apolloLocalState.gc();

            router.push({
                pathname: '/',
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('logout error: ', e);
        } finally {
            setLoading(false);
        }
    };

    return useMemo(
        () => ({
            handleLogout,
            loading,
        }),
        [loading],
    );
};

export default useLogout;
