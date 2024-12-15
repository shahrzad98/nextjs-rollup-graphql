import { useMutation, useQuery } from '@apollo/client';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { useEffect, useMemo, useState } from 'react';
import { UPDATE_NOTIFICATION_SETTINGS } from '../../apollo/mutations';
import { GET_NOTIFICATION_SETTING } from '../../apollo/queries';
import { NotificationSettings, SettingField, Settings } from './types';

const excludeSelect = ['survey_sms_notify', 'return_invoice_sms_notify'];

const useNotificationSettings = (): NotificationSettings => {
    const { loading: fetchLoading, data, error: fetchError } = useQuery(GET_NOTIFICATION_SETTING);
    const [updateNotificationSettings, { loading: updateLoading }] = useMutation(UPDATE_NOTIFICATION_SETTINGS);

    const [notificationSetting, setNotificationSetting] = useState<{ [key: string]: boolean }>({});
    const [updateError, setUpdateError] = useState<ApolloError>({});

    const loading = updateLoading || fetchLoading;

    useEffect(() => {
        if (data) {
            const {
                customer: { getNotificationSetting },
            } = data;

            const clone: Omit<typeof getNotificationSetting, 'id' | '__typename'> = { ...getNotificationSetting };

            delete clone['__typename'];
            delete clone['id'];

            setNotificationSetting(clone);
        }
    }, [data]);

    const handleChange = (key: string) => {
        if (excludeSelect.includes(key)) return;
        setNotificationSetting((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    const handleSaveSettings = async (onCompleted) => {
        if (loading || !data) return;
        setUpdateError({});

        await updateNotificationSettings({
            variables: {
                content: <Omit<typeof data.customer.getNotificationSetting, 'id' | '__typename'>>notificationSetting,
            },
            onError(e) {
                setUpdateError(apolloError(e));
            },
            onCompleted,
        });
    };
    const handleAggregateSelect = (settingField: SettingField, type: 'SELECT' | 'DE_SELECT' = 'SELECT') => {
        const newNotificationSetting = { ...notificationSetting };
        for (const i in newNotificationSetting) {
            if (!excludeSelect.includes(i) && i.includes(settingField)) {
                newNotificationSetting[i] = type === 'SELECT';
            }
        }
        setNotificationSetting(newNotificationSetting);
    };

    const settings = useMemo<Settings>(() => {
        const _settings: Settings = {
            hot_offer_available: {},
            order_invoice: {},
            product_available: {},
            receive_order: {},
            return_invoice: {},
            survey: {},
        };

        for (const i in notificationSetting) {
            if (i.includes('hot_offer_available_')) {
                _settings.hot_offer_available = {
                    ..._settings.hot_offer_available,
                    [i.replace('hot_offer_available_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('order_invoice_')) {
                _settings.order_invoice = {
                    ..._settings.order_invoice,
                    [i.replace('order_invoice_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('product_available_')) {
                _settings.product_available = {
                    ..._settings.product_available,
                    [i.replace('product_available_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('receive_order_')) {
                _settings.receive_order = {
                    ..._settings.receive_order,
                    [i.replace('receive_order_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('return_invoice_')) {
                _settings.return_invoice = {
                    ..._settings.return_invoice,
                    [i.replace('return_invoice_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('survey_')) {
                _settings.survey = {
                    ..._settings.survey,
                    [i.replace('survey_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
        }

        return _settings;
    }, [notificationSetting]);

    return {
        loadings: {
            fetchLoading,
            updateLoading,
        },
        errors: {
            updateError,
            fetchError: apolloError(fetchError),
        },
        data: { settings },
        handleSaveSettings,
        handleAggregateSelect,
    };
};

export default useNotificationSettings;
