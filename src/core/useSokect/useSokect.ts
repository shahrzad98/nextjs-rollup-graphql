import { useQuery } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { setShpingData } from '../../apollo/LocalState/setShipingWay';
import { GET_WEBSOCKET_NOTIF } from '../../apollo/queries';
import { isUserLoggedIn } from '../isUserLoggedIn';
import { SoketTypes } from './types';

const useSokect = (): SoketTypes => {
    const { data } = useQuery(GET_WEBSOCKET_NOTIF, {
        pollInterval: 3000000,
        skip: !isUserLoggedIn(),
    });
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (data?.notification?.getToken?.token) {
            const WebSocketUrl =
                window.location.hostname.includes('.apps.') || window.location.hostname.includes('localhost')
                    ? (token) => `wss://backend.apps.digify.shop/ws/notif/?token=${token}`
                    : (token) => `wss://backend.digify.shop/ws/notif/?token=${token}`;
            ws.current = new WebSocket(WebSocketUrl(data?.notification?.getToken?.token));
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ws.current.onopen = () => {};
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ws.current.onclose = () => {};
        }
    }, [data?.notification?.getToken?.token]);
    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message.action_id == 216) {
                setShpingData(message.shipping_list);
            }
        };
    }, [ws.current]);
    return {
        soket: {
            token: data?.notification?.getToken?.token ?? '',
        },
    };
};

export default useSokect;
