// import { DocumentNode, gql, OperationVariables, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

export const GET_COOKIE = graphql(/* GraphQL */ `
    mutation GetCookie($content: TokenContent!) {
        user {
            getCookie(content: $content) {
                access
                refresh
            }
        }
    }
`);
export const GET_TOKEN = graphql(/* GraphQL */ `
    mutation GetToken($content: TokenContent!) {
        user {
            getToken(content: $content) {
                access
                refresh
            }
        }
    }
`);
export const GET_REFRESH_TOKEN = graphql(/* GraphQL */ `
    mutation GetRefreshToken($content: RefreshTokenContent!) {
        user {
            getRefreshToken(content: $content) {
                access
            }
        }
    }
`);
export const CREATE_PROFILE = graphql(/* GraphQL */ `
    mutation CreateProfile($content: ProfileContent) {
        customer {
            createProfile(content: $content) {
                first_name
                last_name
            }
        }
    }
`);
export const OTP_SEND = graphql(/* GraphQL */ `
    mutation OtpSend($content: OTPSendContent) {
        customer {
            otpSend(content: $content)
        }
    }
`);
export const OTP_SEND_V2 = graphql(/* GraphQL */ `
    mutation OtpSendV2($content: OTPSendContent) {
        customer {
            otpSendV2(content: $content) {
                is_forget_password
                is_register
            }
        }
    }
`);
export const OTP_SEND_SIGNUP = graphql(/* GraphQL */ `
    mutation otpSendSignup($content: GetTokenByOTPSingUpContent) {
        customer {
            otpSendSignup(content: $content) {
                refresh
                access
            }
        }
    }
`);
export const GET_CHANGE_AUTH_PASSWORD = graphql(/* GraphQL */ `
    mutation GetChangePasswordAuth($content: GetTokenByOTPContent) {
        customer {
            getChangePasswordAuth(content: $content) {
                auth
            }
        }
    }
`);
export const FORGET_PASSWORD = graphql(/* GraphQL */ `
    mutation ForgetPassword($content: ForgetPasswordContent) {
        customer {
            forgetPassword(content: $content)
        }
    }
`);
export const CHANGE_PASSWORD_WITHOUT_OTP = graphql(/* GraphQL */ `
    mutation ChangePasswordWithoutOtp($content: ChangePasswordWithoutOtpContent) {
        customer {
            changePasswordWithoutOtp(content: $content)
        }
    }
`);
export const UPDATE_NOTIFICATION_SETTINGS = graphql(/* GraphQL */ `
    mutation UpdateNotificationSetting($content: NotificationSettingContent) {
        customer {
            updateNotificationSetting(content: $content) {
                hot_offer_available_email_notify
                id
                product_available_sms_notify
                product_available_email_notify
                product_available_internal_notify
                hot_offer_available_sms_notify
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
export const UPDATE_PROFILE = graphql(/* GraphQL */ `
    mutation UpdateProfile($content: ProfileContent) {
        customer {
            updateProfile(content: $content) {
                id
                phone_number
                national_code
                telephone_number
                sheba_number
                card_number
                birthday
                gender
                marriage_date
                first_name
                last_name
                email
                gender_display
            }
        }
    }
`);
export const PAYMENT_CARD = graphql(/* GraphQL */ `
    mutation PaymentCard($orderId: ID!, $image: Upload!) {
        customer {
            paymentCard(orderId: $orderId, image: $image)
        }
    }
`);
export const UPDATE_BASKET = graphql(/* GraphQL */ `
    mutation UpdateBasket($uuid: String, $content: UpdateBasketContent) {
        customer {
            updateBasket(content: $content, uuid: $uuid) {
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

export const VOUCHER_CHECK = graphql(/* GraphQL */ `
    mutation VoucherCheck($content: VoucherCheckContent!) {
        customer: promotion {
            voucherCheck(content: $content) {
                amount
                code
                expire_date
                id
                limit
                start_date
                voucher_type
                voucher_type_display
            }
        }
    }
`);
export const REMOVE_FAVORITES = graphql(/* GraphQL */ `
    mutation RemoveFavorite($id: ID!) {
        customer {
            removeFavorite(id: $id)
        }
    }
`);
export const ADD_FAVORITES = graphql(/* GraphQL */ `
    mutation AddFavorite($id: ID!) {
        customer {
            addFavorite(id: $id)
        }
    }
`);
export const CREATE_ORDER = graphql(/* GraphQL */ `
    mutation CreateOrder($content: CreateOrderContent) {
        customer {
            createOrder(content: $content) {
                id
                gateway_link
                transaction_type
                registration_type
            }
        }
    }
`);
export const DELETE_ADDRESS = graphql(/* GraphQL */ `
    mutation DeleteAddress($id: ID!) {
        customer {
            deleteAddress(id: $id)
        }
    }
`);
export const CREATE_ADDRESS = graphql(/* GraphQL */ `
    mutation CreateAddress($content: AddressContent) {
        customer {
            createAddress(content: $content) {
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
export const UPDATE_ADDRESS = graphql(/* GraphQL */ `
    mutation PartialUpdateAddress($id: ID!, $content: AddressContent) {
        customer {
            partialUpdateAddress(id: $id, content: $content) {
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
export const GET_GATEWAY = graphql(/* GraphQL */ `
    mutation GetGateway($id: ID, $content: GatewayLinkUrlContent!) {
        customer {
            getGateway(id: $id, content: $content) {
                gateway_link
            }
        }
    }
`);
export const CLEAR_COOKIE = graphql(/* GraphQL */ `
    mutation ClearCookie {
        user {
            clearCookie
        }
    }
`);
export const CANCEL_ORDER = graphql(/* GraphQL */ `
    mutation CancelOrder($id: ID!) {
        customer {
            cancelOrder(id: $id)
        }
    }
`);

export const UPDATE_RECIEVE_STATUS = graphql(/* GraphQL */ `
    mutation UpdateReceiveStatus($orderId: ID!, $content: UpdateReceiveStatusContent!) {
        customer {
            updateReceiveStatus(id: $orderId, content: $content)
        }
    }
`);

export const RETURN_ORDER = graphql(/* GraphQL */ `
    mutation ReturnOrder($content: ReturnOrderContent) {
        customer {
            returnOrder(content: $content) {
                id
                status
                reference_code
                order_reference_code
                created_at
                items {
                    id
                    status_display
                    reason
                    returned_cost
                    count
                    description
                    reply_reason
                    reply_description
                    relative_voucher_amount
                }
                status_display
                order_created_at
                first_name
                last_name
                phone_number
                card_number
                total_returned_cost
            }
        }
    }
`);
export const UPDATE_THEME_CUSTOMIZATION = graphql(/* GraphQL */ `
    mutation UpdateThemeCustomization($themeName: String, $data: JSON) {
        customer {
            updateThemeCustomization(themeName: $themeName, data: $data) {
                id
                data
            }
        }
    }
`);
export const CREATE_THEME_CUSTOMIZATION = graphql(/* GraphQL */ `
    mutation CreateThemeCustomization($themeName: String, $data: JSON) {
        customer {
            createThemeCustomization(themeName: $themeName, data: $data) {
                id
                data
            }
        }
    }
`);
export const CREATE_STORE_OPENING_STORE_NOTIFIER = graphql(/* GraphQL */ `
    mutation CreateStoreOpeningNotifier($content: CreateStoreOpeningNotifierContent) {
        customer {
            createStoreOpeningNotifier(content: $content)
        }
    }
`);
export const UPLOAD_IMAGE = graphql(/* GraphQL */ `
    mutation UploadImage($file: Upload!) {
        item {
            uploadImage(file: $file) {
                id
                uuid
                image
            }
        }
    }
`);
export const LIKE_BLOG_ARTICLE = graphql(/* GraphQL */ `
    mutation LikeBlogArticle($id: ID!) {
        customer {
            likeBlogArticle(id: $id) {
                article {
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
    }
`);

export const updateProfileMutatuin = () => {
    const [updateProfile, { loading: updateProfileLoading }] = useMutation(UPDATE_PROFILE);
    return {
        updateProfile,
        updateProfileLoading,
    };
};
