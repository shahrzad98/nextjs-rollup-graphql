import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { useUser } from '../useUser';
import { useRouter } from 'next/router';
import { GET_TOKEN } from '../../apollo/mutations';
import { setNextCookie } from '../../utils/authenticationHandler/nextCookie';
import { GET_BASKET } from '../../apollo/queries';
import { Login } from './types';
import { useStore } from '../useStore';

const useLogin = (autoRedirectOnLogin = true): Login => {
    const { query, push } = useRouter();
    const [loading, setLoading] = useState(false);
    const { basket } = useStore();
    const [getToken] = useMutation(GET_TOKEN);
    const [getBasket] = useLazyQuery(GET_BASKET);
    const [error, setError] = useState<ApolloError>({});
    const user = useUser();

    const handleSubmit = async (username: string, password: string) => {
        setError({});
        return new Promise<void>((resolve, reject) => {
            basket.setInitialSync(false);
            setLoading(true);
            getToken({
                variables: {
                    content: {
                        username,
                        password,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError: (error) => {
                    setError(apolloError(error));
                    setLoading(false);
                    reject(error);
                },
                onCompleted: async (data) => {
                    if (data?.user?.getToken?.access) {
                        localStorage.setItem('token', data.user.getToken.access);
                        if (data?.user?.getToken?.refresh)
                            localStorage.setItem('refresh_token', data.user.getToken.refresh);

                        await setNextCookie(data?.user?.getToken?.access);
                        await user.fetchUserInfo();
                        await getBasket({
                            variables: {
                                uuid: typeof window !== 'undefined' ? localStorage.getItem('basketUUID') : '',
                            },
                            fetchPolicy: 'network-only',
                            onCompleted: (data) => {
                                typeof window !== 'undefined' && data.customer.getBasket.temp_id
                                    ? localStorage.setItem('basketUUID', data.customer.getBasket.temp_id)
                                    : () => {
                                          return;
                                      };
                            },
                        });
                        setLoading(false);
                        const { _back_to, ...q } = query;
                        if (autoRedirectOnLogin) {
                            await push({
                                pathname: _back_to ? (query._back_to as string) : '/',
                                query: q,
                            });
                        }
                        resolve();
                    }
                    setLoading(false);
                },
            });
        });
    };

    return { handleSubmit, loading, error };
};

export default useLogin;
