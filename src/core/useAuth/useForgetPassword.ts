import { useMutation } from '@apollo/client';
import { useState } from 'react';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { GET_CHANGE_AUTH_PASSWORD, FORGET_PASSWORD } from '../../apollo/mutations';
import { ForgetPassword, Step } from './types';

const useForgetPassword = (): ForgetPassword => {
    const [getChangeAuthPassword, { loading: getChangeAuthPasswordLoading }] = useMutation(GET_CHANGE_AUTH_PASSWORD);
    const [forgetPassword, { loading: forgetPasswordPasswordLoading }] = useMutation(FORGET_PASSWORD);

    const [step, setStep] = useState<Step>('verifyPhoneNumber');
    const [error, setError] = useState<ApolloError>({});
    const [auth, setAuth] = useState<string>('');

    const handleVerifyPhoneNumber = async (otp: string | number, phoneNumber: string, onCompletedMethod) => {
        setError({});
        return new Promise<void>((resolve, reject) => {
            getChangeAuthPassword({
                variables: {
                    content: {
                        token: +otp,
                        phone_number: phoneNumber,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(e) {
                    setError(apolloError(e));
                    reject();
                },
                onCompleted(data) {
                    setStep('changePassword');
                    setAuth(data.customer.getChangePasswordAuth.auth);
                    onCompletedMethod?.();
                    resolve();
                },
            });
        });
    };
    const handleChangePassword = async (newPassword: string, phoneNumber: string, onCompletedMethod) => {
        return new Promise<void>((resolve, reject) => {
            forgetPassword({
                variables: {
                    content: {
                        password: newPassword,
                        phone_number: phoneNumber,
                        token: auth,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(e) {
                    setError(apolloError(e));
                    reject();
                },
                onCompleted() {
                    onCompletedMethod?.();
                    resolve();
                },
            });
        });
    };

    return {
        step,
        loading: getChangeAuthPasswordLoading || forgetPasswordPasswordLoading || false,
        handleVerifyPhoneNumber,
        handleChangePassword,
        error,
    };
};

export default useForgetPassword;
