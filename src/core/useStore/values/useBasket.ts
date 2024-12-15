import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { isUserLoggedIn } from '../../isUserLoggedIn';
import isEqual from 'lodash.isequal';
import { GET_STORE_INFO, GET_BASKET } from '../../../apollo/queries';
import { UPDATE_BASKET, ADD_FAVORITES } from '../../../apollo/mutations';
import uuid from 'react-uuid';
import { apolloLocalState } from '../../../apollo';
import { BasketData, NewBasketItem, ReceiverInfo, Basket } from './types';

const useBasket = (): Basket => {
    const { query, push, pathname } = useRouter();
    const storeInfoData = apolloLocalState.readQuery({ query: GET_STORE_INFO });

    // const {customer: {getStoreInfo: { id: storeId },},} = apolloLocalState.readQuery({ query: GET_STORE_INFO });

    const basketKey = `Basket:${storeInfoData?.customer?.getStoreInfo?.id}`;
    const initialLocalBasket: BasketData = {
        items: [],
        address: '0',
        shipping: '0',
        transaction: '0',
        description: '',
        packing: '',
        discount: '',
        useLoyalty: false,
        receiverInfo: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
    };

    const newUUID = uuid();
    const { data: queryData } = useQuery(GET_BASKET, {
        skip: !storeInfoData?.customer?.getStoreInfo?.id,
        variables: {
            uuid: typeof window !== 'undefined' ? localStorage.getItem('basketUUID') || newUUID : '',
        },
        onCompleted: (data) => {
            typeof window !== 'undefined' && data.customer.getBasket.temp_id
                ? localStorage.setItem('basketUUID', data.customer.getBasket.temp_id)
                : () => {
                      return;
                  };
        },
    });
    const [updateBasket] = useMutation(UPDATE_BASKET, { fetchPolicy: 'no-cache' });
    const [addFavorites] = useMutation(ADD_FAVORITES);

    const getLocalStorageBasket = (): BasketData => {
        if (typeof window === 'undefined') return initialLocalBasket;
        const rawData = localStorage.getItem(basketKey);
        if (rawData) return JSON.parse(rawData);
        if (storeInfoData?.customer?.getStoreInfo?.id)
            localStorage.setItem(basketKey, JSON.stringify(initialLocalBasket));
        return initialLocalBasket;
    };
    const localStorageBasket = getLocalStorageBasket();

    const [initialSync, setInitialSync] = useState<boolean>(false);
    const [updateBasketLoading, setUpdateBasketLoading] = useState<boolean>(false);

    const [items, setItems] = useState<any[]>(localStorageBasket.items);
    const [address, setAddress] = useState<string>(localStorageBasket.address);
    const [receiverInfo, setReceiverInfo] = useState<ReceiverInfo>(localStorageBasket.receiverInfo);
    const [shipping, setShipping] = useState<string>(localStorageBasket.shipping);
    const [transaction, setTransaction] = useState<string>(localStorageBasket.transaction);
    const [packing, setPacking] = useState<string>(localStorageBasket.packing);
    const [discount, setDiscount] = useState<string>(localStorageBasket.discount);
    const [useLoyalty, setUseLoyalty] = useState<boolean>(localStorageBasket.useLoyalty);
    const [description, setDescription] = useState<string>(localStorageBasket.description);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (queryData?.customer) {
                if (needSync()) {
                    await handleSyncItems();
                } else {
                    setInitialSync(true);
                }
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [queryData, items]);

    const needSync = () => {
        const queryItems = queryData?.customer.getBasket.basket_items;
        const sortedQueryItems = queryItems ? [...queryItems] : [];
        sortedQueryItems.sort((a, b) => (a.product_id as any) - (b.product_id as any));
        const soretdItems = [...items];
        soretdItems.sort((a, b) => a.product_id - b.product_id);

        if (queryItems?.length !== items.length) {
            return true;
        }
        if (!sortedQueryItems.length && !soretdItems.length) return false;

        for (let i = 0; i < soretdItems.length; i++)
            if (!isEqual(soretdItems[i], sortedQueryItems[i])) {
                return true;
            }
        return false;
    };
    const handleUpdateLocalBasket = (newData: Partial<BasketData>) => {
        if (Object.keys(newData).length) {
            for (const key of Object.keys(newData)) {
                if (!isEqual(newData[key], data[key]) || key === 'packing') {
                    switch (key) {
                        case 'items':
                            setItems(newData[key] as any[]);
                            break;
                        case 'address':
                            setAddress(newData[key] as string);
                            break;
                        case 'shipping':
                            setShipping(newData[key] as string);
                            break;
                        case 'transaction':
                            setTransaction(newData[key] as string);
                            break;
                        case 'packing': {
                            if (packing === newData[key]) setPacking(initialLocalBasket.packing);
                            else setPacking(newData[key] as string);
                            break;
                        }
                        case 'discount':
                            setDiscount(newData[key] as string);
                            break;
                        case 'useLoyalty':
                            setUseLoyalty(newData[key] as boolean);
                            break;
                        case 'receiverInfo':
                            setReceiverInfo(newData[key] as ReceiverInfo);
                            break;
                        case 'description':
                            setDescription(newData[key] as string);
                    }

                    if (storeInfoData?.customer?.getStoreInfo?.id)
                        localStorage.setItem(
                            basketKey,
                            JSON.stringify({
                                ...getLocalStorageBasket(),
                                [key]:
                                    key === 'packing' && packing === newData[key]
                                        ? initialLocalBasket.packing
                                        : newData[key],
                            }),
                        );
                }
            }
        }
    };
    const handleUpdateItems = async (mergedItems: any[]) => {
        const basketItems = mergedItems.map(
            ({ amount, id, online_cost, online_primary_cost, variant_id, orderable_count, discount_amount }) => ({
                amount,
                id,
                online_cost,
                online_primary_cost,
                variant: variant_id,
                orderable_count,
                discount_amount,
            }),
        );
        setUpdateBasketLoading(true);
        await updateBasket({
            variables: {
                content: {
                    basket_items: basketItems,
                },
                uuid: localStorage.getItem('basketUUID'),
            },
            onCompleted: (data) => {
                setInitialSync(true);
                handleUpdateLocalBasket({
                    items: updateBasketOrderableCounts(data.customer?.updateBasket?.basket_items),
                });
                typeof window !== 'undefined' && data.customer.updateBasket.temp_id
                    ? localStorage.setItem('basketUUID', data.customer.updateBasket.temp_id)
                    : () => {
                          return;
                      };
            },
        });
        setUpdateBasketLoading(false);
    };
    const handleSyncItems = async () => {
        const arr = [...items, ...(initialSync ? [] : queryData?.customer.getBasket.basket_items || [])];
        // const arr = [
        //     ...items,
        //     ...(queryData?.customer?.getBasket?.basket_items ? queryData.customer.getBasket.basket_items : []),
        // ];

        const mergedBasket = arr.reduce((previousValue, currentValue) => {
            return previousValue.map((item) => +item.variant_id).includes(+currentValue.variant_id)
                ? previousValue
                : [...previousValue, currentValue];
        }, []);

        // if (isUserLoggedIn()) {

        await handleUpdateItems(mergedBasket);
        // } else {
        //     handleUpdateLocalBasket({ items: mergedBasket });
        //     setInitialSync(true);
        // }
    };
    const handleAddToBasket = (item: NewBasketItem, onCompleted) => {
        const _items = JSON.parse(JSON.stringify(items));

        const index = _items.map((i) => +i.variant_id).indexOf(+item.variant_id);

        if (index === -1 && (item.orderable_count > 0 || item.orderable_count === -1)) {
            if (item.orderable_count > 0) {
                item.orderable_count -= 1;
            }

            _items.push(item);
            onCompleted?.();
        } else {
            if (_items[index]?.orderable_count > 0 || _items[index]?.orderable_count === -1) _items[index].amount += 1;
            if (_items[index]?.orderable_count > 0) _items[index].orderable_count -= 1;
            onCompleted?.();
        }

        handleUpdateLocalBasket({ items: _items });
    };
    const handleItemsAmount = (variantId: string, type: 'increment' | 'decrement' | 'remove', onCompleted) => {
        const _items = JSON.parse(JSON.stringify(items))
            .map((i) => {
                if (i.variant_id === variantId) {
                    if (type === 'increment' && i?.orderable_count !== 0) {
                        i.amount += 1;
                        if (i?.orderable_count > 0) i.orderable_count -= 1;
                    } else if (type === 'decrement') {
                        i.amount -= 1;
                        if (i?.orderable_count >= 0) i.orderable_count += 1;
                    } else if (type === 'remove') {
                        if (i?.orderable_count >= 0) i.orderable_count += i.amount;
                        i.amount = 0;
                    }
                }
                return i;
            })
            .filter((i) => i.amount > 0);

        if (!_items.length)
            handleClearBasket(() => {
                return;
            });
        else handleUpdateLocalBasket({ items: _items });
        onCompleted?.();
    };
    const handleAddToFavorites = async (id, variant_id, onCompleted) => {
        if (isUserLoggedIn())
            await addFavorites({
                variables: { id },
                onCompleted() {
                    onCompleted?.();
                },
            });
        else
            await push({
                pathname: '/auth/login',
                query: {
                    ...query,
                    _back_to: pathname,
                },
            });
    };
    const handleClearBasket = (onCompleted) => {
        handleUpdateLocalBasket(initialLocalBasket);
        onCompleted?.();
    };
    const handleLogoutBasket = (onCompleted) => {
        handleUpdateLocalBasket(initialLocalBasket);
        setInitialSync(false);
        setItems([]);
        onCompleted?.();
    };

    const updateBasketOrderableCounts = (items) => {
        return items.map((item) => ({
            ...item,
            orderable_count:
                item?.orderable_count === 0
                    ? 0
                    : item?.orderable_count > 0
                    ? item?.orderable_count - item.amount
                    : item?.orderable_count,
            discount_amount: item.discount_amount,
            amount: item.amount,
        }));
    };

    const data: BasketData = {
        items: useMemo<any[]>(() => (items ? items : []), [items]),
        address: useMemo<string>(() => address, [address]),
        packing: useMemo<string>(() => packing, [packing]),
        discount: useMemo<string>(() => discount, [discount]),
        useLoyalty: useMemo<boolean>(() => useLoyalty, [useLoyalty]),
        shipping: useMemo<string>(() => shipping, [shipping]),
        receiverInfo: useMemo<ReceiverInfo>(() => receiverInfo, [receiverInfo]),
        transaction: useMemo<string>(() => transaction, [transaction]),
        description: useMemo<string>(() => description, [description]),
    };

    return {
        data,
        initialSync,
        handleAddToBasket,
        handleItemsAmount,
        handleClearBasket,
        handleLogoutBasket,
        handleUpdateLocalBasket,
        handleAddToFavorites,
        updateBasketLoading: updateBasketLoading,
        setInitialSync,
    };
};

export default useBasket;
