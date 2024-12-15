import * as _apollo_client from '@apollo/client';
import { InMemoryCache, TypePolicies, ApolloClient, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client';
import { FieldPolicy, FieldReadFunction } from '@apollo/client/cache/inmemory/policies';
import * as _graphql_typed_document_node_core from '@graphql-typed-document-node/core';

interface LimitedApolloConfig extends TypePolicies {
    Query: {
        fields: {
            [fieldName: string]: FieldPolicy | FieldReadFunction;
        };
    };
}
interface ApolloConfig {
    uri: string;
    inMemoryCacheConfig: {
        typePolicies: LimitedApolloConfig;
    };
}
declare let apolloLocalState: InMemoryCache;

interface ApolloError {
    [key: string]: string;
}

interface Link {
    href: {
        pathname: string;
        query?: {
            [key: string]: string | number | (string | number)[];
        };
    };
}

interface OptionValue$1 {
    name: string;
    value: string;
    colorCode?: string;
}

type TColor = {
    __typename: string;
    color_code: string;
    id: string | number;
};
interface MiniProduct {
    id: string;
    variantId: string;
    orderItemId: string;
    image: string;
    images: string[];
    /**
     * Product name
     */
    label: string;
    /**
     * Cost before discount
     */
    primaryCost: number;
    loyalty_gift: number | undefined;
    link: Link;
    /**
     * Cost after discount
     */
    cost: number;
    optionValues: OptionValue$1[];
    amount: number;
    isHotOffer: boolean;
    hotOfferExpireDate?: Date;
    discountPercent: number;
    orderable_count: number;
    colors: TColor[];
    singleCost: number;
    tax: boolean;
    singleTax: number;
}

interface Pagination {
    count: number;
    pageCount: number;
    page: number;
    hasNextPage: boolean;
    handleChangePage: (page: number) => Promise<void>;
}

interface Products {
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
type OrderingTypes = 'MOST_SALE' | 'LEAST_SALE' | 'NEWEST' | 'OLDEST' | 'COST_MIN' | 'COST_MAX';
interface Option {
    key: string;
    value: string;
    name?: string;
    colorCode?: string;
    categories?: Option[];
    isSelected: boolean;
    handleChange?: () => void;
}
interface Cost {
    value: [number, number];
    initialValue: [number, number];
    handleChange: (arg: [number, number]) => void;
    handleSubmit: () => void;
}
interface Ordering {
    options: Option[];
}
interface Search$1 {
    value: string;
    /**
     * This function can be executed after 1000 millisecond
     * @param {string} search
     */
    handleChange: (search: string) => void;
}
interface Categories {
    handleSubmit: () => void;
    options: Option[];
}
interface Specifications {
    name: string;
    handleSubmit: () => void;
    options: Option[];
}
interface OtherFilters {
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
interface FilterParams {
    cost: Cost;
    ordering: Ordering;
    search: Search$1;
    categories: Categories;
    specifications: Specifications[];
    others: OtherFilters;
    handleClearAllFilters: () => void;
    selectedFilters: {
        handleClear: () => void;
        name: string;
    }[];
    updateStates: () => void;
    loading: boolean;
    error: ApolloError;
}
interface ProductSearchParams {
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

declare const useProducts: (customQuery?: Partial<ProductSearchParams>) => Products;

interface Product {
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
interface Data {
    images: Image$1[];
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
    category: {
        id: string;
        title: string;
        parent?: string | null;
    };
}
interface $Variant {
    options: $Option[];
    variants: Variant[];
    selectedVariant: Variant | null;
    handleSelectedVariant: (newValue: OptionValue) => void;
    handleOptionValueIsSelected: (id: number) => boolean;
}
interface $Product {
    id: number | string;
    label: string;
    description: string;
    category: Category;
    variants: Variant[];
    images: Image$1[];
    tax: boolean;
    features: Feature[];
    average_score: number;
    voter_number: number;
    chosen_image?: Image$1 | null;
    product_stock: number;
    has_stock: boolean;
    profit_percent: number;
    has_loyalty_gift: boolean;
}
interface Variant {
    id: number | string;
    stock: string;
    orderable_count: number;
    images: Image$1[];
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
interface Image$1 {
    id: number | string;
    image: string;
}
interface Category {
    id: number | string;
    title: string;
    parent?: any;
}
interface Feature {
    id?: string | null;
    title: string;
    description: string;
}
interface OptionValue {
    id: number | string;
    value: string;
    option: $Option;
    color_code: string;
}
interface $Option {
    id: number | string;
    name: string;
    is_color: boolean;
    values?: OptionValue[];
}

declare const useProduct: () => Product;

declare const useSuggestionProducts: () => {
    data: MiniProduct[];
    loading: boolean;
    error: ApolloError;
};

type typeLoginStep = 'otp' | 'password';
type typeStep = 'fristPage' | 'isRegister' | 'login' | 'forgetPassword';
interface Auth {
    handleSubmit: (data: any, onCompleted: any) => void;
    handlerOtpAutomatic: (data: any, onCompleted: any) => void;
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
type Step = 'verifyPhoneNumber' | 'changePassword';
interface ForgetPassword {
    step: Step;
    loading: boolean;
    handleVerifyPhoneNumber: (otp: any, phoneNumber: any, onCompletedMethod: () => void) => Promise<void>;
    handleChangePassword: (newPassword: string, phone_number: string, onCompletedMethod: () => void) => Promise<void>;
    error: ApolloError;
}
interface Login {
    handleSubmit: (username: string, password: string) => Promise<void>;
    error: ApolloError;
    loading: boolean;
}
interface Logout {
    handleLogout: () => Promise<void>;
    loading: boolean;
}

declare const useAuth: (autoRedirectOnLogin?: boolean) => Auth;

type SSRQuery<TCustomData = any, TQueryResult = any> = (customData?: TCustomData) => (apolloClient: ApolloClient<NormalizedCacheObject>, ctx?: any) => Promise<any | ApolloQueryResult<TQueryResult>>;
type SSRQueries<TQueryResult = any> = (apolloClient: ApolloClient<NormalizedCacheObject>, ctx?: any) => Promise<any | ApolloQueryResult<TQueryResult>>;

declare const _default: {
    getProducts: SSRQuery<Partial<ProductSearchParams>, any>;
    getProductsFiltering: SSRQuery<Partial<ProductSearchParams>, any>;
    getAppearance: SSRQuery<any, any>;
    getStoreInfo: SSRQuery<any, any>;
    getProfile: SSRQuery<any, any>;
    getProduct: SSRQuery<any, any>;
    getSuggestionProducts: SSRQuery<any, any>;
    getBreadcrumb: SSRQuery<any, any>;
    getProductFeedback: SSRQuery<any, any>;
    getCategories: SSRQuery<any, any>;
    getThemeCustomization: SSRQuery<Customization, any>;
    getUserType: SSRQuery<any, any>;
    getBlogArticles: SSRQuery<any, any>;
    getBlogHighlights: SSRQuery<any, any>;
    getBlogArticle: SSRQuery<any, any>;
};

declare const staticLinks: {
    aboutUs: {
        name: string;
        href: {
            pathname: string;
        };
    };
    contactUs: {
        name: string;
        href: {
            pathname: string;
        };
    };
    digify: {
        name: string;
        href: {
            pathname: string;
        };
    };
    joinDigify: {
        name: string;
        href: {
            pathname: string;
        };
    };
    buyHelp: {
        name: string;
        href: {
            pathname: string;
        };
    };
    returnConditions: {
        name: string;
        href: {
            pathname: string;
        };
    };
    support: {
        name: string;
        href: {
            pathname: string;
        };
    };
    home: {
        name: string;
        href: {
            pathname: string;
        };
    };
    cart: {
        name: string;
        href: {
            pathname: string;
            query: {
                step: string;
            };
        };
    };
    favorites: {
        name: string;
        href: {
            pathname: string;
        };
    };
    login: {
        name: string;
        href: {
            pathname: string;
        };
    };
    register: {
        name: string;
        href: {
            pathname: string;
        };
    };
    profile: {
        name: string;
        href: {
            pathname: string;
        };
    };
    orders: {
        name: string;
        href: {
            pathname: string;
        };
    };
    notifications: {
        name: string;
        href: {
            pathname: string;
        };
    };
};

type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSONObject: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
    Void: any;
};
type AddressContent$1 = {
    address: Scalars['String'];
    city: Scalars['String'];
    description?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    latitude?: InputMaybe<Scalars['String']>;
    longitude?: InputMaybe<Scalars['String']>;
    name: Scalars['String'];
    no?: InputMaybe<Scalars['Int']>;
    postal_code: Scalars['String'];
    province: Scalars['String'];
    receiver_lastname?: InputMaybe<Scalars['String']>;
    receiver_name?: InputMaybe<Scalars['String']>;
    receiver_number?: InputMaybe<Scalars['String']>;
    unit_number: Scalars['Int'];
};
type AllowedReceiveStatuses = 'RECEIVED' | 'UNRECEIVED';
type AllowedStatus = 'CANCELED' | 'PROCESSING' | 'RECEIVED' | 'RETURNED' | 'WAITING_FOR_PAYMENT';
type AllowedStatuses = 'CANCELED' | 'CONFIRMED' | 'EXPIRED' | 'PAID' | 'PRE_ORDER_NOTIFIED' | 'RECEIVED' | 'SENT' | 'SUBMITTED';
type BasketItemContent = {
    amount: Scalars['Float'];
    discount_amount?: InputMaybe<Scalars['Int']>;
    id?: InputMaybe<Scalars['ID']>;
    online_cost: Scalars['Int'];
    online_primary_cost: Scalars['Int'];
    orderable_count?: InputMaybe<Scalars['Int']>;
    variant: Scalars['ID'];
};
type BreadcrumbParams$1 = {
    id: Scalars['ID'];
    type: BreadcrumbType;
};
type BreadcrumbType = 'CATEGORY' | 'PRODUCT';
type CategoriesParams = {
    all?: InputMaybe<Scalars['Boolean']>;
    has_product?: InputMaybe<Scalars['Boolean']>;
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
    parent_id?: InputMaybe<Scalars['ID']>;
    parent_only?: InputMaybe<Scalars['Boolean']>;
};
type ChangePasswordWithoutOtpContent = {
    new_password: Scalars['String'];
    password?: InputMaybe<Scalars['String']>;
};
type CreateOrderContent = {
    address: Scalars['ID'];
    canceled_url: Scalars['String'];
    customer_description?: InputMaybe<Scalars['String']>;
    gateway_type: Scalars['Int'];
    items: Array<OrderAddItemsContent>;
    pocket?: InputMaybe<Scalars['ID']>;
    receiver_last_name: Scalars['String'];
    receiver_name: Scalars['String'];
    receiver_number: Scalars['String'];
    redirect_url: Scalars['String'];
    shipping: Scalars['ID'];
    transaction_type?: InputMaybe<Scalars['Int']>;
    use_loyalty: Scalars['Boolean'];
    voucher?: InputMaybe<Scalars['ID']>;
};
type CreateStoreOpeningNotifierContent = {
    email?: InputMaybe<Scalars['String']>;
    phone_number?: InputMaybe<Scalars['String']>;
};
type FavoritesParams = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};
type ForgetPasswordContent = {
    password: Scalars['String'];
    phone_number: Scalars['String'];
    token: Scalars['String'];
};
type GatewayLinkUrlContent = {
    canceled_url: Scalars['String'];
    redirect_url: Scalars['String'];
};
type GetTokenByOtpContent = {
    phone_number: Scalars['String'];
    token: Scalars['Int'];
};
type GetTokenByOtpSingUpContent = {
    phone_number: Scalars['String'];
    set_cookie?: InputMaybe<Scalars['Boolean']>;
    token: Scalars['String'];
};
type LoyaltyLogsParams = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};
type NotificationSettingContent = {
    hot_offer_available_email_notify: Scalars['Boolean'];
    hot_offer_available_internal_notify: Scalars['Boolean'];
    hot_offer_available_sms_notify: Scalars['Boolean'];
    order_invoice_email_notify: Scalars['Boolean'];
    order_invoice_internal_notify: Scalars['Boolean'];
    order_invoice_sms_notify: Scalars['Boolean'];
    product_available_email_notify: Scalars['Boolean'];
    product_available_internal_notify: Scalars['Boolean'];
    product_available_sms_notify: Scalars['Boolean'];
    receive_order_email_notify: Scalars['Boolean'];
    receive_order_internal_notify: Scalars['Boolean'];
    receive_order_sms_notify: Scalars['Boolean'];
    return_invoice_email_notify: Scalars['Boolean'];
    return_invoice_internal_notify: Scalars['Boolean'];
    return_invoice_sms_notify: Scalars['Boolean'];
    survey_email_notify: Scalars['Boolean'];
    survey_internal_notify: Scalars['Boolean'];
    survey_sms_notify: Scalars['Boolean'];
};
type OtpSendContent = {
    is_forget_password: Scalars['Boolean'];
    phone_number: Scalars['String'];
};
type OrderAddItemsContent = {
    unit_amount: Scalars['Int'];
    variant: Scalars['ID'];
};
type OrdersParams = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
    status?: InputMaybe<AllowedStatus>;
    statuses?: InputMaybe<AllowedStatuses>;
};
type ProductFeedbackParams = {
    images_only?: InputMaybe<Scalars['Boolean']>;
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};
type ProductOrderingType = 'COST_MAX' | 'COST_MIN' | 'LEAST_SALE' | 'MOST_DISCOUNT' | 'MOST_SALE' | 'NEWEST' | 'OLDEST';
type ProductsParams = {
    categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    category?: InputMaybe<Scalars['String']>;
    collection?: InputMaybe<Scalars['String']>;
    colors?: InputMaybe<Scalars['String']>;
    cost_gte?: InputMaybe<Scalars['Float']>;
    cost_lte?: InputMaybe<Scalars['Float']>;
    custom_option_values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    fixed_cost?: InputMaybe<Scalars['Float']>;
    has_discount?: InputMaybe<Scalars['Boolean']>;
    has_stock?: InputMaybe<Scalars['Boolean']>;
    is_active?: InputMaybe<Scalars['Boolean']>;
    is_hot_offer?: InputMaybe<Scalars['Boolean']>;
    is_service?: InputMaybe<Scalars['Boolean']>;
    label?: InputMaybe<Scalars['String']>;
    label_contains?: InputMaybe<Scalars['String']>;
    limit?: InputMaybe<Scalars['Int']>;
    marks?: InputMaybe<Scalars['String']>;
    max_stock?: InputMaybe<Scalars['String']>;
    maximum_cost?: InputMaybe<Scalars['Float']>;
    min_stock?: InputMaybe<Scalars['String']>;
    minimum_cost?: InputMaybe<Scalars['Float']>;
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    offline_visible?: InputMaybe<Scalars['String']>;
    offset?: InputMaybe<Scalars['Int']>;
    online_visible?: InputMaybe<Scalars['String']>;
    option_values?: InputMaybe<Scalars['String']>;
    ordering?: InputMaybe<ProductOrderingType>;
    primary_cost_gte?: InputMaybe<Scalars['Float']>;
    primary_cost_lte?: InputMaybe<Scalars['Float']>;
    product_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    search?: InputMaybe<Scalars['String']>;
    store?: InputMaybe<Scalars['ID']>;
    tag_id?: InputMaybe<Scalars['ID']>;
    tags?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<Scalars['String']>;
    unlimited_stock?: InputMaybe<Scalars['String']>;
};
type ProfileContent = {
    birthday?: InputMaybe<Scalars['String']>;
    card_number?: InputMaybe<Scalars['String']>;
    email?: InputMaybe<Scalars['String']>;
    first_name?: InputMaybe<Scalars['String']>;
    gender?: InputMaybe<Scalars['String']>;
    last_name?: InputMaybe<Scalars['String']>;
    marriage_date?: InputMaybe<Scalars['String']>;
    national_code?: InputMaybe<Scalars['String']>;
    new_password?: InputMaybe<Scalars['String']>;
    password?: InputMaybe<Scalars['String']>;
    phone_number?: InputMaybe<Scalars['String']>;
    sheba_number?: InputMaybe<Scalars['String']>;
    telephone_number?: InputMaybe<Scalars['String']>;
    token?: InputMaybe<Scalars['String']>;
};
type RefreshTokenContent = {
    refresh: Scalars['String'];
};
type ReturnItemsContent = {
    description?: InputMaybe<Scalars['String']>;
    images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    order_item?: InputMaybe<Scalars['Int']>;
    reason?: InputMaybe<Scalars['String']>;
};
type ReturnOrderContent = {
    card_number?: InputMaybe<Scalars['String']>;
    first_name?: InputMaybe<Scalars['String']>;
    items?: InputMaybe<Array<InputMaybe<ReturnItemsContent>>>;
    last_name?: InputMaybe<Scalars['String']>;
    order?: InputMaybe<Scalars['Int']>;
    phone_number?: InputMaybe<Scalars['String']>;
};
type TokenContent = {
    password: Scalars['String'];
    username: Scalars['String'];
};
type UpdateBasketContent = {
    basket_items?: InputMaybe<Array<InputMaybe<BasketItemContent>>>;
    id?: InputMaybe<Scalars['ID']>;
    store?: InputMaybe<Scalars['ID']>;
};
type UpdateReceiveStatusContent = {
    status: AllowedReceiveStatuses;
};
type VoucherCheckContent = {
    amount?: InputMaybe<Scalars['Int']>;
    code: Scalars['String'];
    expire_date?: InputMaybe<Scalars['String']>;
    limit?: InputMaybe<Scalars['Int']>;
    start_date?: InputMaybe<Scalars['String']>;
    voucher_type?: InputMaybe<Scalars['String']>;
};
type BlogArticlesParams = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
    search?: InputMaybe<Scalars['String']>;
};
type BlogHighlightsParams = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};
type GetCookieMutation = {
    __typename?: 'Mutation';
    user: {
        __typename?: 'UserMutation';
        getCookie?: {
            __typename?: 'Token';
            access: string;
            refresh: string;
        } | null;
    };
};
type GetTokenMutation = {
    __typename?: 'Mutation';
    user: {
        __typename?: 'UserMutation';
        getToken?: {
            __typename?: 'Token';
            access: string;
            refresh: string;
        } | null;
    };
};
type GetRefreshTokenMutation = {
    __typename?: 'Mutation';
    user: {
        __typename?: 'UserMutation';
        getRefreshToken?: {
            __typename?: 'AccessToken';
            access: string;
        } | null;
    };
};
type CreateProfileMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        createProfile: {
            __typename?: 'Profile';
            first_name?: string | null;
            last_name?: string | null;
        };
    };
};
type OtpSendMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        otpSend?: any | null;
    };
};
type OtpSendV2Mutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        otpSendV2: {
            __typename?: 'OTP';
            is_forget_password?: boolean | null;
            is_register?: boolean | null;
        };
    };
};
type OtpSendSignupMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        otpSendSignup: {
            __typename?: 'Token';
            refresh: string;
            access: string;
        };
    };
};
type GetChangePasswordAuthMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        getChangePasswordAuth: {
            __typename?: 'Auth';
            auth: string;
        };
    };
};
type ForgetPasswordMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        forgetPassword?: any | null;
    };
};
type ChangePasswordWithoutOtpMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        changePasswordWithoutOtp?: any | null;
    };
};
type UpdateNotificationSettingMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        updateNotificationSetting: {
            __typename?: 'NotificationSetting';
            hot_offer_available_email_notify: boolean;
            id: string;
            product_available_sms_notify: boolean;
            product_available_email_notify: boolean;
            product_available_internal_notify: boolean;
            hot_offer_available_sms_notify: boolean;
            hot_offer_available_internal_notify: boolean;
            receive_order_sms_notify: boolean;
            receive_order_email_notify: boolean;
            receive_order_internal_notify: boolean;
            order_invoice_sms_notify: boolean;
            order_invoice_email_notify: boolean;
            order_invoice_internal_notify: boolean;
            return_invoice_sms_notify: boolean;
            return_invoice_email_notify: boolean;
            return_invoice_internal_notify: boolean;
            survey_sms_notify: boolean;
            survey_email_notify: boolean;
            survey_internal_notify: boolean;
        };
    };
};
type UpdateProfileMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        updateProfile: {
            __typename?: 'Profile';
            id: string;
            phone_number: string;
            national_code?: string | null;
            telephone_number?: string | null;
            sheba_number?: string | null;
            card_number?: string | null;
            birthday?: string | null;
            gender?: number | null;
            marriage_date?: string | null;
            first_name?: string | null;
            last_name?: string | null;
            email?: string | null;
            gender_display?: string | null;
        };
    };
};
type PaymentCardMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        paymentCard?: any | null;
    };
};
type UpdateBasketMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        updateBasket: {
            __typename?: 'Basket';
            id: string;
            temp_id?: string | null;
            basket_items: Array<{
                __typename?: 'BasketItem';
                product_id: string;
                amount?: number | null;
                cost?: number | null;
                cost_change?: number | null;
                discount_amount?: number | null;
                has_loyalty?: boolean | null;
                id: string;
                is_unlimited?: boolean | null;
                loyalty_gift?: number | null;
                max_quantity?: number | null;
                online_cost?: number | null;
                online_primary_cost?: number | null;
                primary_cost?: number | null;
                product_label?: string | null;
                stock?: string | null;
                orderable_count?: number | null;
                variant_name?: string | null;
                variant_id?: string | null;
                tax?: boolean | null;
                single_tax?: number | null;
                bonus_value?: number | null;
                image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                option_values?: Array<{
                    __typename?: 'OptionValue';
                    id: string;
                    value: string;
                    color_code: string;
                    option: {
                        __typename?: 'OptionValueOption';
                        id: string;
                        name: string;
                        is_color: boolean;
                    };
                } | null> | null;
            }>;
        };
    };
};
type VoucherCheckMutation = {
    __typename?: 'Mutation';
    customer?: {
        __typename?: 'PromotionMutation';
        voucherCheck?: {
            __typename?: 'Voucher';
            amount?: number | null;
            code?: string | null;
            expire_date?: string | null;
            id?: string | null;
            limit?: number | null;
            start_date?: string | null;
            voucher_type?: number | null;
            voucher_type_display?: string | null;
        } | null;
    } | null;
};
type RemoveFavoriteMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        removeFavorite?: any | null;
    };
};
type AddFavoriteMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        addFavorite?: any | null;
    };
};
type CreateOrderMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        createOrder: {
            __typename?: 'Order';
            id?: string | null;
            gateway_link?: string | null;
            transaction_type?: number | null;
            registration_type?: number | null;
        };
    };
};
type DeleteAddressMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        deleteAddress?: any | null;
    };
};
type CreateAddressMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        createAddress: {
            __typename?: 'Address';
            city?: string | null;
            province?: string | null;
            address: string;
            no?: number | null;
            postal_code?: string | null;
            id: string;
            unit_number?: number | null;
            description?: string | null;
            receiver_name?: string | null;
            receiver_lastname?: string | null;
            receiver_number?: string | null;
            name?: string | null;
            longitude?: string | null;
            latitude?: string | null;
        };
    };
};
type PartialUpdateAddressMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        partialUpdateAddress: {
            __typename?: 'Address';
            city?: string | null;
            province?: string | null;
            address: string;
            no?: number | null;
            postal_code?: string | null;
            id: string;
            unit_number?: number | null;
            description?: string | null;
            receiver_name?: string | null;
            receiver_lastname?: string | null;
            receiver_number?: string | null;
            name?: string | null;
            longitude?: string | null;
            latitude?: string | null;
        };
    };
};
type GetGatewayMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        getGateway: {
            __typename?: 'Gateway';
            gateway_link?: string | null;
        };
    };
};
type ClearCookieMutation = {
    __typename?: 'Mutation';
    user: {
        __typename?: 'UserMutation';
        clearCookie?: any | null;
    };
};
type CancelOrderMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        cancelOrder?: any | null;
    };
};
type UpdateReceiveStatusMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        updateReceiveStatus?: any | null;
    };
};
type ReturnOrderMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        returnOrder: {
            __typename?: 'ReturnOrder';
            id: string;
            status: number;
            reference_code: string;
            order_reference_code: string;
            created_at: string;
            status_display: string;
            order_created_at: string;
            first_name: string;
            last_name: string;
            phone_number: string;
            card_number: string;
            total_returned_cost: number;
            items: Array<{
                __typename?: 'ReturnItem';
                id: string;
                status_display: string;
                reason: string;
                returned_cost: number;
                count: number;
                description: string;
                reply_reason: string;
                reply_description: string;
                relative_voucher_amount: number;
            }>;
        };
    };
};
type UpdateThemeCustomizationMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        updateThemeCustomization: {
            __typename?: 'ThemeCustomization';
            id?: string | null;
            data?: any | null;
        };
    };
};
type CreateThemeCustomizationMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        createThemeCustomization: {
            __typename?: 'ThemeCustomization';
            id?: string | null;
            data?: any | null;
        };
    };
};
type CreateStoreOpeningNotifierMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        createStoreOpeningNotifier?: any | null;
    };
};
type UploadImageMutation = {
    __typename?: 'Mutation';
    item?: {
        __typename?: 'ItemMutation';
        uploadImage?: {
            __typename?: 'Image';
            id: string;
            uuid: string;
            image: string;
        } | null;
    } | null;
};
type LikeBlogArticleMutation = {
    __typename?: 'Mutation';
    customer: {
        __typename?: 'CustomerMutation';
        likeBlogArticle: {
            __typename?: 'Highlight';
            article: {
                __typename?: 'Article';
                id: number;
                title: string;
                content: string;
                published_at: string;
                view_count: number;
                image: string;
                is_active: boolean;
                is_liked: boolean;
                like_count: number;
                is_highlight: boolean;
                slug: string;
                tags: Array<{
                    __typename?: 'ArticleTag';
                    id: number;
                    title: string;
                }>;
                category: Array<{
                    __typename?: 'ArticleCategory';
                    id: number;
                    title: string;
                    parent?: number | null;
                }>;
            };
        };
    };
};
type GetAppearanceQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getAppearance: {
            __typename?: 'Appearance';
            id: string;
            theme?: {
                __typename?: 'AppearanceTheme';
                id: string;
                name: number;
                is_luxury: boolean;
                product_card_type_display: number;
                mobile_hot_offer_show: boolean;
                name_display: string;
                hot_offer_gradient_type_display: string;
                primary_color: string;
                second_primary_color: string;
                discount_color: string;
                hot_offer_gradient_color: string;
                hot_offer_gradient_type: number;
                images?: Array<{
                    __typename?: 'HeroImage';
                    id: string;
                    image: string;
                } | null> | null;
            } | null;
        };
    };
};
type GetStoreInfoQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getStoreInfo: {
            __typename?: 'StoreInfo';
            brand: number;
            id: string;
            name: string;
            hotjar_token: string;
            google_analytics_token: string;
            phone_number: string;
            first_name: string;
            last_name: string;
            email: string;
            guild: string;
            is_earning_loyalty_active: boolean;
            ray_chat_enabled: boolean;
            telephone_number: string;
            tax: boolean;
            ray_chat_token: string;
            store_address: {
                __typename?: 'StoreAddress';
                province: string;
                city: string;
                address: string;
                postal_code?: string | null;
                longitude: string;
                latitude: string;
            };
            logo?: {
                __typename?: 'Image';
                id: string;
                image: string;
            } | null;
            social_media?: {
                __typename?: 'SocialMedia';
                twitter: string;
                facebook: string;
                linkedin: string;
                telegram: string;
                whatsapp: string;
                instagram: string;
            } | null;
            ecommerce: {
                __typename?: 'Ecommerce';
                domain: string;
                is_open: boolean;
                about_us: string;
                about_returns: string;
                shipping_guide: string;
                e_namad_reference_link: string;
                e_namad_img_src: string;
                e_namad_img_id: string;
                e_namad_meta_content: string;
                show_digify_logo: boolean;
                cover?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
            };
            earning: {
                __typename?: 'Earning';
                game_type: number;
                value: number;
                limit: number;
                game_type_display: string;
            };
        };
    };
};
type GetBasketQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getBasket: {
            __typename?: 'Basket';
            id: string;
            temp_id?: string | null;
            basket_items: Array<{
                __typename?: 'BasketItem';
                product_id: string;
                amount?: number | null;
                cost?: number | null;
                cost_change?: number | null;
                discount_amount?: number | null;
                has_loyalty?: boolean | null;
                id: string;
                is_unlimited?: boolean | null;
                loyalty_gift?: number | null;
                max_quantity?: number | null;
                online_cost?: number | null;
                online_primary_cost?: number | null;
                primary_cost?: number | null;
                product_label?: string | null;
                stock?: string | null;
                orderable_count?: number | null;
                variant_name?: string | null;
                variant_id?: string | null;
                tax?: boolean | null;
                single_tax?: number | null;
                bonus_value?: number | null;
                image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                option_values?: Array<{
                    __typename?: 'OptionValue';
                    id: string;
                    value: string;
                    color_code: string;
                    option: {
                        __typename?: 'OptionValueOption';
                        id: string;
                        name: string;
                        is_color: boolean;
                    };
                } | null> | null;
            }>;
        };
    };
};
type GetProductsQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getProducts: {
            __typename?: 'MinifiedProducts';
            count: number;
            next?: string | null;
            results: Array<{
                __typename?: 'MinifiedProduct';
                average_score?: number | null;
                id: string;
                label?: string | null;
                hot_offer_expired_date?: string | null;
                has_stock?: boolean | null;
                orderable_count?: number | null;
                colors?: Array<{
                    __typename?: 'Color';
                    color_code?: string | null;
                    id: string;
                } | null> | null;
                min_variant?: {
                    __typename?: 'MinVariant';
                    id?: string | null;
                    cost?: number | null;
                    stock?: string | null;
                    time_delay?: number | null;
                    is_unlimited?: boolean | null;
                    loyalty_gift?: number | null;
                    primary_cost?: number | null;
                    max_quantity?: number | null;
                    profit_percent?: number | null;
                    tax?: boolean | null;
                    single_tax?: number | null;
                } | null;
                main_image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                images?: Array<{
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null> | null;
            }>;
        };
    };
};
type GetProductQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getProduct: {
            __typename?: 'Product';
            id: string;
            label: string;
            description: string;
            tax: boolean;
            average_score: number;
            voter_number: number;
            product_stock: number;
            feedback_count: number;
            has_stock: boolean;
            profit_percent: number;
            has_loyalty_gift: boolean;
            is_favorite: boolean;
            category: {
                __typename?: 'Category';
                id: string;
                title: string;
                parent?: string | null;
            };
            variants: Array<{
                __typename?: 'Variant';
                id: string;
                cost: number;
                stock: string;
                orderable_count: number;
                time_delay: number;
                is_active?: boolean | null;
                is_unlimited: boolean;
                loyalty_gift: number;
                cost_expired_at?: string | null;
                primary_cost: number;
                max_quantity: number;
                images: Array<{
                    __typename?: 'Image';
                    id: string;
                    image: string;
                }>;
                option_values?: Array<{
                    __typename?: 'OptionValue';
                    id: string;
                    value: string;
                    color_code: string;
                    option: {
                        __typename?: 'OptionValueOption';
                        id: string;
                        name: string;
                        is_color: boolean;
                    };
                }> | null;
            }>;
            images: Array<{
                __typename?: 'Image';
                id: string;
                image: string;
            }>;
            features: Array<{
                __typename?: 'Feature';
                id?: string | null;
                title: string;
                description: string;
            }>;
            chosen_image?: {
                __typename?: 'Image';
                id: string;
                image: string;
            } | null;
        };
    };
};
type GetSuggestionProductsQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getSuggestionProducts: {
            __typename?: 'MinifiedProducts';
            results: Array<{
                __typename?: 'MinifiedProduct';
                id: string;
                label?: string | null;
                orderable_count?: number | null;
                average_score?: number | null;
                has_stock?: boolean | null;
                min_variant?: {
                    __typename?: 'MinVariant';
                    id?: string | null;
                    cost?: number | null;
                    stock?: string | null;
                    is_unlimited?: boolean | null;
                    loyalty_gift?: number | null;
                    primary_cost?: number | null;
                    max_quantity?: number | null;
                    profit_percent?: number | null;
                } | null;
                image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                colors?: Array<{
                    __typename?: 'Color';
                    id: string;
                    value?: string | null;
                    color_code?: string | null;
                } | null> | null;
            }>;
        };
    };
};
type GetProductFeedbackQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getProductFeedback: {
            __typename?: 'ProductFeedbacks';
            count: number;
            next?: string | null;
            previous?: string | null;
            results: Array<{
                __typename?: 'ProductFeedback';
                score: number;
                description: string;
                reply: string;
                created_at: string;
                first_name: string;
                last_name: string;
                images: Array<{
                    __typename?: 'Image';
                    id: string;
                    uuid: string;
                    image: string;
                }>;
                variant: {
                    __typename?: 'Variant';
                    name: string;
                    option_values?: Array<{
                        __typename?: 'OptionValue';
                        id: string;
                        value: string;
                        color_code: string;
                        option: {
                            __typename?: 'OptionValueOption';
                            id: string;
                            name: string;
                            is_color: boolean;
                        };
                    }> | null;
                };
            }>;
        };
    };
};
type ProductFilteringQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        productFiltering: {
            __typename?: 'ProductFiltering';
            available_maximum_cost: number;
            categories: Array<Array<string | null> | null>;
            colors: Array<Array<string>>;
            has_discount: Array<boolean | null>;
            has_stock: Array<boolean | null>;
            maximum_cost: number;
            minimum_cost: number;
            options: Array<{
                __typename?: 'ProductFilteringOptions';
                name: string;
                option_values: Array<Array<string>>;
            }>;
            custom_categories: Array<{
                __typename?: 'Category';
                title: string;
                id: string;
                child_categories: Array<{
                    __typename?: 'Category';
                    title: string;
                    id: string;
                    child_categories: Array<{
                        __typename?: 'Category';
                        title: string;
                        id: string;
                    }>;
                }>;
            }>;
        };
    };
};
type GetCategoriesQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getCategories: {
            __typename?: 'Categories';
            count?: number | null;
            results?: Array<{
                __typename?: 'Category';
                id: string;
                title: string;
                image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                children?: Array<{
                    __typename?: 'Category';
                    id: string;
                    title: string;
                    image?: {
                        __typename?: 'Image';
                        id: string;
                        image: string;
                    } | null;
                    children?: Array<{
                        __typename?: 'Category';
                        id: string;
                        title: string;
                        image?: {
                            __typename?: 'Image';
                            id: string;
                            image: string;
                        } | null;
                        children?: Array<{
                            __typename?: 'Category';
                            id: string;
                            title: string;
                            image?: {
                                __typename?: 'Image';
                                id: string;
                                image: string;
                            } | null;
                            children?: Array<{
                                __typename?: 'Category';
                                id: string;
                                title: string;
                                image?: {
                                    __typename?: 'Image';
                                    id: string;
                                    image: string;
                                } | null;
                            } | null> | null;
                        } | null> | null;
                    } | null> | null;
                } | null> | null;
            } | null> | null;
        };
    };
};
type GetProfileQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getProfile: {
            __typename?: 'Profile';
            id: string;
            phone_number: string;
            national_code?: string | null;
            telephone_number?: string | null;
            card_number?: string | null;
            birthday?: string | null;
            marriage_date?: string | null;
            first_name?: string | null;
            last_name?: string | null;
            email?: string | null;
            granted?: boolean | null;
        };
    };
};
type GetNotificationSettingQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getNotificationSetting: {
            __typename?: 'NotificationSetting';
            id: string;
            product_available_sms_notify: boolean;
            product_available_email_notify: boolean;
            product_available_internal_notify: boolean;
            hot_offer_available_sms_notify: boolean;
            hot_offer_available_email_notify: boolean;
            hot_offer_available_internal_notify: boolean;
            receive_order_sms_notify: boolean;
            receive_order_email_notify: boolean;
            receive_order_internal_notify: boolean;
            order_invoice_sms_notify: boolean;
            order_invoice_email_notify: boolean;
            order_invoice_internal_notify: boolean;
            return_invoice_sms_notify: boolean;
            return_invoice_email_notify: boolean;
            return_invoice_internal_notify: boolean;
            survey_sms_notify: boolean;
            survey_email_notify: boolean;
            survey_internal_notify: boolean;
        };
    };
};
type GetOrdersQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getOrdersV3: {
            __typename?: 'UserOrders';
            count?: number | null;
            next?: string | null;
            results: Array<{
                __typename?: 'UserOrder';
                cost: number;
                reference_code: string;
                created_at: string;
                id: string;
                status: number;
                previous_status?: number | null;
                expired_at: string;
                owner_card_name: string;
                received_at?: string | null;
                registration_type: number;
                shipping_time_count?: number | null;
                owner_card_number: string;
                is_finished: boolean;
                received_by_customer: boolean;
                cancellation_reason?: string | null;
                items: Array<{
                    __typename?: 'UserOrderItems';
                    details: {
                        __typename?: 'UserOrderItemsDetail';
                        variant: {
                            __typename?: 'UserOrderItemsDetailVariant';
                            product_serialized?: {
                                __typename?: 'ProductSerialized';
                                label: string;
                                id: string;
                                images?: Array<{
                                    __typename?: 'Image';
                                    id: string;
                                    image: string;
                                } | null> | null;
                            } | null;
                        };
                    };
                }>;
                approximate_sending_date?: {
                    __typename?: 'ApproximateSendingDate';
                    start?: string | null;
                    end?: string | null;
                } | null;
                returns?: {
                    __typename?: 'ReturnsID';
                    id?: number | null;
                    status?: number | null;
                    reference_code?: string | null;
                    created_at?: string | null;
                } | null;
                shipping: {
                    __typename?: 'Shipping';
                    name: string;
                };
            }>;
        };
    };
};
type GetOrderQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getOrderV3: {
            __typename?: 'UserOrder';
            cost: number;
            created_at: string;
            received_at?: string | null;
            registration_type: number;
            order_description: string;
            shipping_time_count?: number | null;
            receiver_name: string;
            receiver_number: string;
            receiver_last_name: string;
            loyalty_amount: number;
            total_discount_cost: number;
            pocket_cost: number;
            tax: number;
            status: number;
            previous_status?: number | null;
            expired_at: string;
            post_tracking_number: string;
            reference_code: string;
            customer_shipping_cost: number;
            cancellation_reason?: string | null;
            owner_card_name: string;
            owner_card_number: string;
            id: string;
            is_finished: boolean;
            received_by_customer: boolean;
            can_return_request: boolean;
            address: {
                __typename?: 'Address';
                address: string;
            };
            approximate_sending_date?: {
                __typename?: 'ApproximateSendingDate';
                start?: string | null;
                end?: string | null;
            } | null;
            pocket?: {
                __typename?: 'Pocket';
                name?: string | null;
            } | null;
            shipping: {
                __typename?: 'Shipping';
                name: string;
            };
            items: Array<{
                __typename?: 'UserOrderItems';
                id: string;
                single_cost: number;
                unit_amount: number;
                details: {
                    __typename?: 'UserOrderItemsDetail';
                    variant: {
                        __typename?: 'UserOrderItemsDetailVariant';
                        cost: number;
                        cost_expired_at?: string | null;
                        id: string;
                        is_return?: boolean | null;
                        name?: string | null;
                        online_cost?: number | null;
                        online_primary_cost?: number | null;
                        primary_cost?: number | null;
                        time_delay?: number | null;
                        images?: Array<{
                            __typename?: 'Image';
                            id: string;
                            image: string;
                        } | null> | null;
                        option_values?: Array<{
                            __typename?: 'OptionValue';
                            value: string;
                            color_code: string;
                            option: {
                                __typename?: 'OptionValueOption';
                                name: string;
                                is_color: boolean;
                            };
                        } | null> | null;
                        product_serialized?: {
                            __typename?: 'ProductSerialized';
                            id: string;
                            label: string;
                            images?: Array<{
                                __typename?: 'Image';
                                id: string;
                                image: string;
                            } | null> | null;
                        } | null;
                    };
                };
            }>;
        };
    };
};
type GetReturnedOrderQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getReturnedOrder: {
            __typename?: 'ReturnOrder';
            id: string;
            status: number;
            reference_code: string;
            order_reference_code: string;
            created_at: string;
            status_display: string;
            first_name: string;
            order_created_at: string;
            last_name: string;
            phone_number: string;
            card_number: string;
            total_returned_cost: number;
            items: Array<{
                __typename?: 'ReturnItem';
                id: string;
                status_display: string;
                status: number;
                reason: string;
                returned_cost: number;
                count: number;
                description: string;
                reply_reason: string;
                reply_description: string;
                relative_voucher_amount: number;
                images: Array<{
                    __typename?: 'Image';
                    id: string;
                    uuid: string;
                    image: string;
                }>;
                order_item: {
                    __typename?: 'ReturnOrderItem';
                    id?: string | null;
                    single_cost?: number | null;
                    single_primary_cost?: number | null;
                    single_tax?: number | null;
                    single_profit?: number | null;
                    product_label?: string | null;
                    details?: {
                        __typename?: 'OrderItemsDetail';
                        variant?: {
                            __typename?: 'Variant';
                            id: string;
                            cost: number;
                            name: string;
                            status: number;
                            online_primary_cost: number;
                            primary_cost: number;
                            online_cost: number;
                            images: Array<{
                                __typename?: 'Image';
                                id: string;
                                uuid: string;
                                image: string;
                            }>;
                            product_serialized?: {
                                __typename?: 'ProductSerialized';
                                name: string;
                                id: string;
                                label: string;
                                images?: Array<{
                                    __typename?: 'Image';
                                    id: string;
                                    uuid: string;
                                    image: string;
                                } | null> | null;
                            } | null;
                            option_values?: Array<{
                                __typename?: 'OptionValue';
                                id: string;
                                value: string;
                                color_code: string;
                                option: {
                                    __typename?: 'OptionValueOption';
                                    id: string;
                                    name: string;
                                    is_color: boolean;
                                };
                            }> | null;
                        } | null;
                    } | null;
                };
            }>;
        };
    };
};
type GetOrdersStatusCountQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getOrderStatusCount: {
            __typename?: 'Orders';
            returns_count: number;
            status_count: Array<{
                __typename?: 'OrderStatusCount';
                status: number;
                total: number;
            }>;
        };
    };
};
type GetBreadcrumbQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getBreadcrumb: {
            __typename?: 'Breadcrumb';
            id: string;
            title: string;
            image?: {
                __typename?: 'Image';
                id: string;
                image: string;
            } | null;
            child?: {
                __typename?: 'BreadcrumbChild';
                id?: string | null;
                title?: string | null;
                image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                child?: {
                    __typename?: 'BreadcrumbChild';
                    id?: string | null;
                    title?: string | null;
                    image?: {
                        __typename?: 'Image';
                        id: string;
                        image: string;
                    } | null;
                    child?: {
                        __typename?: 'BreadcrumbChild';
                        id?: string | null;
                        title?: string | null;
                        image?: {
                            __typename?: 'Image';
                            id: string;
                            image: string;
                        } | null;
                        child?: {
                            __typename?: 'BreadcrumbChild';
                            id?: string | null;
                            title?: string | null;
                            image?: {
                                __typename?: 'Image';
                                id: string;
                                image: string;
                            } | null;
                        } | null;
                    } | null;
                } | null;
            } | null;
        };
    };
};
type GetAddressesQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getAddresses: Array<{
            __typename?: 'Address';
            city?: string | null;
            province?: string | null;
            address: string;
            no?: number | null;
            postal_code?: string | null;
            id: string;
            unit_number?: number | null;
            description?: string | null;
            receiver_name?: string | null;
            receiver_lastname?: string | null;
            receiver_number?: string | null;
            name?: string | null;
            longitude?: string | null;
            latitude?: string | null;
        } | null>;
    };
};
type GetShippingAddressesQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getShippingAddresses: Array<{
            __typename?: 'ShippingAddress';
            cost: number;
            id: string;
            name: string;
            shipping_delay: number;
            shipping_type: number;
            shipping_type_display?: string | null;
            time_sending: number;
        } | null>;
    };
};
type GetPocketQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getPocket: Array<{
            __typename?: 'Pocket';
            cost?: number | null;
            id?: string | null;
            is_active?: boolean | null;
            name?: string | null;
        } | null>;
    };
};
type GetLoyaltyCreditQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getLoyaltyCreditV2: {
            __typename?: 'LoyaltyCredit';
            loyalty_credit: number;
        };
    };
};
type GetFavoritesQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getFavoritesV2: {
            __typename?: 'MinifiedProducts';
            count: number;
            next?: string | null;
            results: Array<{
                __typename?: 'MinifiedProduct';
                average_score?: number | null;
                id: string;
                label?: string | null;
                hot_offer_expired_date?: string | null;
                has_stock?: boolean | null;
                orderable_count?: number | null;
                colors?: Array<{
                    __typename?: 'Color';
                    color_code?: string | null;
                    id: string;
                } | null> | null;
                min_variant?: {
                    __typename?: 'MinVariant';
                    id?: string | null;
                    cost?: number | null;
                    stock?: string | null;
                    time_delay?: number | null;
                    is_unlimited?: boolean | null;
                    loyalty_gift?: number | null;
                    primary_cost?: number | null;
                    max_quantity?: number | null;
                    profit_percent?: number | null;
                } | null;
                main_image?: {
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null;
                images?: Array<{
                    __typename?: 'Image';
                    id: string;
                    image: string;
                } | null> | null;
            }>;
        };
    };
};
type IsFavoriteQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        isFavorite: {
            __typename?: 'IsFavorite';
            is_favorite: boolean;
        };
    };
};
type GetTransactionTypesQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getTransactionTypes: Array<{
            __typename?: 'TransactionTypes';
            gateway_type?: number | null;
            persian_gateway_type?: string | null;
        } | null>;
    };
};
type GetLoyaltyLogsQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getLoyaltyLogs: {
            __typename?: 'LoyaltyLogs';
            count: number;
            next?: string | null;
            results: Array<{
                __typename?: 'LoyaltyLog';
                account_credit: number;
                amount: number;
                created_at: string;
                id: string;
                log_type_display: string;
                order_cost?: number | null;
                reason?: string | null;
                data?: {
                    __typename?: 'LoyaltyLogData';
                    game?: number | null;
                } | null;
            }>;
        };
    };
};
type GetApproximateSendingDateQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getShippingAddress: {
            __typename?: 'ShippingAddress';
            approximate_sending_date?: {
                __typename?: 'ShippingAddressApproximateSendingDate';
                start: string;
                end: string;
            } | null;
        };
    };
};
type GetThemeCustomizationQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getThemeCustomization: {
            __typename?: 'ThemeCustomization';
            id?: string | null;
            data?: any | null;
        };
    };
};
type GetUserTypeQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getUserType: {
            __typename?: 'UserType';
            type?: string | null;
        };
    };
};
type GetVariantsStockQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getVariantsStock: Array<{
            __typename?: 'VariantsStock';
            id: string;
            orderable_count: number;
        } | null>;
    };
};
type GetBlogArticlesQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getBlogArticles: {
            __typename?: 'Articles';
            count: number;
            next?: string | null;
            previous?: string | null;
            results: Array<{
                __typename?: 'Article';
                id: number;
                title: string;
                content: string;
                published_at: string;
                view_count: number;
                like_count: number;
                image: string;
                is_active: boolean;
                is_liked: boolean;
                is_highlight: boolean;
                slug: string;
                tags: Array<{
                    __typename?: 'ArticleTag';
                    id: number;
                    title: string;
                }>;
                category: Array<{
                    __typename?: 'ArticleCategory';
                    id: number;
                    title: string;
                    parent?: number | null;
                }>;
            }>;
        };
    };
};
type GetBlogHighlightsQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getBlogHighlights: {
            __typename?: 'Highlights';
            count: number;
            next?: string | null;
            previous?: string | null;
            results: Array<{
                __typename?: 'Highlight';
                id: number;
                article: {
                    __typename?: 'Article';
                    id: number;
                    title: string;
                    image: string;
                    slug: string;
                };
            }>;
        };
    };
};
type GetBlogArticleQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getBlogArticle: {
            __typename?: 'Article';
            id: number;
            title: string;
            content: string;
            published_at: string;
            view_count: number;
            image: string;
            is_active: boolean;
            is_liked: boolean;
            like_count: number;
            is_highlight: boolean;
            slug: string;
            tags: Array<{
                __typename?: 'ArticleTag';
                id: number;
                title: string;
            }>;
            category: Array<{
                __typename?: 'ArticleCategory';
                id: number;
                title: string;
                parent?: number | null;
            }>;
        };
    };
};
type GetSitemapQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getSitemap: string;
    };
};
type GetTokenPanelQuery = {
    __typename?: 'Query';
    notification?: {
        __typename?: 'NotificationQuery';
        getToken?: {
            __typename?: 'OtpToken';
            token: string;
        } | null;
    } | null;
};
type GetShippingSokectQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'CustomerQuery';
        getShippingSokect: Array<{
            __typename?: 'ShippingAddress';
            cost: number;
            id: string;
            name: string;
            shipping_delay: number;
            shipping_type: number;
            shipping_type_display?: string | null;
            time_sending: number;
        } | null>;
    };
};

declare const GET_COOKIE: _graphql_typed_document_node_core.TypedDocumentNode<GetCookieMutation, Exact<{
    content: TokenContent;
}>>;
declare const GET_TOKEN: _graphql_typed_document_node_core.TypedDocumentNode<GetTokenMutation, Exact<{
    content: TokenContent;
}>>;
declare const GET_REFRESH_TOKEN: _graphql_typed_document_node_core.TypedDocumentNode<GetRefreshTokenMutation, Exact<{
    content: RefreshTokenContent;
}>>;
declare const CREATE_PROFILE: _graphql_typed_document_node_core.TypedDocumentNode<CreateProfileMutation, Exact<{
    content: InputMaybe<ProfileContent>;
}>>;
declare const OTP_SEND: _graphql_typed_document_node_core.TypedDocumentNode<OtpSendMutation, Exact<{
    content: InputMaybe<OtpSendContent>;
}>>;
declare const OTP_SEND_V2: _graphql_typed_document_node_core.TypedDocumentNode<OtpSendV2Mutation, Exact<{
    content: InputMaybe<OtpSendContent>;
}>>;
declare const OTP_SEND_SIGNUP: _graphql_typed_document_node_core.TypedDocumentNode<OtpSendSignupMutation, Exact<{
    content: InputMaybe<GetTokenByOtpSingUpContent>;
}>>;
declare const GET_CHANGE_AUTH_PASSWORD: _graphql_typed_document_node_core.TypedDocumentNode<GetChangePasswordAuthMutation, Exact<{
    content: InputMaybe<GetTokenByOtpContent>;
}>>;
declare const FORGET_PASSWORD: _graphql_typed_document_node_core.TypedDocumentNode<ForgetPasswordMutation, Exact<{
    content: InputMaybe<ForgetPasswordContent>;
}>>;
declare const CHANGE_PASSWORD_WITHOUT_OTP: _graphql_typed_document_node_core.TypedDocumentNode<ChangePasswordWithoutOtpMutation, Exact<{
    content: InputMaybe<ChangePasswordWithoutOtpContent>;
}>>;
declare const UPDATE_NOTIFICATION_SETTINGS: _graphql_typed_document_node_core.TypedDocumentNode<UpdateNotificationSettingMutation, Exact<{
    content: InputMaybe<NotificationSettingContent>;
}>>;
declare const UPDATE_PROFILE: _graphql_typed_document_node_core.TypedDocumentNode<UpdateProfileMutation, Exact<{
    content: InputMaybe<ProfileContent>;
}>>;
declare const PAYMENT_CARD: _graphql_typed_document_node_core.TypedDocumentNode<PaymentCardMutation, Exact<{
    orderId: string;
    image: any;
}>>;
declare const UPDATE_BASKET: _graphql_typed_document_node_core.TypedDocumentNode<UpdateBasketMutation, Exact<{
    uuid: InputMaybe<string>;
    content: InputMaybe<UpdateBasketContent>;
}>>;
declare const VOUCHER_CHECK: _graphql_typed_document_node_core.TypedDocumentNode<VoucherCheckMutation, Exact<{
    content: VoucherCheckContent;
}>>;
declare const REMOVE_FAVORITES: _graphql_typed_document_node_core.TypedDocumentNode<RemoveFavoriteMutation, Exact<{
    id: string;
}>>;
declare const ADD_FAVORITES: _graphql_typed_document_node_core.TypedDocumentNode<AddFavoriteMutation, Exact<{
    id: string;
}>>;
declare const CREATE_ORDER: _graphql_typed_document_node_core.TypedDocumentNode<CreateOrderMutation, Exact<{
    content: InputMaybe<CreateOrderContent>;
}>>;
declare const DELETE_ADDRESS: _graphql_typed_document_node_core.TypedDocumentNode<DeleteAddressMutation, Exact<{
    id: string;
}>>;
declare const CREATE_ADDRESS: _graphql_typed_document_node_core.TypedDocumentNode<CreateAddressMutation, Exact<{
    content: InputMaybe<AddressContent$1>;
}>>;
declare const UPDATE_ADDRESS: _graphql_typed_document_node_core.TypedDocumentNode<PartialUpdateAddressMutation, Exact<{
    id: string;
    content: InputMaybe<AddressContent$1>;
}>>;
declare const GET_GATEWAY: _graphql_typed_document_node_core.TypedDocumentNode<GetGatewayMutation, Exact<{
    id: InputMaybe<string>;
    content: GatewayLinkUrlContent;
}>>;
declare const CLEAR_COOKIE: _graphql_typed_document_node_core.TypedDocumentNode<ClearCookieMutation, Exact<{
    [key: string]: never;
}>>;
declare const CANCEL_ORDER: _graphql_typed_document_node_core.TypedDocumentNode<CancelOrderMutation, Exact<{
    id: string;
}>>;
declare const UPDATE_RECIEVE_STATUS: _graphql_typed_document_node_core.TypedDocumentNode<UpdateReceiveStatusMutation, Exact<{
    orderId: string;
    content: UpdateReceiveStatusContent;
}>>;
declare const RETURN_ORDER: _graphql_typed_document_node_core.TypedDocumentNode<ReturnOrderMutation, Exact<{
    content: InputMaybe<ReturnOrderContent>;
}>>;
declare const UPDATE_THEME_CUSTOMIZATION: _graphql_typed_document_node_core.TypedDocumentNode<UpdateThemeCustomizationMutation, Exact<{
    themeName: InputMaybe<string>;
    data: any;
}>>;
declare const CREATE_THEME_CUSTOMIZATION: _graphql_typed_document_node_core.TypedDocumentNode<CreateThemeCustomizationMutation, Exact<{
    themeName: InputMaybe<string>;
    data: any;
}>>;
declare const CREATE_STORE_OPENING_STORE_NOTIFIER: _graphql_typed_document_node_core.TypedDocumentNode<CreateStoreOpeningNotifierMutation, Exact<{
    content: InputMaybe<CreateStoreOpeningNotifierContent>;
}>>;
declare const UPLOAD_IMAGE: _graphql_typed_document_node_core.TypedDocumentNode<UploadImageMutation, Exact<{
    file: any;
}>>;
declare const LIKE_BLOG_ARTICLE: _graphql_typed_document_node_core.TypedDocumentNode<LikeBlogArticleMutation, Exact<{
    id: string;
}>>;
declare const updateProfileMutatuin: () => {
    updateProfile: (options?: _apollo_client.MutationFunctionOptions<UpdateProfileMutation, Exact<{
        content: InputMaybe<ProfileContent>;
    }>, _apollo_client.DefaultContext, _apollo_client.ApolloCache<any>> | undefined) => Promise<_apollo_client.FetchResult<UpdateProfileMutation, Record<string, any>, Record<string, any>>>;
    updateProfileLoading: boolean;
};

declare const GET_APPEARANCE: _graphql_typed_document_node_core.TypedDocumentNode<GetAppearanceQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_STORE_INFO: _graphql_typed_document_node_core.TypedDocumentNode<GetStoreInfoQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_BASKET: _graphql_typed_document_node_core.TypedDocumentNode<GetBasketQuery, Exact<{
    uuid: InputMaybe<string>;
}>>;
declare const GET_PRODUCTS: _graphql_typed_document_node_core.TypedDocumentNode<GetProductsQuery, Exact<{
    params: InputMaybe<ProductsParams>;
}>>;
declare const GET_PRODUCT: _graphql_typed_document_node_core.TypedDocumentNode<GetProductQuery, Exact<{
    id: string;
}>>;
declare const GET_SUGGESTION_PRODUCTS: _graphql_typed_document_node_core.TypedDocumentNode<GetSuggestionProductsQuery, Exact<{
    productId: string;
}>>;
declare const GET_PRODUCTS_FEEDBACK: _graphql_typed_document_node_core.TypedDocumentNode<GetProductFeedbackQuery, Exact<{
    productId: string;
    params: InputMaybe<ProductFeedbackParams>;
}>>;
declare const GET_PRODUCT_FILTER_PARAMS: _graphql_typed_document_node_core.TypedDocumentNode<ProductFilteringQuery, Exact<{
    params: InputMaybe<ProductsParams>;
}>>;
declare const GET_CATEGORIES: _graphql_typed_document_node_core.TypedDocumentNode<GetCategoriesQuery, Exact<{
    params: InputMaybe<CategoriesParams>;
}>>;
declare const GET_PROFILE: _graphql_typed_document_node_core.TypedDocumentNode<GetProfileQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_NOTIFICATION_SETTING: _graphql_typed_document_node_core.TypedDocumentNode<GetNotificationSettingQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_ORDERS: _graphql_typed_document_node_core.TypedDocumentNode<GetOrdersQuery, Exact<{
    params: InputMaybe<OrdersParams>;
}>>;
declare const GET_ORDER: _graphql_typed_document_node_core.TypedDocumentNode<GetOrderQuery, Exact<{
    orderId: string;
}>>;
declare const GET_RETURNED_ORDER: _graphql_typed_document_node_core.TypedDocumentNode<GetReturnedOrderQuery, Exact<{
    orderId: string;
}>>;
declare const GET_ORDERS_STATUS_COUNT: _graphql_typed_document_node_core.TypedDocumentNode<GetOrdersStatusCountQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_BREADCRUMB: _graphql_typed_document_node_core.TypedDocumentNode<GetBreadcrumbQuery, Exact<{
    params: InputMaybe<BreadcrumbParams$1>;
}>>;
declare const GET_ADDRESSES: _graphql_typed_document_node_core.TypedDocumentNode<GetAddressesQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_SHIPPING_ADDRESS: _graphql_typed_document_node_core.TypedDocumentNode<GetShippingAddressesQuery, Exact<{
    addressId: string;
}>>;
declare const GET_POCKET: _graphql_typed_document_node_core.TypedDocumentNode<GetPocketQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_LOYALTY_CREDIT: _graphql_typed_document_node_core.TypedDocumentNode<GetLoyaltyCreditQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_FAVORITES: _graphql_typed_document_node_core.TypedDocumentNode<GetFavoritesQuery, Exact<{
    params: InputMaybe<FavoritesParams>;
}>>;
declare const IS_FAVORITE: _graphql_typed_document_node_core.TypedDocumentNode<IsFavoriteQuery, Exact<{
    id: string;
}>>;
declare const GET_TRANSACTION_TYPES: _graphql_typed_document_node_core.TypedDocumentNode<GetTransactionTypesQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_LOYALTY_LOGS: _graphql_typed_document_node_core.TypedDocumentNode<GetLoyaltyLogsQuery, Exact<{
    params: InputMaybe<LoyaltyLogsParams>;
}>>;
declare const GET_APPROXIMATE_SENDING_DATE: _graphql_typed_document_node_core.TypedDocumentNode<GetApproximateSendingDateQuery, Exact<{
    addressId: string;
    id: string;
}>>;
declare const GET_THEME_CUSTOMIZATION: _graphql_typed_document_node_core.TypedDocumentNode<GetThemeCustomizationQuery, Exact<{
    themeName: InputMaybe<string>;
}>>;
declare const GET_USER_TYPE: _graphql_typed_document_node_core.TypedDocumentNode<GetUserTypeQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_VARIANTS_STOCK: _graphql_typed_document_node_core.TypedDocumentNode<GetVariantsStockQuery, Exact<{
    ids: string | string[];
}>>;
declare const GET_BLOG_ARTICLES: _graphql_typed_document_node_core.TypedDocumentNode<GetBlogArticlesQuery, Exact<{
    params: InputMaybe<BlogArticlesParams>;
}>>;
declare const GET_BLOG_HIGHLIGHTS: _graphql_typed_document_node_core.TypedDocumentNode<GetBlogHighlightsQuery, Exact<{
    params: InputMaybe<BlogHighlightsParams>;
}>>;
declare const GET_BLOG_ARTICLE: _graphql_typed_document_node_core.TypedDocumentNode<GetBlogArticleQuery, Exact<{
    id: string;
}>>;
declare const GET_SITE_MAP: _graphql_typed_document_node_core.TypedDocumentNode<GetSitemapQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_WEBSOCKET_NOTIF: _graphql_typed_document_node_core.TypedDocumentNode<GetTokenPanelQuery, Exact<{
    [key: string]: never;
}>>;
declare const GET_SHIPPING_ADDRESS_SOCKET: _graphql_typed_document_node_core.TypedDocumentNode<GetShippingSokectQuery, Exact<{
    addressId: string;
}>>;

interface Image {
    id: number | string;
    uuid?: string;
    image: string;
}

interface Options {
    offset: number;
    limit: number;
}
interface ProductFeedback {
    data: FeedbackData;
    loading: boolean;
    error: ApolloError;
    paginationHandler: (page: number) => void;
    pageHandlerDesktop: (page: number) => void;
}
interface FeedbackData {
    pages: number[];
    page: number;
    resultsPerPage: Comment[];
    results: Comment[];
    count: number;
}
interface Comment {
    score: number;
    images: Image[];
    description: string;
    reply: string;
    created_at: string;
    first_name: string;
    last_name: string;
    variant: $$Variant;
}
interface $$Variant {
    option_values?: $OptionValue[] | null;
    name: string;
}
interface $OptionValue {
    id?: number | string | null;
    value: string;
    option: $$Option;
    color_code: string;
}
interface $$Option {
    id?: string | number | null;
    name: string;
    is_color: boolean;
}

declare const useProductFeedback: (options?: Partial<Options>) => ProductFeedback;

interface BreadcrumbParams {
    id?: string;
    type?: 'CATEGORY' | 'PRODUCT';
}
interface IBreadcrumb {
    data: CategoryChild | null;
    loading: boolean;
    error: ApolloError;
}
interface CategoryDeepChild {
    id: number | string | null;
    child: Partial<CategoryDeepChild> | null;
    title: string | null;
    image: Pick<Image, 'id' | 'image'> | null;
    link: Link | unknown;
}
interface CategoryChild {
    id: number | string;
    child?: Partial<CategoryDeepChild> | null;
    title: string;
    image?: Pick<Image, 'id' | 'image'> | null;
    link?: Link;
}

declare const useBreadcrumb: ({ id, type }?: BreadcrumbParams) => IBreadcrumb;

interface $Categories {
    loading: boolean;
    error: ApolloError;
    data: {
        categories: $Category[];
    };
    count: number;
    link: Link;
}
interface $Category {
    id: string;
    title: string;
    image: Pick<Image, 'id' | 'image'>;
    children: $Category[];
}

declare const useCategories: () => $Categories;

interface Theme {
    data?: Appearance | null;
    loading: boolean;
    error: ApolloError;
}
interface HeroImage {
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

declare const useTheme: () => Theme;

interface StoreInfo {
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
    handleCreateStoreOpeningNotifier: (data: Partial<{
        email: string;
        phoneNumber: string;
    }>) => Promise<void>;
    storeOpeningNotifierError: ApolloError;
    storeOpeningNotifierLoading: boolean;
}

declare const useStoreInfo: () => StoreInfo;

interface NewBasketItem {
    amount: number;
    online_cost: number;
    has_loyalty_gift: boolean;
    online_primary_cost: number;
    variant_name: string;
    image: {
        image: string | undefined;
    };
    option_values: OptionValue$1[];
    product_id: number | string;
    variant_id: number | string;
    bonus_value: number;
    product_label: string;
    orderable_count: number;
    tax: boolean | number;
    single_tax: number | boolean;
}
interface BasketData {
    items: any[];
    address: string;
    receiverInfo: ReceiverInfo;
    shipping: string;
    transaction: string;
    packing: string;
    discount: string;
    useLoyalty: boolean;
    description: string;
}
interface ReceiverInfo {
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string;
}
interface Basket$1 {
    data: BasketData;
    initialSync: boolean;
    handleUpdateLocalBasket: (basket: Partial<BasketData>) => void;
    handleClearBasket: (onCompleted: void) => void;
    handleLogoutBasket: (onCompleted: void) => void;
    handleAddToBasket: (item: NewBasketItem, onCompleted: void) => void;
    handleItemsAmount: (variantId: string, type: 'increment' | 'decrement' | 'remove', onCompleted: void) => void;
    handleAddToFavorites: (id: string, variant_id: string, onCompleted: void) => void;
    updateBasketLoading: boolean;
    setInitialSync: (value: boolean) => void;
}

interface ThemeConfig {
    apollo: ApolloConfig;
    customization: Customization;
}
interface Customization {
    config: CustomizationConfig;
    schema: CustomizationSchema;
}
interface CustomizationConfig {
    themeName: string;
}
interface CustomizationSchema {
    [model: string]: {
        [field: string]: CustomizationSchemaModel;
    };
}
interface CustomizationSchemaModel {
    type: CustomizationSchemaType;
    options?: CustomizationSchemaOption[];
    defaultValue: any;
}
type CustomizationSchemaType = 'string' | 'number' | 'container' | 'boolean' | 'checkbox' | 'object' | 'object[]' | 'string[]' | 'number[]' | 'boolean[]' | 'component[]';
interface CustomizationSchemaOption {
    key: string;
    value: any;
    additionalData: any;
}

declare const initializeApp: (Component: any, themeConfig: ThemeConfig, queries?: SSRQueries[]) => {
    (props: any): JSX.Element;
    getInitialProps(appContext: any): Promise<{
        pageProps: any;
        storeId: number;
    } | {
        pageProps: {
            statusCode: number;
        };
        storeId?: undefined;
    } | undefined>;
};

interface StoreContext {
    basket: Basket$1;
    customization: any;
}

declare const useStore: () => StoreContext;

declare const isUserLoggedIn: () => boolean;

declare const withApollo: (C: any) => (...queries: SSRQueries[][]) => any;

interface Orders {
    data: {
        statusCount: OrdersStatusCount;
        ordersList: OrdersList;
    };
    loading: boolean;
    error: ApolloError;
}
type HandleSubmitCardToCardPayment = (orderId: string, image: File) => Promise<void>;
type HandleRefundOrder = (orderId: string) => void;
type HandleRePayOrder = (orderId: string) => Promise<void>;
type HandleRemoveOrder = (orderId: string) => Promise<void>;
type HandleUnrecivedOrder = (orderId: string, recivedStatus: 5 | 17) => Promise<void>;
interface UseOrderActions {
    handleSubmitCardToCardPayment: HandleSubmitCardToCardPayment;
    handleRemoveOrder: HandleRemoveOrder;
    handleRePayOrder: HandleRePayOrder;
    handleUnreceivedOrder: HandleUnrecivedOrder;
    error: ApolloError;
    loading: boolean;
}
type OrderStatusName = 'UNPAID' | 'PAID' | 'WAITING_FOR_APPROVAL' | 'WAITING_FOR_PAYMENT' | 'WAITING_FOR_PAYMENT_APPROVAL' | 'IN_PREPARING' | 'SENT' | 'RECEIVED' | 'UNRECEIVED' | 'EXPIRED' | 'OVERTIME_ORDER_BY_MERCHANT' | 'CANCELED_ORDER_BY_MERCHANT' | 'CANCELED_ORDER_BY_MERCHANT_SETTLED' | 'CANCELED_REQUEST_BY_MERCHANT' | 'OVERTIME_ORDER_BY_MERCHANT_SETTLED' | 'OVERTIME_REQUEST_BY_MERCHANT' | 'OVERTIME_PAYMENT_BY_CUSTOMER';
interface Order {
    id: string;
    link: Link;
    products: {
        image: string;
        link: Link;
        name: string;
    }[];
    referenceCode: string;
    createdAt: string;
    cost: string | number;
    stepDescription: string;
    statusName: OrderStatusName;
    handleRemoveOrder?: HandleRemoveOrder;
    handlePayOrder?: HandleRePayOrder;
    handleSubmitCardToCardPayment?: HandleSubmitCardToCardPayment;
    handleUnrecivedOrder?: HandleUnrecivedOrder;
    handleRecivedOrder?: HandleUnrecivedOrder;
    paymentInformation?: {
        orderId: string;
        cardNumber: string;
        cardOwnerName: string;
        cost: string | number;
    };
    loading?: boolean;
    error?: ApolloError;
}
interface OrdersList {
    orders: Order[];
    error: ApolloError;
    loading: boolean;
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
}
type OrdersSearchParamsStatuses = 'PROCESSING' | 'RECEIVED' | 'RETURNED' | 'CANCELED' | 'WAITING_FOR_PAYMENT';
interface OrdersSearchParams {
    status: OrdersSearchParamsStatuses;
    offset: number;
}
interface StatusItem {
    count: number;
    selected: boolean;
}
interface Statuses {
    inProgress: StatusItem;
    waitingForPayment: StatusItem;
    received: StatusItem;
    returned: StatusItem;
    canceled: StatusItem;
}
interface OrdersStatusCount {
    statuses: Statuses;
    handleChangeTab: (status: string) => Promise<void>;
    loading: boolean;
    error: ApolloError;
}

declare const useOrders: () => Orders;

interface OrderDetail {
    error: ApolloError;
    loading: boolean;
    data: {
        invoice: OrderInvoice;
        items: OrderItems;
        status: OrderStatus;
        orderId: string;
    };
    navigateToOrdersPage: () => void;
}
interface OrderInvoice {
    reference_code?: string;
    created_at?: string;
    received_at?: string;
    cost?: string | number;
    shippingMethod?: string;
    shipping_time_count?: number | null;
    paymentMethod?: string;
    packingMethod?: string;
    receiver_name?: string;
    receiver_number?: string;
    address?: string;
    status?: number;
    post_tracking_number?: string;
    order_description?: string;
}
interface OrderItems {
    items: MiniProduct[];
    cost: number;
    totalProductsCost: number;
    productsCount: number;
    customer_shipping_cost: number;
    loyalty_amount: number;
    pocket_cost: number;
    total_discount_cost: number;
    tax: number;
}
type PaymentMethod = 'GATEWAY' | 'CARD_TO_CARD';
type OrderState = 'ERROR' | 'SUCCESS';
interface OrderStatus {
    paymentMethod: PaymentMethod;
    progressStep: number;
    stepTitle: string;
    stepDescription?: string;
    expired_at?: Date;
    statusName?: OrderStatusName;
    orderState: OrderState;
    can_return_request: boolean;
    handleRemoveOrder?: HandleRemoveOrder;
    handlePayOrder?: HandleRePayOrder;
    handleRefundOrder?: HandleRefundOrder;
    handleUnrecivedOrder?: HandleUnrecivedOrder;
    handleRecivedOrder?: HandleUnrecivedOrder;
    handleSubmitCardToCardPayment?: HandleSubmitCardToCardPayment;
    paymentInformation?: {
        id: string;
        owner_card_number: string;
        owner_card_name: string;
        cost: number;
    };
}

declare const useOrderDetail: () => OrderDetail;

type TFactor = {
    items: IUseReturnedOrderItem[];
    approvedProductsCount: number;
    allReturnedCost: number;
};
interface IUseReturnedOrderDetail {
    data: {
        status: IUseReturnedOrderStatus;
        invoice: IUseReturnedOrderInvoice;
        items: IUseReturnedOrderItem[];
        factor?: TFactor;
        navigateToFactor?: () => void;
    };
    error: ApolloError;
    loading: boolean;
}
interface IUseReturnedOrderInvoice {
    reference_code: string;
    order_reference_code: string;
    created_at: string;
    order_created_at: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    card_number: string;
}
interface IUseReturnedOrderStatus {
    step: number;
    status_display: string;
    step_description: string;
}
interface IUseReturnedOrderItem {
    id: number | string;
    reason: string;
    description: string;
    images: Image$1[];
    reply_reason: string;
    reply_description: string;
    status: number;
    status_display: string;
    returned_cost: number;
    count: number;
    order_item: MiniProduct;
    single_cost: number;
    single_primary_cost: number;
    single_profit: number;
    relative_voucher_amount: number;
    single_tax: number;
}

declare const useReturnedOrderDetail: () => IUseReturnedOrderDetail;

declare const useReturnedOrderStatus: () => IUseReturnedOrderStatus;

declare const useReturnedOrderInvoice: () => IUseReturnedOrderInvoice;

declare const useReturnedOrderItems: () => IUseReturnedOrderItem[];

type InfoFields = 'birthday' | 'card_number' | 'email' | 'first_name' | 'last_name' | 'marriage_date' | 'national_code' | 'phone_number' | 'telephone_number';
type UserRole = 'guest' | 'manager' | 'customer';
interface Info {
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
interface User {
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

declare const useUser: () => User;

type TSelectableOrder = {
    product: MiniProduct;
    handleSelectItem: () => void;
    selected: boolean;
    selectedID: string;
};
interface IRefundedValueOrder {
    reason: string | null;
    description: string | null;
    images: string[];
    orderItemId: string;
}
interface IUseRefundOrder extends Omit<OrderDetail, 'invoice' | 'items' | 'orderId'> {
    step: number;
    handleNextStep: (reasonValues: IRefundedValueOrder[]) => void;
    selectableItems: TSelectableOrder[];
    reasonItems: string[];
    selectedItems: MiniProduct[];
    info: IChangeableUserInformations;
    navigateBack: () => void;
    navigateToOrdersPage: () => void;
    navigateToReturnedOrderPage: () => void;
}
type TUserInformations = 'last_name' | 'first_name' | 'phone_number';
interface IChangeableUserInformations extends Pick<Info, TUserInformations> {
    handleChangeCardNumber: (value: string) => void;
    card_number: string;
}
type TPickOrderDetail = 'error' | 'loading' | 'data';
interface IUseSelectableOrder extends Pick<OrderDetail, TPickOrderDetail> {
    selectableItems: TSelectableOrder[];
    createSelectedItems: () => void;
    selectedItems: MiniProduct[];
}

declare const useRefundOrder: () => IUseRefundOrder;

declare const useSelectableOrder: () => IUseSelectableOrder;

interface AddressContent {
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
interface Address {
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
interface Addresses {
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

declare const useAddress: () => Addresses;

interface MiniFavoriteProduct extends MiniProduct {
    handleRemoveFavorite: () => Promise<void>;
}
interface Favorites {
    loadings: {
        fetchLoading: boolean;
        addLoading: boolean;
    };
    errors: {
        fetchError: ApolloError;
        addError: ApolloError;
    };
    data: MiniFavoriteProduct[];
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
    handleAddToFavorites: (id: string, onCompleted?: () => void, onError?: () => void) => Promise<void>;
}
interface FavoritesSearchParams {
    offset: number;
}

declare const useFavorites: () => Favorites;

type SettingField = 'sms' | 'email' | 'internal';
interface Setting {
    [key: string]: {
        value: boolean;
        handleChange: () => void;
    };
}
interface Settings {
    hot_offer_available: Setting;
    order_invoice: Setting;
    product_available: Setting;
    receive_order: Setting;
    return_invoice: Setting;
    survey: Setting;
}
interface NotificationSettings {
    loadings: {
        fetchLoading: boolean;
        updateLoading: boolean;
    };
    errors: {
        fetchError: ApolloError;
        updateError: ApolloError;
    };
    data: {
        settings: Settings;
    };
    handleSaveSettings: (onCompleted: () => void) => void;
    handleAggregateSelect: (settingField: SettingField, type: 'SELECT' | 'DE_SELECT') => void;
}

declare const useNotificationSettings: () => NotificationSettings;

type BasketStep = 'items' | 'address' | 'shipping' | 'payment' | 'pay-order';
interface Basket {
    steps: {
        items: BasketStepItems;
        addresses: BasketAddresses;
        shipping: {
            shippingMethod: ShippingMethod;
            packing: Packing;
        };
        payment: {
            transaction: TransactionType;
            discount: DiscountCode;
            loyaltyCredit: LoyaltyCredit;
            loyaltyGift: LoyaltyGift;
        };
    };
    paymentLoading: boolean;
    paymentError: ApolloError;
    factor: Factor;
    activeStep: BasketStep;
    handleNextStep: () => Promise<void>;
    description: BasketDescription;
    handleChangStep: (step: BasketItems) => void;
}
interface BasketStepItems extends BasketItems {
    outOfStockItems: OutOfStockItem[];
}
interface OutOfStockItem extends Omit<ProductItems, 'handleDecrementAmount' | 'handleIncrementAmount' | 'handleRemove'> {
    handleDecrementAmount?: () => void;
    handleIncrementAmount?: () => void;
    handleRemove?: () => void;
}
interface BasketAddress extends Address {
    handleSelectAddress: () => void;
    selected: boolean;
}
interface BasketAddresses extends Addresses {
    addresses: BasketAddress[];
    receiverInfo: ReceiverInfo;
    handleChangeReceiverInfo: (info: ReceiverInfo) => void;
}
interface ProductItems {
    id: string;
    image: string;
    /**
     * Product name
     */
    product_label: string;
    product_id: number;
    /**
     * Number of products added to cart
     */
    amount: number;
    /**
     * Cost after discount
     */
    online_cost: number;
    /**
     * Cost before discount
     */
    online_primary_cost: number;
    has_loyalty: boolean;
    /**
     * tax ? cost * amount * 0.09 : 0;
     */
    tax: number;
    link: Link;
    single_tax: number;
    bonus_value: number;
    optionValue: OptionValue$1[];
    variant: {
        variant_name: string;
        variant_id: string;
        orderable_count: number;
    };
    handleIncrementAmount: () => void;
    handleDecrementAmount: () => void;
    handleRemove: () => void;
    handleAddToFavorites: (onCompleted: void) => void;
}
interface BasketItems {
    products: ProductItems[];
    loading: boolean;
    error: ApolloError;
}
interface BasketDescription {
    description: string;
    handleChangeDescription: (value: string) => void;
}
interface Discount {
    amount: number;
    code: string;
    id: string;
    limit: number;
    type: 'percent' | 'cash';
    totalCost: number;
}
interface DiscountCode {
    error: ApolloError;
    loading: boolean;
    discount: Discount;
    code: string;
    handleSubmitDiscountCode: () => Promise<void>;
    handleChangeDiscountCode: (value: string) => void;
    handleRemoveDiscountCode: () => void;
}
interface Factor {
    totalCost: number;
    totalProductsCost: number;
    productsCount: number;
    shippingCost: number;
    packingCost: number;
    discount: number;
    tax: number;
    loyalty: number;
    loyaltyGift: number;
}
interface LoyaltyCredit {
    credit: number;
    handleSelectLoyaltyCredit: () => void;
    loading: boolean;
    error: ApolloError;
    selected: boolean;
}
type Strategy = 'A' | 'B' | 'C' | 'D';
interface LoyaltyGift {
    limit: number;
    value: number;
    strategy: Strategy;
    active: boolean;
}
interface Packs {
    selected: boolean;
    cost: number;
    name: string;
    id: string;
    handleSelectPack: () => void;
}
interface Packing {
    packs: Packs[];
    error: ApolloError;
    loading: boolean;
}
interface Shipping {
    id: string;
    name: string;
    timeSendingDays: number;
    cost: number;
    selected: boolean;
    loading: boolean;
    handleSelectShipping: () => void;
}
interface ShippingMethod {
    fetchShippingMethod: () => Promise<void>;
    shippingList: Shipping[];
    approximateSendingDate: string;
    error: ApolloError;
    loading: boolean;
}
interface Transaction {
    name: string;
    selected: boolean;
    gatewayType: string;
    handleSelectTransactionType: () => void;
}
interface TransactionType {
    transactions: Transaction[];
    error: ApolloError;
    loading: boolean;
}

declare const useBasket: () => Basket;

interface LoyaltyLog {
    strategy: Strategy;
    reason: string;
    date: string;
    time: string;
    account_credit: number;
    amount: number;
    id: string;
}
interface LoyaltyLogs {
    data: {
        logs: LoyaltyLog[];
    };
    error: ApolloError;
    loading: boolean;
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
}

declare const useLoyaltyLogs: () => LoyaltyLogs;

declare const useCustomization: (modelName: string) => {
    data: {
        [model: string]: any;
    };
};

declare const DynamicComponentsContainer: (props: {
    schema: any;
}) => any;

interface ImageUpload {
    image: any;
    id: string;
    uuid: any;
    loading: boolean;
    error: ApolloError;
    handleUploadImage: (image: any) => Promise<void>;
    reset: () => void;
}

declare const useImageUpload: () => ImageUpload;

interface IBlogArticles {
    data: IArticle[];
    search: Search;
    loading: boolean;
    error: ApolloError;
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
    pagination: Pagination;
    next?: string | null;
}
interface IArticle {
    id: number;
    title: string;
    content: string;
    published_at: string;
    view_count: number;
    like_count: number;
    tags: ArticleTag[];
    category: ArticleCategory[];
    image: string;
    is_active: boolean;
    is_liked: boolean;
    is_highlight: boolean;
    slug: string;
    link?: Link;
}
interface ArticleTag {
    id: number;
    title: string;
}
interface ArticleCategory {
    id: number;
    title: string;
    parent?: number | null;
}
interface Search {
    value: string;
    handleChange: (search: string) => void;
    handleClear: () => void;
}

declare const useBlogArticles: ({ offset, limit }?: {
    offset?: number | undefined;
    limit?: number | undefined;
}) => IBlogArticles;

interface IBlogHighlights {
    data: IHighlight[];
    loading: boolean;
    error: ApolloError;
}
interface IHighlight {
    id: number;
    article: IHighlightArticle;
}
interface IHighlightArticle {
    id: number;
    title: string;
    image: string;
    link: Link;
    slug: string;
}

declare const useBlogHighlights: ({ offset, limit }?: {
    offset?: number | undefined;
    limit?: number | undefined;
}) => IBlogHighlights;

interface Article {
    data: IArticle | undefined;
    like: ILike;
    error: ApolloError;
    loading: boolean;
}
interface ILike {
    handleClick: (onCompleted?: () => void) => Promise<void>;
    loading: boolean;
    error: ApolloError;
}

declare const useBlogArticle: () => Article;

interface SoketTypes {
    soket: {
        token: string;
    };
}

declare const useSokect: () => SoketTypes;

declare const setNextCookie: (access: string) => Promise<void>;
declare const clearNextCookie: () => Promise<void>;

declare const handleRefreshToken: (refresh?: string) => Promise<string>;

declare const siteMap: (storeId: any, themeConfig: any) => Promise<string>;

export { $$Option, $$Variant, $Option, $OptionValue, $Product, $Variant, ADD_FAVORITES, Address, AddressContent, Addresses, ApolloConfig, ApolloError, ArticleCategory, ArticleTag, Auth, Basket, BasketAddress, BasketAddresses, BasketDescription, BasketItems, BasketStep, CANCEL_ORDER, CHANGE_PASSWORD_WITHOUT_OTP, CLEAR_COOKIE, CREATE_ADDRESS, CREATE_ORDER, CREATE_PROFILE, CREATE_STORE_OPENING_STORE_NOTIFIER, CREATE_THEME_CUSTOMIZATION, Categories, Category, CategoryChild, Comment, Cost, Customization, CustomizationConfig, CustomizationSchema, CustomizationSchemaModel, CustomizationSchemaOption, CustomizationSchemaType, DELETE_ADDRESS, Data, Discount, DiscountCode, DynamicComponentsContainer, FORGET_PASSWORD, Factor, Favorites, FavoritesSearchParams, Feature, FeedbackData, FilterParams, ForgetPassword, GET_ADDRESSES, GET_APPEARANCE, GET_APPROXIMATE_SENDING_DATE, GET_BASKET, GET_BLOG_ARTICLE, GET_BLOG_ARTICLES, GET_BLOG_HIGHLIGHTS, GET_BREADCRUMB, GET_CATEGORIES, GET_CHANGE_AUTH_PASSWORD, GET_COOKIE, GET_FAVORITES, GET_GATEWAY, GET_LOYALTY_CREDIT, GET_LOYALTY_LOGS, GET_NOTIFICATION_SETTING, GET_ORDER, GET_ORDERS, GET_ORDERS_STATUS_COUNT, GET_POCKET, GET_PRODUCT, GET_PRODUCTS, GET_PRODUCTS_FEEDBACK, GET_PRODUCT_FILTER_PARAMS, GET_PROFILE, GET_REFRESH_TOKEN, GET_RETURNED_ORDER, GET_SHIPPING_ADDRESS, GET_SHIPPING_ADDRESS_SOCKET, GET_SITE_MAP, GET_STORE_INFO, GET_SUGGESTION_PRODUCTS, GET_THEME_CUSTOMIZATION, GET_TOKEN, GET_TRANSACTION_TYPES, GET_USER_TYPE, GET_VARIANTS_STOCK, GET_WEBSOCKET_NOTIF, HandleRePayOrder, HandleRefundOrder, HandleRemoveOrder, HandleSubmitCardToCardPayment, HandleUnrecivedOrder, HeroImage, IArticle, IBlogArticles, IBlogHighlights, IBreadcrumb, IHighlight, IHighlightArticle, IS_FAVORITE, Image$1 as Image, Info, InfoFields, LIKE_BLOG_ARTICLE, Link, Login, Logout, LoyaltyCredit, LoyaltyGift, LoyaltyLog, LoyaltyLogs, MiniFavoriteProduct, MiniProduct, NotificationSettings, OTP_SEND, OTP_SEND_SIGNUP, OTP_SEND_V2, Option, OptionValue, Options, Order, OrderDetail, OrderInvoice, OrderItems, OrderState, OrderStatus, OrderStatusName, Ordering, OrderingTypes, Orders, OrdersList, OrdersSearchParams, OrdersSearchParamsStatuses, OrdersStatusCount, OtherFilters, PAYMENT_CARD, Packing, Packs, Pagination, PaymentMethod, ProductFeedback, ProductItems, ProductSearchParams, Products, REMOVE_FAVORITES, RETURN_ORDER, SSRQueries, SSRQuery, Search$1 as Search, Setting, Settings, Shipping, ShippingMethod, Specifications, StatusItem, Statuses, StoreInfo, Strategy, Theme, ThemeConfig, Transaction, TransactionType, UPDATE_ADDRESS, UPDATE_BASKET, UPDATE_NOTIFICATION_SETTINGS, UPDATE_PROFILE, UPDATE_RECIEVE_STATUS, UPDATE_THEME_CUSTOMIZATION, UPLOAD_IMAGE, UseOrderActions, User, VOUCHER_CHECK, Variant, apolloLocalState, clearNextCookie, handleRefreshToken, initializeApp, isUserLoggedIn, setNextCookie, siteMap, _default as ssrQueries, staticLinks, updateProfileMutatuin, useAddress, useAuth, useBasket, useBlogArticle, useBlogArticles, useBlogHighlights, useBreadcrumb, useCategories, useCustomization, useFavorites, useImageUpload, useLoyaltyLogs, useNotificationSettings, useOrderDetail, useOrders, useProduct, useProductFeedback, useProducts, useRefundOrder, useReturnedOrderDetail, useReturnedOrderInvoice, useReturnedOrderItems, useReturnedOrderStatus, useSelectableOrder as useSelectableItems, useSokect, useStore, useStoreInfo, useSuggestionProducts, useTheme, useUser, withApollo };
