import { ApolloError } from '../../apollo/apolloError';

export type SettingField = 'sms' | 'email' | 'internal';

export interface Setting {
    [key: string]: {
        value: boolean;
        handleChange: () => void;
    };
}

export interface Settings {
    hot_offer_available: Setting;
    order_invoice: Setting;
    product_available: Setting;
    receive_order: Setting;
    return_invoice: Setting;
    survey: Setting;
}

export interface NotificationSettings {
    loadings: {
        fetchLoading: boolean;
        updateLoading: boolean;
    };
    errors: {
        fetchError: ApolloError;
        updateError: ApolloError;
    };
    data: { settings: Settings };
    handleSaveSettings: (onCompleted: () => void) => void;
    handleAggregateSelect: (settingField: SettingField, type: 'SELECT' | 'DE_SELECT') => void;
}
