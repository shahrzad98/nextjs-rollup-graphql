import { ApolloError } from '../../apollo';

export interface Product {
    data: Data;
    loading: boolean;
    favoriteLoading: boolean;
    error: ApolloError;
    handleSelectedVariant: (newValue: OptionValue) => void;
    handleOptionValueIsSelected: (id: number) => boolean;
    handleAddToBasket: (onCompleted: void) => void;
    addOrRemoveToFavorites: () => void;
    updateBasketLoading: boolean;
}

export interface Data {
    images: Image[];
    options: $Option[];
    selectedVariant: Variant | null;
    variants: Variant[];
    label: string;
    voter_number: number;
    feedback_count: number;
    average_score: number;
    profit_percent: number;
    description: string;
    features: Feature[];
    is_favorite: boolean;
    category: { id: string; title: string; parent?: string | null };
}

export interface $Variant {
    options: $Option[];
    variants: Variant[];
    selectedVariant: Variant | null;
    handleSelectedVariant: (newValue: OptionValue) => void;
    handleOptionValueIsSelected: (id: number) => boolean;
}

export interface $Product {
    id: number | string;
    label: string;
    description: string;
    category: Category;
    variants: Variant[];
    images: Image[];
    tax: boolean;
    features: Feature[];
    average_score: number;
    voter_number: number;
    chosen_image?: Image | null;
    product_stock: number;
    has_stock: boolean;
    profit_percent: number;
    has_loyalty_gift: boolean;
}

export interface Variant {
    id: number | string;
    stock: string;
    orderable_count: number;
    images: Image[];
    is_active?: boolean | null;
    time_delay: number;
    cost: number;
    is_unlimited: boolean;
    loyalty_gift: number;
    cost_expired_at?: string | null;
    max_quantity: number;
    option_values?: OptionValue[] | null;
    primary_cost: number;
    profit_percent?: number;
}

export interface Image {
    id: number | string;
    image: string;
}

export interface Category {
    id: number | string;
    title: string;
    parent?: any;
}

export interface Feature {
    id?: string | null;
    title: string;
    description: string;
}

export interface OptionValue {
    id: number | string;
    value: string;
    option: $Option;
    color_code: string;
}

export interface $Option {
    id: number | string;
    name: string;
    is_color: boolean;
    values?: OptionValue[];
}
