import { graphql } from '../gql';

export const GET_APPEARANCE = graphql(/* GraphQL */ `
    query GetAppearance {
        customer {
            getAppearance {
                id
                theme {
                    id
                    name
                    is_luxury
                    product_card_type_display
                    mobile_hot_offer_show
                    images {
                        id
                        image
                    }
                    name_display
                    hot_offer_gradient_type_display
                    primary_color
                    second_primary_color
                    discount_color
                    hot_offer_gradient_color
                    hot_offer_gradient_type
                }
            }
        }
    }
`);
export const GET_STORE_INFO = graphql(/* GraphQL */ `
    query GetStoreInfo {
        customer {
            getStoreInfo {
                brand
                id
                name
                hotjar_token
                google_analytics_token
                store_address {
                    province
                    city
                    address
                    postal_code
                    longitude
                    latitude
                }
                logo {
                    id
                    image
                }
                social_media {
                    twitter
                    facebook
                    linkedin
                    telegram
                    whatsapp
                    instagram
                }
                phone_number
                first_name
                last_name
                email
                ecommerce {
                    cover {
                        id
                        image
                    }
                    domain
                    is_open
                    about_us
                    about_returns
                    shipping_guide
                    e_namad_reference_link
                    e_namad_img_src
                    e_namad_img_id
                    e_namad_meta_content
                    show_digify_logo
                }
                guild
                earning {
                    game_type
                    value
                    limit
                    game_type_display
                }
                is_earning_loyalty_active
                ray_chat_enabled
                telephone_number
                tax
                ray_chat_token
            }
        }
    }
`);

export const GET_BASKET = graphql(/* GraphQL */ `
    query GetBasket($uuid: String) {
        customer {
            getBasket(uuid: $uuid) {
                id
                temp_id
                basket_items {
                    product_id
                    amount
                    cost
                    cost_change
                    discount_amount
                    has_loyalty
                    id
                    image {
                        id
                        image
                    }
                    is_unlimited
                    loyalty_gift
                    max_quantity
                    online_cost
                    online_primary_cost
                    option_values {
                        id
                        value
                        option {
                            id
                            name
                            is_color
                        }
                        color_code
                    }
                    primary_cost
                    product_label
                    stock
                    orderable_count
                    variant_name
                    variant_id
                    tax
                    single_tax
                    bonus_value
                }
            }
        }
    }
`);
export const GET_PRODUCTS = graphql(/* GraphQL */ `
    query GetProducts($params: ProductsParams) {
        customer {
            getProducts(params: $params) {
                count
                next
                results {
                    average_score
                    colors {
                        color_code
                        id
                    }
                    id
                    label
                    min_variant {
                        id
                        cost
                        stock
                        time_delay
                        is_unlimited
                        loyalty_gift
                        primary_cost
                        max_quantity
                        profit_percent
                        tax
                        single_tax
                    }
                    main_image {
                        id
                        image
                    }
                    images {
                        id
                        image
                    }
                    hot_offer_expired_date
                    has_stock
                    orderable_count
                }
            }
        }
    }
`);
export const GET_PRODUCT = graphql(/* GraphQL */ `
    query GetProduct($id: ID!) {
        customer {
            getProduct(id: $id) {
                id
                label
                description
                category {
                    id
                    title
                    parent
                }
                variants {
                    id
                    cost
                    stock
                    orderable_count
                    images {
                        id
                        image
                    }
                    time_delay
                    is_active
                    is_unlimited
                    loyalty_gift
                    cost_expired_at
                    primary_cost
                    max_quantity
                    option_values {
                        id
                        value
                        option {
                            id
                            name
                            is_color
                        }
                        color_code
                    }
                }
                images {
                    id
                    image
                }
                tax
                features {
                    id
                    title
                    description
                }
                average_score
                voter_number
                chosen_image {
                    id
                    image
                }
                product_stock
                feedback_count
                has_stock
                profit_percent
                has_loyalty_gift
                is_favorite
            }
        }
    }
`);
export const GET_SUGGESTION_PRODUCTS = graphql(/* GraphQL */ `
    query GetSuggestionProducts($productId: ID!) {
        customer {
            getSuggestionProducts(product_id: $productId) {
                results {
                    id
                    label
                    orderable_count
                    min_variant {
                        id
                        cost
                        stock
                        is_unlimited
                        loyalty_gift
                        primary_cost
                        max_quantity
                        profit_percent
                    }
                    image {
                        id
                        image
                    }
                    average_score
                    has_stock
                    colors {
                        id
                        value
                        color_code
                    }
                }
            }
        }
    }
`);
export const GET_PRODUCTS_FEEDBACK = graphql(/* GraphQL */ `
    query GetProductFeedback($productId: ID!, $params: ProductFeedbackParams) {
        customer {
            getProductFeedback(product_id: $productId, params: $params) {
                count
                next
                previous
                results {
                    score
                    description
                    reply
                    images {
                        id
                        uuid
                        image
                    }
                    created_at
                    first_name
                    last_name
                    variant {
                        option_values {
                            id
                            value
                            option {
                                id
                                name
                                is_color
                            }
                            color_code
                        }
                        name
                    }
                }
            }
        }
    }
`);
export const GET_PRODUCT_FILTER_PARAMS = graphql(/* GraphQL */ `
    query ProductFiltering($params: ProductsParams) {
        customer {
            productFiltering(params: $params) {
                available_maximum_cost
                categories
                colors
                has_discount
                has_stock
                maximum_cost
                options {
                    name
                    option_values
                }
                minimum_cost
                custom_categories {
                    title
                    id
                    child_categories {
                        title
                        id
                        child_categories {
                            title
                            id
                        }
                    }
                }
            }
        }
    }
`);
export const GET_CATEGORIES = graphql(/* GraphQL */ `
    query GetCategories($params: CategoriesParams) {
        customer {
            getCategories(params: $params) {
                count
                results {
                    id
                    title
                    image {
                        id
                        image
                    }
                    children {
                        id
                        title
                        image {
                            id
                            image
                        }
                        children {
                            id
                            title
                            image {
                                id
                                image
                            }
                            children {
                                id
                                title
                                image {
                                    id
                                    image
                                }
                                children {
                                    id
                                    title
                                    image {
                                        id
                                        image
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
export const GET_PROFILE = graphql(/* GraphQL */ `
    query GetProfile {
        customer {
            getProfile {
                id
                phone_number
                national_code
                telephone_number
                card_number
                birthday
                marriage_date
                first_name
                last_name
                email
                granted
            }
        }
    }
`);
export const GET_NOTIFICATION_SETTING = graphql(/* GraphQL */ `
    query GetNotificationSetting {
        customer {
            getNotificationSetting {
                id
                product_available_sms_notify
                product_available_email_notify
                product_available_internal_notify
                hot_offer_available_sms_notify
                hot_offer_available_email_notify
                hot_offer_available_internal_notify
                receive_order_sms_notify
                receive_order_email_notify
                receive_order_internal_notify
                order_invoice_sms_notify
                order_invoice_email_notify
                order_invoice_internal_notify
                return_invoice_sms_notify
                return_invoice_email_notify
                return_invoice_internal_notify
                survey_sms_notify
                survey_email_notify
                survey_internal_notify
            }
        }
    }
`);
export const GET_ORDERS = graphql(/* GraphQL */ `
    query GetOrders($params: OrdersParams) {
        customer {
            getOrdersV3(params: $params) {
                count
                next
                results {
                    cost
                    reference_code
                    created_at
                    id
                    items {
                        details {
                            variant {
                                product_serialized {
                                    label
                                    images {
                                        id
                                        image
                                    }
                                    id
                                }
                            }
                        }
                    }
                    status
                    previous_status
                    expired_at
                    approximate_sending_date {
                        start
                        end
                    }
                    owner_card_name
                    received_at
                    registration_type
                    returns {
                        id
                        status
                        reference_code
                        created_at
                    }
                    shipping_time_count
                    owner_card_number
                    approximate_sending_date {
                        start
                        end
                    }
                    is_finished
                    received_by_customer
                    cancellation_reason
                    shipping {
                        name
                    }
                }
            }
        }
    }
`);
export const GET_ORDER = graphql(/* GraphQL */ `
    query GetOrder($orderId: ID!) {
        customer {
            getOrderV3(id: $orderId) {
                address {
                    address
                }
                cost
                created_at
                received_at
                registration_type
                order_description
                shipping_time_count
                receiver_name
                receiver_number
                receiver_last_name
                loyalty_amount
                total_discount_cost
                pocket_cost
                tax
                status
                previous_status
                expired_at
                approximate_sending_date {
                    start
                    end
                }
                pocket {
                    name
                }
                shipping {
                    name
                }
                post_tracking_number
                reference_code
                customer_shipping_cost
                cancellation_reason
                owner_card_name
                owner_card_number
                id
                is_finished
                received_by_customer
                can_return_request
                items {
                    id
                    details {
                        variant {
                            cost
                            cost_expired_at
                            id
                            images {
                                id
                                image
                            }
                            is_return
                            name
                            online_cost
                            online_primary_cost
                            option_values {
                                value
                                option {
                                    name
                                    is_color
                                }
                                color_code
                            }
                            primary_cost
                            time_delay
                            product_serialized {
                                id
                                label
                                images {
                                    id
                                    image
                                }
                            }
                        }
                    }
                    single_cost
                    unit_amount
                }
            }
        }
    }
`);
export const GET_RETURNED_ORDER = graphql(/* GraphQL */ `
    query GetReturnedOrder($orderId: ID!) {
        customer {
            getReturnedOrder(id: $orderId) {
                id
                status
                reference_code
                order_reference_code
                created_at
                status_display
                first_name
                order_created_at
                last_name
                phone_number
                card_number
                total_returned_cost
                items {
                    id
                    status_display
                    status
                    reason
                    returned_cost
                    count
                    description
                    reply_reason
                    reply_description
                    relative_voucher_amount
                    images {
                        id
                        uuid
                        image
                    }
                    order_item {
                        id
                        single_cost
                        single_primary_cost
                        single_tax
                        single_profit
                        product_label
                        details {
                            variant {
                                id
                                cost
                                name
                                images {
                                    id
                                    uuid
                                    image
                                }
                                status
                                online_primary_cost
                                primary_cost
                                product_serialized {
                                    name
                                    id
                                    label
                                    images {
                                        id
                                        uuid
                                        image
                                    }
                                }
                                online_cost
                                option_values {
                                    id
                                    value
                                    color_code
                                    option {
                                        id
                                        name
                                        is_color
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
export const GET_ORDERS_STATUS_COUNT = graphql(/* GraphQL */ `
    query GetOrdersStatusCount {
        customer {
            getOrderStatusCount: getOrders {
                returns_count
                status_count {
                    status
                    total
                }
            }
        }
    }
`);
export const GET_BREADCRUMB = graphql(/* GraphQL */ `
    query GetBreadcrumb($params: BreadcrumbParams) {
        customer {
            getBreadcrumb(params: $params) {
                id
                title
                image {
                    id
                    image
                }
                child {
                    id
                    title
                    image {
                        id
                        image
                    }
                    child {
                        id
                        title
                        image {
                            id
                            image
                        }
                        child {
                            id
                            title
                            image {
                                id
                                image
                            }
                            child {
                                id
                                title
                                image {
                                    id
                                    image
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
export const GET_ADDRESSES = graphql(/* GraphQL */ `
    query GetAddresses {
        customer {
            getAddresses {
                city
                province
                address
                no
                postal_code
                id
                unit_number
                description
                receiver_name
                receiver_lastname
                receiver_number
                name
                longitude
                latitude
            }
        }
    }
`);
export const GET_SHIPPING_ADDRESS = graphql(/* GraphQL */ `
    query getShippingAddresses($addressId: ID!) {
        customer {
            getShippingAddresses(address_id: $addressId) {
                cost
                id
                name
                shipping_delay
                shipping_type
                shipping_type_display
                time_sending
            }
        }
    }
`);
export const GET_POCKET = graphql(/* GraphQL */ `
    query GetPocket {
        customer {
            getPocket {
                cost
                id
                is_active
                name
            }
        }
    }
`);
export const GET_LOYALTY_CREDIT = graphql(/* GraphQL */ `
    query GetLoyaltyCredit {
        customer {
            getLoyaltyCreditV2 {
                loyalty_credit
            }
        }
    }
`);
export const GET_FAVORITES = graphql(/* GraphQL */ `
    query GetFavorites($params: FavoritesParams) {
        customer {
            getFavoritesV2(params: $params) {
                count
                next
                results {
                    average_score
                    colors {
                        color_code
                        id
                    }
                    id
                    label
                    min_variant {
                        id
                        cost
                        stock
                        time_delay
                        is_unlimited
                        loyalty_gift
                        primary_cost
                        max_quantity
                        profit_percent
                    }
                    main_image {
                        id
                        image
                    }
                    images {
                        id
                        image
                    }
                    hot_offer_expired_date
                    has_stock
                    orderable_count
                }
            }
        }
    }
`);
export const IS_FAVORITE = graphql(/* GraphQL */ `
    query IsFavorite($id: ID!) {
        customer {
            isFavorite(id: $id) {
                is_favorite
            }
        }
    }
`);
export const GET_TRANSACTION_TYPES = graphql(/* GraphQL */ `
    query GetTransactionTypes {
        customer {
            getTransactionTypes {
                gateway_type
                persian_gateway_type
            }
        }
    }
`);
export const GET_LOYALTY_LOGS = graphql(/* GraphQL */ `
    query GetLoyaltyLogs($params: LoyaltyLogsParams) {
        customer {
            getLoyaltyLogs(params: $params) {
                count
                next
                results {
                    account_credit
                    amount
                    created_at
                    data {
                        game
                    }
                    id
                    log_type_display
                    order_cost
                    reason
                }
            }
        }
    }
`);
export const GET_APPROXIMATE_SENDING_DATE = graphql(/* GraphQL */ `
    query getApproximateSendingDate($addressId: ID!, $id: ID!) {
        customer {
            getShippingAddress(address_id: $addressId, id: $id) {
                approximate_sending_date {
                    start
                    end
                }
            }
        }
    }
`);
export const GET_THEME_CUSTOMIZATION = graphql(/* GraphQL */ `
    query GetThemeCustomization($themeName: String) {
        customer {
            getThemeCustomization(themeName: $themeName) {
                id
                data
            }
        }
    }
`);
export const GET_USER_TYPE = graphql(/* GraphQL */ `
    query GetUserType {
        customer {
            getUserType {
                type
            }
        }
    }
`);
export const GET_VARIANTS_STOCK = graphql(/* GraphQL */ `
    query GetVariantsStock($ids: [ID!]!) {
        customer {
            getVariantsStock(ids: $ids) {
                id
                orderable_count
            }
        }
    }
`);
export const GET_BLOG_ARTICLES = graphql(/* GraphQL */ `
    query GetBlogArticles($params: blogArticlesParams) {
        customer {
            getBlogArticles(params: $params) {
                count
                next
                previous
                results {
                    id
                    title
                    content
                    published_at
                    view_count
                    like_count
                    tags {
                        id
                        title
                    }
                    category {
                        id
                        title
                        parent
                    }
                    image
                    is_active
                    is_liked
                    is_highlight
                    slug
                }
            }
        }
    }
`);
export const GET_BLOG_HIGHLIGHTS = graphql(/* GraphQL */ `
    query GetBlogHighlights($params: blogHighlightsParams) {
        customer {
            getBlogHighlights(params: $params) {
                count
                next
                previous
                results {
                    id
                    article {
                        id
                        title
                        image
                        slug
                    }
                }
            }
        }
    }
`);
export const GET_BLOG_ARTICLE = graphql(/* GraphQL */ `
    query GetBlogArticle($id: ID!) {
        customer {
            getBlogArticle(id: $id) {
                id
                title
                content
                published_at
                view_count
                tags {
                    id
                    title
                }
                category {
                    id
                    title
                    parent
                }
                image
                is_active
                is_liked
                like_count
                is_highlight
                slug
            }
        }
    }
`);
export const GET_SITE_MAP = graphql(/* GraphQL */ `
    query getSitemap {
        customer {
            getSitemap
        }
    }
`);
export const GET_WEBSOCKET_NOTIF = graphql(/* GraphQL */ `
    query GetTokenPanel {
        notification {
            getToken {
                token
            }
        }
    }
`);
export const GET_SHIPPING_ADDRESS_SOCKET = graphql(/* GraphQL */ `
    query getShippingSokect($addressId: ID!) {
        customer {
            getShippingSokect(address_id: $addressId) {
                cost
                id
                name
                shipping_delay
                shipping_type
                shipping_type_display
                time_sending
            }
        }
    }
`);
