import { ApolloError } from '../../apollo/apolloError';
export interface AddressContent {
    city: string;
    province: string;
    address: string;
    no: number;
    postal_code: string;
    unit_number: number;
    description: string;
    receiver_name: string;
    receiver_lastname: string;
    receiver_number: string;
    name: string;
    longitude: string;
    latitude: string;
}

export interface Address {
    city: string;
    province: string;
    address: string;
    no: string;
    postal_code: string;
    unit_number: string;
    description: string;
    receiver_name: string;
    receiver_lastname: string;
    receiver_number: string;
    name: string;
    longitude: string;
    latitude: string;
    id: string;
    is_active: boolean;
    handleRemoveAddress: (onCompleted: () => void) => Promise<void>;
}

export interface Addresses {
    data: {
        addresses: Address[];
    };
    loadings: {
        fetchLoading: boolean;
        removeLoading: boolean;
        updateLoading: boolean;
        createLoading: boolean;
    };
    errors: {
        removeError: ApolloError;
        fetchError: ApolloError;
        updateError: ApolloError;
        createError: ApolloError;
    };
    handleCreateAddress: (address: AddressContent, onCompleted: () => void) => Promise<void>;
    handleUpdateAddress: (id: string, address: AddressContent, onCompleted: () => void) => Promise<void>;
}
