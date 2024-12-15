import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { OTP_SEND_V2 } from '../../apollo/mutations';
import apolloError from '../../apollo/apolloError';
import useLogin from './useLogin';
import useForgetPassword from './useForgetPassword';
import useLogout from './useLogout';
import { Auth, typeLoginStep, typeStep } from './types';
import useRegister from './useRegister';

const useAuth = (autoRedirectOnLogin = true): Auth => {
    const [error, setError] = useState({});
    const [loginStep, setLoginStep] = useState<typeLoginStep>('otp');
    const [step, setStep] = useState<typeStep>('fristPage');
    const { handleSubmit: handleLoginSubmit, loading: loginLoading } = useLogin();
    const {
        handleVerifyPhoneNumber,
        handleChangePassword,
        step: forgetPasswordStep,
        loading: forgetPassLoading,
    } = useForgetPassword();
    const { handleSubmitSingUp, loading } = useRegister(autoRedirectOnLogin);
    const [otpSendV2, { loading: otpSendLoading }] = useMutation(OTP_SEND_V2);
    const changeLoginStep = (data: typeLoginStep) => {
        setLoginStep(data);
    };
    const changePageStep = (data: typeStep) => {
        setStep(data);
        changeLoginStep('otp');
    };
    const handleSubmitVerifyphone = async (
        phone_number: string,
        is_forget_password: boolean,
        onCompletedMethod: () => void,
    ) => {
        setError({});
        return new Promise<void>((resolve, reject) => {
            otpSendV2({
                variables: {
                    content: {
                        phone_number: phone_number,
                        is_forget_password: is_forget_password,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(error) {
                    setError(apolloError(error));
                    reject();
                },
                onCompleted: async (data) => {
                    const setp = data?.customer?.otpSendV2?.is_register ? 'isRegister' : 'login';
                    await setStep((prevStep) => (prevStep === setp ? prevStep : setp));
                    onCompletedMethod?.();
                    resolve();
                },
            });
        });
    };

    const handleSubmit = (data, onCompleted) => {
        switch (step) {
            case 'fristPage':
                handleSubmitVerifyphone(data.phone_number, false, onCompleted);
                break;
            case 'isRegister':
                handleSubmitSingUp(data.phone_number, data.otp, onCompleted, (error) => {
                    setError(error);
                });
                break;
            case 'login':
                if (loginStep == 'otp') {
                    handleLoginSubmit(data.phone_number, data.otp).catch((err) => setError(apolloError(err)));
                } else if (loginStep == 'password') {
                    handleLoginSubmit(data.phone_number, data.password).catch((err) => setError(apolloError(err)));
                }
                break;
            case 'forgetPassword':
                if (forgetPasswordStep == 'verifyPhoneNumber') {
                    handleVerifyPhoneNumber(parseInt(data.otp), data.phone_number, onCompleted);
                } else if (forgetPasswordStep == 'changePassword') {
                    if (data.password == data.confirmPassword) {
                        handleChangePassword(data.password, data.phone_number, () => {
                            setStep('fristPage');
                            onCompleted();
                        });
                    } else {
                        setError({ forgotpassword: ['passwords not match'] });
                    }
                }
                break;
            default:
                return 0;
        }
    };

    const handlerOtpAutomatic = (data, onCompleted) => {
        switch (step) {
            case 'isRegister':
                handleSubmitSingUp(data.phone_number, data.otp, onCompleted, (error) => {
                    setError(error);
                });
                break;
            case 'login':
                if (loginStep == 'otp') {
                    handleLoginSubmit(data.phone_number, data.otp).catch((err) => setError(apolloError(err)));
                }
                break;
            case 'forgetPassword':
                if (forgetPasswordStep == 'verifyPhoneNumber') {
                    handleVerifyPhoneNumber(parseInt(data.otp), data.phone_number, onCompleted);
                }
                break;
            default:
                return 0;
        }
    };

    return {
        handleSubmit,
        handleSubmitVerifyphone,
        handlerOtpAutomatic,
        loading: otpSendLoading || loginLoading || forgetPassLoading || loading,
        error,
        loginStep,
        step,
        forgetPasswordStep,
        changeLoginStep,
        changePageStep,
        logout: useLogout(),
    };
};
export default useAuth;
