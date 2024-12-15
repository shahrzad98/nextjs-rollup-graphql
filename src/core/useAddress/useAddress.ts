import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { DELETE_ADDRESS, UPDATE_ADDRESS, CREATE_ADDRESS } from '../../apollo/mutations';
import { GET_ADDRESSES } from '../../apollo/queries';
import { isUserLoggedIn } from '../isUserLoggedIn';
import { Addresses, AddressContent, Address } from './types';

const useAddress = (): Addresses => {
    const {
        data: queryData,
        loading: fetchLoading,
        error: fetchError,
    } = useQuery(GET_ADDRESSES, {
        skip: !isUserLoggedIn(),
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [deleteAddress, { loading: removeLoading }] = useMutation(DELETE_ADDRESS);
    const [updateAddress, { loading: updateLoading }] = useMutation(UPDATE_ADDRESS);
    const [createAddress, { loading: createLoading }] = useMutation(CREATE_ADDRESS);

    const [stateData, setStateData] = useState<any[]>([]);
    const [removeError, setRemoveError] = useState<ApolloError>({});
    const [updateError, setUpdateError] = useState<ApolloError>({});
    const [createError, setCreateError] = useState<ApolloError>({});

    useEffect(() => {
        if (queryData) setStateData(queryData.customer.getAddresses);
    }, [queryData]);

    const handleUpdateAddress = async (id: string, address: AddressContent, onCompleted) => {
        setUpdateError({});
        await updateAddress({
            variables: {
                id,
                content: address,
            },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            onCompleted() {
                onCompleted?.();
            },
            onError(e) {
                setUpdateError(apolloError(e));
            },
        });
    };
    const handleRemoveAddress = async (id: string, onCompleted) => {
        setRemoveError({});
        await deleteAddress({
            variables: { id },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            update(cache) {
                const data = JSON.parse(
                    JSON.stringify(
                        cache.readQuery({
                            query: GET_ADDRESSES,
                        }),
                    ),
                );
                data.customer.getAddresses = data.customer.getAddresses.filter((i) => i.id !== id);
                cache.writeQuery({
                    query: GET_ADDRESSES,
                    data,
                });
                onCompleted?.();
            },
            onError(e) {
                setRemoveError(apolloError(e));
            },
        });
    };
    const handleCreateAddress = async (address: Required<AddressContent>, onCompleted) => {
        setCreateError({});
        await createAddress({
            variables: { content: address },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            update(cache, { data: mutateData }) {
                const createAddress = mutateData?.customer.createAddress;
                const data = JSON.parse(
                    JSON.stringify(
                        cache.readQuery({
                            query: GET_ADDRESSES,
                        }),
                    ),
                );
                data.customer.getAddresses = data.customer.getAddresses.unshift(createAddress);
                cache.writeQuery({
                    query: GET_ADDRESSES,
                    data,
                });
                onCompleted?.();
            },
            onError(e) {
                setCreateError(apolloError(e));
            },
        });
    };

    const addresses = useMemo<Address[]>(() => {
        return stateData.map((item) => {
            const address = {
                ...item,
                handleRemoveAddress: (onCompleted) => handleRemoveAddress(item.id, onCompleted),
            };
            delete address.__typename;
            return address;
        });
    }, [stateData]);

    return {
        data: { addresses },
        loadings: {
            fetchLoading,
            removeLoading,
            updateLoading,
            createLoading,
        },
        errors: {
            removeError,
            updateError,
            createError,
            fetchError: apolloError(fetchError),
        },
        handleCreateAddress,
        handleUpdateAddress,
    };
};

export default useAddress;
