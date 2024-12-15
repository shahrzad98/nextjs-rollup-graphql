import { ApolloError } from '../../apollo/apolloError';

export interface Theme {
    data?: Appearance | null;
    loading: boolean;
    error: ApolloError;
}

export interface HeroImage {
    id?: number | string;
    image?: string;
    url?: string;
}

interface Appearance {
    id: string;
    name: string | number;
    is_luxury: boolean;
    product_card_type_display: string | number;
    mobile_hot_offer_show: boolean;
    images?: (HeroImage | null)[] | null;
    name_display: string;
    hot_offer_gradient_type_display: string;
    primary_color: string;
    second_primary_color: string;
    discount_color: string;
    hot_offer_gradient_color: string;
}
