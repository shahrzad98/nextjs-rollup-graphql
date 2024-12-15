import { ApolloError } from '../../apollo/apolloError';

export type InfoFields =
    | 'birthday'
    | 'card_number'
    | 'email'
    | 'first_name'
    | 'last_name'
    | 'marriage_date'
    | 'national_code'
    | 'phone_number'
    | 'telephone_number';

export type UserRole = 'guest' | 'manager' | 'customer';

export interface Info {
    birthday?: string | null;
    card_number?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    marriage_date?: string | null;
    national_code?: string | null;
    phone_number?: string;
    telephone_number?: string | null;
    granted?: boolean | null;
}

export interface User {
    /**
     *
     * @param name {string} field name
     * @param value {string} filed value
     */
    data: {
        info: Info;
        userRole: UserRole;
        loyaltyCredit: number;
    };
    loadings: {
        updateLoading: boolean;
        fetchLoading: boolean;
    };
    handleChange: (name: InfoFields, value: string) => void;
    handleSubmit: (onCompleted?: () => void) => Promise<void>;
    handleChangePassword: (oldPass: string, newPass: string, onCompleted?: () => void) => Promise<void>;
    editMode: boolean;
    error: ApolloError;
    isLoggedIn: boolean;
    fetchUserInfo: () => Promise<void>;
    handleCancel: () => void;
    handleEditMode: (mode: boolean) => void;
}
