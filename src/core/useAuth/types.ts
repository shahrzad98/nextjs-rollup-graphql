import { ApolloError } from './../../apollo/apolloError';
export type typeLoginStep = 'otp' | 'password';
export type typeStep = 'fristPage' | 'isRegister' | 'login' | 'forgetPassword';

export interface Auth {
    handleSubmit: (data, onCompleted) => void;
    handlerOtpAutomatic: (data, onCompleted) => void;
    handleSubmitVerifyphone: (phone_number: string, is_forget_password: boolean, onCompletedMethod: () => void) => void;
    loginStep: typeLoginStep;
    step: typeStep;
    forgetPasswordStep: 'verifyPhoneNumber' | 'changePassword';
    loading: boolean;
    error: ApolloError;
    changeLoginStep: (data: typeLoginStep) => void;
    changePageStep: (data: typeStep) => void;
    logout: Logout;
}
export type Step = 'verifyPhoneNumber' | 'changePassword';
export interface ForgetPassword {
    step: Step;
    loading: boolean;
    handleVerifyPhoneNumber: (otp, phoneNumber, onCompletedMethod: () => void) => Promise<void>;
    handleChangePassword: (newPassword: string, phone_number: string, onCompletedMethod: () => void) => Promise<void>;
    error: ApolloError;
}

export interface Login {
    handleSubmit: (username: string, password: string) => Promise<void>;
    error: ApolloError;
    loading: boolean;
}

export interface Logout {
    handleLogout: () => Promise<void>;
    loading: boolean;
}
