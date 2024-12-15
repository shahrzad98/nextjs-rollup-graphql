import useAddress from '../useAddress/useAddress';
import { useEffect, useMemo } from 'react';
import { useUser } from '../useUser';
import { useRouter } from 'next/router';
import useStore from '../useStore/useStore';
import { ReceiverInfo } from '../useStore/values/types';
import { BasketAddress, BasketAddresses } from './types';

const useBasketAddress = (): BasketAddresses => {
    const { pathname, push, query } = useRouter();
    const address = useAddress();
    const { basket } = useStore();
    const user = useUser();

    useEffect(() => {
        const {
            data: { receiverInfo },
        } = basket;

        const info: ReceiverInfo = {
            phoneNumber: receiverInfo?.phoneNumber?.length ? receiverInfo?.phoneNumber : user?.data?.info?.phone_number,
            firstName: receiverInfo?.firstName?.length ? receiverInfo?.firstName : user?.data?.info?.first_name,
            lastName: receiverInfo?.lastName?.length ? receiverInfo?.lastName : user?.data?.info?.last_name,
        };

        handleChangeReceiverInfo(info);
    }, [user?.data?.info]);

    useEffect(() => {
        (async () => {
            if (query.step?.at(0) === 'address') {
                if (!basket.data.items.length) {
                    const q = { ...query };
                    delete q.step;

                    await push({
                        pathname,
                        query: q,
                    });
                }
            }
        })();
    }, [query.step]);

    const handleSelectAddress = (id) => {
        basket.handleUpdateLocalBasket({ address: id });
    };

    const handleChangeReceiverInfo = (info: ReceiverInfo) => {
        basket.handleUpdateLocalBasket({ receiverInfo: { ...basket.data.receiverInfo, ...info } });
    };

    const basketAddresses = useMemo<BasketAddress[]>(() => {
        return address.data.addresses.map((address) => ({
            ...address,
            selected: basket.data.address === address.id,
            handleSelectAddress: () => handleSelectAddress(address.id),
        }));
    }, [address.data.addresses, basket.data.address]);

    return {
        ...address,
        addresses: basketAddresses,
        receiverInfo: basket.data.receiverInfo,
        handleChangeReceiverInfo,
    };
};

export default useBasketAddress;
