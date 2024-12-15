import { useLazyQuery, useMutation } from '@apollo/client';
import { OTP_SEND_SIGNUP } from '../../apollo/mutations';
import { GET_BASKET } from '../../apollo/queries';
import { useUser } from '../useUser';
import { setNextCookie } from '../../utils/authenticationHandler/nextCookie';
import { useRouter } from 'next/router';
import apolloError from '../../apollo/apolloError';
import { useState } from 'react';

export interface Register {
    handleSubmitSingUp: (phone_number, otp, onCompletedMethod, onError) => void;
    loading: boolean;
}

const useRegister = (autoRedirectOnLogin): Register => {
    const [getBasket] = useLazyQuery(GET_BASKET);
    const { query, push } = useRouter();
    const user = useUser();
    const [otpSendSingup] = useMutation(OTP_SEND_SIGNUP);
    const [loading, setLoading] = useState(false);

    const handleSubmitSingUp = async (phone_number: string, otp, onCompletedMethod: () => void, onError) => {
        return new Promise<void>((resolve, reject) => {
            setLoading(true);
            otpSendSingup({
                variables: {
                    content: {
                        phone_number: phone_number,
                        token: otp,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(error) {
                    onError(apolloError(error));
                    reject();
                    setLoading(false);
                },
                onCompleted: async (data) => {
                    if (data?.customer?.otpSendSignup?.access) {
                        localStorage.setItem('token', data.customer.otpSendSignup.access);
                        if (data?.customer?.otpSendSignup?.refresh)
                            localStorage.setItem('refresh_token', data.customer.otpSendSignup.refresh);

                        setNextCookie(data?.customer?.otpSendSignup?.access);
                    }
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
                    onCompletedMethod?.();
                    const { _back_to, ...q } = query;
                    if (autoRedirectOnLogin) {
                        await push({
                            pathname: _back_to ? (query._back_to as string) : '/',
                            query: q,
                        });
                    }
                    setLoading(false);
                    resolve();
                },
            });
        });
    };
    return {
        handleSubmitSingUp,
        loading,
    };
};

export default useRegister;
