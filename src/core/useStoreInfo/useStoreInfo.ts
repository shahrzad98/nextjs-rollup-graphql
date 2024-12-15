import { useMutation, useQuery } from '@apollo/client';
import { GET_STORE_INFO } from '../../apollo/queries';
import { useMemo, useState } from 'react';
import { CREATE_STORE_OPENING_STORE_NOTIFIER } from '../../apollo/mutations';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { StoreInfo } from './types';

const useStoreInfo = (): StoreInfo => {
    const { data } = useQuery(GET_STORE_INFO);
    const [createStoreOpeningNotifier, { loading: storeOpeningNotifierLoading }] = useMutation(
        CREATE_STORE_OPENING_STORE_NOTIFIER,
    );
    const [storeOpeningNotifierError, setStoreOpeningNotifierError] = useState<ApolloError>({});

    const handleCreateStoreOpeningNotifier = (data: Partial<{ email: string; phoneNumber: string }>) => {
        return new Promise<void>((resolve, reject) => {
            return createStoreOpeningNotifier({
                variables: {
                    content: {
                        phone_number: data.phoneNumber,
                        email: data.email,
                    },
                },
                onError(e) {
                    setStoreOpeningNotifierError(apolloError(e));
                    reject();
                },
                onCompleted() {
                    resolve();
                },
            });
        });
    };

    return useMemo<StoreInfo>(() => {
        let storeInfo = <StoreInfo>{};

        if (data?.customer?.getStoreInfo) {
            const {
                customer: { getStoreInfo: d },
            } = data;

            storeInfo = {
                id: d.id,
                hotjar_token: d.hotjar_token,
                google_analytics_token: d.google_analytics_token,
                name: d.name,
                about_us: d.ecommerce?.about_us,
                about_returns: d.ecommerce?.about_returns,
                shipping_guide: d.ecommerce?.shipping_guide,
                telephone_number: d.telephone_number,
                is_open: d.ecommerce?.is_open,
                show_digify_logo: d.ecommerce?.show_digify_logo,
                domain: d.ecommerce.domain,
                store_address: {
                    address: d.store_address?.address,
                    city: d.store_address?.city,
                    latitude: d.store_address?.latitude,
                    longitude: d.store_address?.longitude,
                    postal_code: d.store_address?.postal_code,
                    province: d.store_address?.province,
                },
                enamad: {
                    e_namad_img_id: d.ecommerce?.e_namad_img_id,
                    e_namad_img_src: d.ecommerce?.e_namad_img_src
                        ? d.ecommerce?.e_namad_img_src.replace('amp;', '')
                        : '',
                    e_namad_meta_content: d.ecommerce?.e_namad_meta_content,
                    e_namad_reference_link: d.ecommerce?.e_namad_reference_link
                        ? d.ecommerce?.e_namad_reference_link.replace('amp;', '')
                        : '',
                },
                email: d.email,
                manager: {
                    first_name: d.first_name,
                    last_name: d.last_name,
                },
                guild: d.guild,
                logo: d.logo?.image ?? '',
                ray_chat: {
                    ray_chat_enabled: d.ray_chat_enabled,
                    ray_chat_token: d.ray_chat_token,
                },
                social_media: {
                    facebook: d.social_media?.facebook ?? '',
                    instagram: d.social_media?.instagram ?? '',
                    linkedin: d.social_media?.linkedin ?? '',
                    telegram: d.social_media?.telegram ?? '',
                    twitter: d.social_media?.twitter ?? '',
                    whatsapp: d.social_media?.whatsapp ?? '',
                },
                handleCreateStoreOpeningNotifier,
                storeOpeningNotifierError,
                storeOpeningNotifierLoading,
            };
        }

        return storeInfo;
    }, [data]);
};

export default useStoreInfo;
