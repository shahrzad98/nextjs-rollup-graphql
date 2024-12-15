import { ApolloError } from '../../apollo';

export interface StoreInfo {
    id: number | string;
    name: string;
    about_us: string;
    about_returns: string;
    hotjar_token: string;
    google_analytics_token: string;
    shipping_guide: string;
    telephone_number: string;
    is_open: boolean;
    show_digify_logo: boolean;
    domain: string;
    store_address: {
        address: string;
        city: string;
        latitude: string;
        longitude: string;
        postal_code?: string | null;
        province: string;
    };
    enamad: {
        e_namad_img_id: string;
        e_namad_img_src: string;
        e_namad_meta_content: string;
        e_namad_reference_link: string;
    };
    email: string;
    manager: {
        first_name: string;
        last_name: string;
    };
    guild: string;
    logo?: string;
    ray_chat: {
        ray_chat_enabled: boolean;
        ray_chat_token: string;
    };
    social_media: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        telegram?: string;
        twitter?: string;
        whatsapp?: string;
    };
    handleCreateStoreOpeningNotifier: (data: Partial<{ email: string; phoneNumber: string }>) => Promise<void>;
    storeOpeningNotifierError: ApolloError;
    storeOpeningNotifierLoading: boolean;
}
