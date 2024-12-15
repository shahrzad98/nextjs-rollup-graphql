import { useMutation } from '@apollo/client';
import { PAYMENT_CARD, CANCEL_ORDER, GET_GATEWAY, UPDATE_RECIEVE_STATUS } from '../../apollo/mutations';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { useCallback, useState } from 'react';
import { GET_ORDERS_STATUS_COUNT, GET_ORDERS } from '../../apollo/queries';
import { OrderActionTypes, UseOrderActions } from './types';

const refetchQueries = [GET_ORDERS_STATUS_COUNT, GET_ORDERS];

const allowedReceiveStatuses = {
    5: 'RECEIVED',
    17: 'UNRECEIVED',
} as const;

const useOrderActions = (onCompletedAction?: (actionType: OrderActionTypes) => void): UseOrderActions => {
    const [paymentCard, { loading: paymentCardLoading }] = useMutation(PAYMENT_CARD, {
        refetchQueries,
    });
    const [cancelOrder, { loading: removeLoading }] = useMutation(CANCEL_ORDER, {
        refetchQueries,
    });
    const [unrecivedOrder, { loading: unrecivedOrderLoading }] = useMutation(UPDATE_RECIEVE_STATUS, {
        refetchQueries,
    });
    const [getGateway] = useMutation(GET_GATEWAY, {
        refetchQueries,
    });

    const [getGatewayLoading, setGetGatewayLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApolloError>({});

    const handleRePayOrder = useCallback(async (orderId: string) => {
        setGetGatewayLoading(true);
        await getGateway({
            variables: {
                id: orderId,
                content: {
                    redirect_url: window.origin,
                    canceled_url: window.origin,
                },
            },
            onError(err) {
                setError(apolloError(err));
                setGetGatewayLoading(false);
            },
            onCompleted(data) {
                if (data.customer.getGateway.gateway_link)
                    window.location.replace(data.customer.getGateway.gateway_link);
            },
        });
    }, []);

    const handleRemoveOrder = useCallback(async (orderId: string) => {
        setError({});
        return new Promise<void>((resolve, reject) => {
            cancelOrder({
                variables: { id: orderId },
                onError(e) {
                    reject();
                    setError(apolloError(e));
                },
                onCompleted() {
                    onCompletedAction?.('REMOVE_ORDER');
                    resolve();
                },
            });
        });
    }, []);

    const handleSubmitCardToCardPayment = useCallback(async (orderId: string, image: File) => {
        setError({});
        return new Promise<void>((resolve, reject) => {
            paymentCard({
                variables: { orderId, image },
                onCompleted: async () => {
                    resolve();
                    onCompletedAction?.('CARD_TO_CARD_PAYMENT');
                },
                onError(err) {
                    reject();
                    setError(apolloError(err));
                },
            });
        });
    }, []);

    const handleUnreceivedOrder = useCallback(async (orderId: string, receivedStatus: 5 | 17) => {
        setError({});
        return new Promise<void>((resolve, reject) => {
            unrecivedOrder({
                variables: {
                    orderId,
                    content: {
                        status: allowedReceiveStatuses[receivedStatus],
                    },
                },
                onCompleted: async () => {
                    resolve();
                    onCompletedAction?.(receivedStatus === 17 ? 'UNRECEIVED_ORDER' : 'RECEIVED_ORDER');
                },
                onError(err) {
                    reject();
                    setError(apolloError(err));
                },
            });
        });
    }, []);

    return {
        handleSubmitCardToCardPayment,
        handleRePayOrder,
        handleRemoveOrder,
        handleUnreceivedOrder: handleUnreceivedOrder,
        loading: paymentCardLoading || getGatewayLoading || removeLoading || unrecivedOrderLoading,
        error,
    };
};

export default useOrderActions;
