import { MiniProduct } from '../../utils/useMiniProduct';
import { ApolloError } from '../../apollo';
import { Pagination } from '../../utils/usePagination';

export interface Products {
    data: {
        products: MiniProduct[];
        hotOfferLink: string;
    };
    loading: boolean;
    error: ApolloError;
    filterParams?: FilterParams;
    handleLoadMore: () => void;
    handleAddToBasket: (id: number) => void;
    hasMore: boolean;
    count: number;
    pagination: Pagination;
    next?: string | null;
}

export type OrderingTypes = 'MOST_SALE' | 'LEAST_SALE' | 'NEWEST' | 'OLDEST' | 'COST_MIN' | 'COST_MAX';

export interface Option {
    key: string;
    value: string;
    name?: string;
    colorCode?: string;
    categories?: Option[];
    isSelected: boolean;
    handleChange?: () => void;
}

export interface Cost {
    value: [number, number];
    initialValue: [number, number];
    handleChange: (arg: [number, number]) => void;
    handleSubmit: () => void;
}

export interface Ordering {
    options: Option[];
}

export interface Search {
    value: string;
    /**
     * This function can be executed after 1000 millisecond
     * @param {string} search
     */
    handleChange: (search: string) => void;
}

export interface Categories {
    handleSubmit: () => void;
    options: Option[];
}

export interface Specifications {
    name: string;
    handleSubmit: () => void;
    options: Option[];
}

export interface OtherFilters {
    has_discount: {
        value: boolean;
        handleChange: (arg: boolean) => void;
        handleSubmit: () => void;
    };
    in_stock: {
        value: boolean;
        handleChange: (arg: boolean) => void;
        handleSubmit: () => void;
    };
}

export interface FilterParams {
    cost: Cost;
    ordering: Ordering;
    search: Search;
    categories: Categories;
    specifications: Specifications[];
    others: OtherFilters;
    handleClearAllFilters: () => void;
    selectedFilters: { handleClear: () => void; name: string }[];
    updateStates: () => void;
    loading: boolean;
    error: ApolloError;
}

export interface ProductSearchParams {
    search: string;
    custom_option_values: string[];
    category: string;
    ordering: OrderingTypes;
    minimum_cost: number;
    maximum_cost: number;
    has_discount: boolean;
    has_stock: boolean;
    offset: number;
    limit: number;
    is_hot_offer: boolean;
    product_ids: string[];
}
