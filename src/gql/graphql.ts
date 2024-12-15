/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type AccessToken = {
  __typename?: 'AccessToken';
  access: Scalars['String'];
};

export type ActivateTorobContent = {
  store_id?: InputMaybe<Scalars['ID']>;
};

export type AddFavoriteListContent = {
  list_of_product_id: Array<Scalars['ID']>;
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  no?: Maybe<Scalars['Int']>;
  postal_code?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  receiver_lastname?: Maybe<Scalars['String']>;
  receiver_name?: Maybe<Scalars['String']>;
  receiver_number?: Maybe<Scalars['String']>;
  unit_number?: Maybe<Scalars['Int']>;
};

export type AddressContent = {
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

export type AddressInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
};

export type AdminAccessTokenInput = {
  refresh: Scalars['String'];
};

export type AdminChargeWalletContent = {
  amount?: InputMaybe<Scalars['Int']>;
  store_id?: InputMaybe<Scalars['ID']>;
};

export type AdminTicket = {
  __typename?: 'AdminTicket';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<AdminTickets>>>;
};

export type AdminTickets = {
  __typename?: 'AdminTickets';
  created_at?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  store_name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_phone_number?: Maybe<Scalars['String']>;
};

export type AdminTicketsParams = {
  created_at_max?: InputMaybe<Scalars['String']>;
  created_at_min?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type AllowedNotificationType =
  | 'HOT_OFFER'
  | 'PRODUCT_AVAILABLE';

export type AllowedReceiveStatuses =
  | 'RECEIVED'
  | 'UNRECEIVED';

export type AllowedStatus =
  | 'CANCELED'
  | 'PROCESSING'
  | 'RECEIVED'
  | 'RETURNED'
  | 'WAITING_FOR_PAYMENT';

export type AllowedStatuses =
  | 'CANCELED'
  | 'CONFIRMED'
  | 'EXPIRED'
  | 'PAID'
  | 'PRE_ORDER_NOTIFIED'
  | 'RECEIVED'
  | 'SENT'
  | 'SUBMITTED';

export type AlopeykAvatar = {
  __typename?: 'AlopeykAvatar';
  abs_url?: Maybe<Scalars['String']>;
  base64_url?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Appearance = {
  __typename?: 'Appearance';
  id: Scalars['ID'];
  theme?: Maybe<AppearanceTheme>;
};

export type AppearanceTheme = {
  __typename?: 'AppearanceTheme';
  category_type: Scalars['Int'];
  category_type_display: Scalars['String'];
  discount_color: Scalars['String'];
  header_category_show: Scalars['Boolean'];
  hot_offer_gradient_color: Scalars['String'];
  hot_offer_gradient_type: Scalars['Int'];
  hot_offer_gradient_type_display: Scalars['String'];
  hot_offer_persian_title: Scalars['String'];
  hot_offer_type: Scalars['Int'];
  hot_offer_type_display: Scalars['String'];
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<HeroImage>>>;
  is_luxury: Scalars['Boolean'];
  mobile_hot_offer_show: Scalars['Boolean'];
  more_about_type: Scalars['Int'];
  more_about_type_display: Scalars['String'];
  name: Scalars['Int'];
  name_display: Scalars['String'];
  primary_color: Scalars['String'];
  product_card_type: Scalars['Int'];
  product_card_type_display: Scalars['Int'];
  second_primary_color: Scalars['String'];
};

export type ApproximateSendingDate = {
  __typename?: 'ApproximateSendingDate';
  end?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
};

export type Article = {
  __typename?: 'Article';
  category: Array<ArticleCategory>;
  content: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  is_active: Scalars['Boolean'];
  is_highlight: Scalars['Boolean'];
  is_liked: Scalars['Boolean'];
  like_count: Scalars['Int'];
  published_at: Scalars['String'];
  slug: Scalars['String'];
  store: Scalars['Int'];
  tags: Array<ArticleTag>;
  title: Scalars['String'];
  view_count: Scalars['Int'];
};

export type ArticleCategory = {
  __typename?: 'ArticleCategory';
  id: Scalars['Int'];
  parent?: Maybe<Scalars['Int']>;
  store?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type ArticleTag = {
  __typename?: 'ArticleTag';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Articles = {
  __typename?: 'Articles';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results: Array<Article>;
};

export type Auth = {
  __typename?: 'Auth';
  auth: Scalars['String'];
};

export type Basket = {
  __typename?: 'Basket';
  basket_items: Array<BasketItem>;
  id: Scalars['ID'];
  store: Scalars['Int'];
  temp_id?: Maybe<Scalars['String']>;
};

export type BasketItem = {
  __typename?: 'BasketItem';
  amount?: Maybe<Scalars['Int']>;
  bonus_value?: Maybe<Scalars['Int']>;
  cost?: Maybe<Scalars['Int']>;
  cost_change?: Maybe<Scalars['Int']>;
  discount_amount?: Maybe<Scalars['Int']>;
  has_loyalty?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  is_unlimited?: Maybe<Scalars['Boolean']>;
  loyalty_gift?: Maybe<Scalars['Int']>;
  max_quantity?: Maybe<Scalars['Int']>;
  online_cost?: Maybe<Scalars['Int']>;
  online_primary_cost?: Maybe<Scalars['Int']>;
  option_values?: Maybe<Array<Maybe<OptionValue>>>;
  orderable_count?: Maybe<Scalars['Int']>;
  primary_cost?: Maybe<Scalars['Int']>;
  product_id: Scalars['String'];
  product_label?: Maybe<Scalars['String']>;
  single_tax?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Boolean']>;
  variant_id?: Maybe<Scalars['String']>;
  variant_name?: Maybe<Scalars['String']>;
};

export type BasketItemContent = {
  amount: Scalars['Float'];
  discount_amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  online_cost: Scalars['Int'];
  online_primary_cost: Scalars['Int'];
  orderable_count?: InputMaybe<Scalars['Int']>;
  variant: Scalars['ID'];
};

export type BasketVariant = {
  __typename?: 'BasketVariant';
  barcode?: Maybe<Scalars['Int']>;
  cost_expired_at?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_return?: Maybe<Scalars['Boolean']>;
  is_unlimited?: Maybe<Scalars['Boolean']>;
  loyalty_gift?: Maybe<Scalars['Int']>;
  max_quantity: Scalars['Int'];
  name: Scalars['String'];
  online_cost: Scalars['Int'];
  online_primary_cost?: Maybe<Scalars['Int']>;
  option_values?: Maybe<Array<Maybe<OptionValue>>>;
  product_serialized?: Maybe<ProductSerialized>;
  status: Scalars['Int'];
  stock?: Maybe<Scalars['String']>;
  time_delay: Scalars['Int'];
};

export type Brand = {
  __typename?: 'Brand';
  created_at?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
};

export type Brands = {
  __typename?: 'Brands';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Brand>>>;
};

export type BrandsParams = {
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Breadcrumb = {
  __typename?: 'Breadcrumb';
  child?: Maybe<BreadcrumbChild>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  title: Scalars['String'];
};

export type BreadcrumbChild = {
  __typename?: 'BreadcrumbChild';
  child?: Maybe<BreadcrumbChild>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  title?: Maybe<Scalars['String']>;
};

export type BreadcrumbParams = {
  id: Scalars['ID'];
  type: BreadcrumbType;
};

export type BreadcrumbType =
  | 'CATEGORY'
  | 'PRODUCT';

export type BuyPackageParams = {
  is_reserved?: InputMaybe<Scalars['Boolean']>;
  package?: InputMaybe<Scalars['ID']>;
  voucher?: InputMaybe<Scalars['String']>;
};

export type BuyPackageResult = {
  __typename?: 'BuyPackageResult';
  charge_result?: Maybe<Scalars['Boolean']>;
  gateway_type?: Maybe<Scalars['String']>;
  invoice_id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type CartList = {
  __typename?: 'CartList';
  available_stock: Scalars['Boolean'];
  bonus_value: Scalars['Int'];
  buyableStock: Scalars['Int'];
  category: Scalars['Int'];
  description: Scalars['String'];
  fixed_cost: Scalars['Int'];
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  is_active: Scalars['Boolean'];
  is_service: Scalars['Boolean'];
  label: Scalars['String'];
  name: Scalars['String'];
  offline_visible: Scalars['Boolean'];
  online_visible: Scalars['Boolean'];
  quantity: Scalars['Int'];
  selected_variant?: Maybe<Array<Maybe<Variant>>>;
  tags?: Maybe<Array<Scalars['Int']>>;
  tax: Scalars['Boolean'];
  type: Scalars['Int'];
  type_display: Scalars['String'];
  unit: Scalars['Int'];
  variants?: Maybe<Array<Maybe<Variant>>>;
};

export type Categories = {
  __typename?: 'Categories';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Category>>>;
};

export type CategoriesLite = {
  __typename?: 'CategoriesLite';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<CategoryLite>>>;
};

export type CategoriesParams = {
  all?: InputMaybe<Scalars['Boolean']>;
  has_product?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  parent_id?: InputMaybe<Scalars['ID']>;
  parent_only?: InputMaybe<Scalars['Boolean']>;
};

export type Category = {
  __typename?: 'Category';
  child_categories: Array<Category>;
  children?: Maybe<Array<Maybe<Category>>>;
  discount?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<Product>>>;
  store?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CategoryContent = {
  discount?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  store?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CategoryLite = {
  __typename?: 'CategoryLite';
  child_categories?: Maybe<Array<Maybe<ChildCategoryLite>>>;
  discount?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<CategoryProduct>>>;
  store?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type CategoryMerchant = {
  __typename?: 'CategoryMerchant';
  child_categories?: Maybe<Array<CategoryMerchant>>;
  children?: Maybe<Array<Maybe<CategoryMerchant>>>;
  discount?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<ProductMerchant>>>;
  store?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type ChangePasswordRegisterContent = {
  password?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Int']>;
};

export type ChangePasswordWithoutOtpContent = {
  new_password: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type ChargeAlopeykContent = {
  amount?: InputMaybe<Scalars['Int']>;
  shipping_type?: InputMaybe<Scalars['String']>;
};

export type ChargeSmsParams = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type ChargeWalletInput = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type CheckOtpContent = {
  phone_number?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Int']>;
};

export type CheckSub = {
  __typename?: 'CheckSub';
  is_available: Scalars['Boolean'];
};

export type CheckZarrinPalOtpContent = {
  phone_number: Scalars['String'];
  token: Scalars['Int'];
};

export type ChooseZarrinPalTerminalContent = {
  terminal_id: Scalars['ID'];
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['ID'];
  name: Scalars['String'];
  products?: Maybe<Array<Maybe<Product>>>;
  store: Scalars['ID'];
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type CollectionV2 = {
  __typename?: 'CollectionV2';
  id: Scalars['ID'];
  name: Scalars['String'];
  products?: Maybe<Array<Maybe<MinifiedProduct>>>;
  store: Scalars['ID'];
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Color = {
  __typename?: 'Color';
  color_code?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
};

export type Cost = {
  __typename?: 'Cost';
  cost?: Maybe<Scalars['Int']>;
  primary_cost?: Maybe<Scalars['Int']>;
};

export type CourierInfo = {
  __typename?: 'CourierInfo';
  abs_avatar?: Maybe<AlopeykAvatar>;
  avatar?: Maybe<AlopeykAvatar>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_online?: Maybe<Scalars['Boolean']>;
  last_online?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  plate_number?: Maybe<Scalars['String']>;
  rates_avg?: Maybe<Scalars['String']>;
  referral_code?: Maybe<Scalars['String']>;
};

export type CreateBehPardakhtContent = {
  behpardakht_password: Scalars['String'];
  behpardakht_terminalId: Scalars['String'];
  behpardakht_username: Scalars['String'];
  gateway_type?: InputMaybe<Scalars['Int']>;
};

export type CreateMerchantProfileContent = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  guild: Scalars['String'];
  introduced_code?: InputMaybe<Scalars['String']>;
  last_name: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  sub_domain: Scalars['String'];
  token: Scalars['String'];
};

export type CreateOrderContent = {
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

export type CreatePackageContent = {
  cost: Scalars['Int'];
  duration?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  package_type?: InputMaybe<Scalars['Int']>;
  states?: InputMaybe<Scalars['Int']>;
};

export type CreatePaymentMethodContent = {
  address?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  bpm_password?: InputMaybe<Scalars['String']>;
  bpm_terminal_id?: InputMaybe<Scalars['String']>;
  bpm_username?: InputMaybe<Scalars['String']>;
  cancel_duration_for_approve_order?: InputMaybe<Scalars['Int']>;
  card_number?: InputMaybe<Scalars['String']>;
  card_to_card_customer_payment_duration?: InputMaybe<Scalars['Int']>;
  card_to_card_working_in_holidays?: InputMaybe<Scalars['Boolean']>;
  client_id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  gateway_type?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  last_name?: InputMaybe<Scalars['String']>;
  national_code?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['Int']>;
  secret_key?: InputMaybe<Scalars['String']>;
  sheba_number?: InputMaybe<Scalars['String']>;
  telephone_number?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CreateProfile = {
  __typename?: 'CreateProfile';
  auth?: Maybe<Token>;
  bonus_familiarity?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
};

export type CreatePurchasedPackageContent = {
  cost: Scalars['Int'];
  is_reserved: Scalars['Boolean'];
  renew: Scalars['Boolean'];
  status: Scalars['String'];
  type: Scalars['String'];
};

export type CreateSafirContent = {
  bound?: InputMaybe<Scalars['Int']>;
  code: Scalars['String'];
  email: Scalars['String'];
  expire_date: Scalars['String'];
  first_name: Scalars['String'];
  is_active?: InputMaybe<Scalars['Boolean']>;
  last_name: Scalars['String'];
  phone_number: Scalars['String'];
};

export type CreateShippingContent = {
  address?: InputMaybe<LatLngAddress>;
  cost?: InputMaybe<Scalars['String']>;
  cost_method?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  last_name?: InputMaybe<Scalars['String']>;
  my_province_is_active?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  national_code?: InputMaybe<Scalars['String']>;
  other_provinces_cost?: InputMaybe<Scalars['String']>;
  other_provinces_cost_method?: InputMaybe<Scalars['String']>;
  other_provinces_is_active?: InputMaybe<Scalars['Boolean']>;
  other_provinces_time_sending?: InputMaybe<Scalars['Int']>;
  pay_at_dest?: InputMaybe<Scalars['Boolean']>;
  phone_number?: InputMaybe<Scalars['String']>;
  shipping_type?: InputMaybe<Scalars['Int']>;
  time_sending?: InputMaybe<Scalars['Int']>;
};

export type CreateShippingResponse = {
  __typename?: 'CreateShippingResponse';
  address?: Maybe<Address>;
  chips_values?: Maybe<Array<Maybe<Scalars['String']>>>;
  cost?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_national_post_active?: Maybe<Scalars['Boolean']>;
  my_province_is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  other_provinces_cost?: Maybe<Scalars['Int']>;
  other_provinces_is_active?: Maybe<Scalars['Boolean']>;
  other_provinces_time_sending?: Maybe<Scalars['Int']>;
  pay_at_dest?: Maybe<Scalars['Boolean']>;
  postex_username?: Maybe<Scalars['String']>;
  shipping_type?: Maybe<Scalars['Int']>;
  shipping_type_display?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['Int']>;
  time_sending?: Maybe<Scalars['Int']>;
  title_values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateStoreOpeningNotifierContent = {
  email?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
};

export type CreateVoucherContent = {
  amount?: InputMaybe<Scalars['Int']>;
  bound?: InputMaybe<Scalars['Int']>;
  code?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  expire_date?: InputMaybe<Scalars['String']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  package?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  safir?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['String']>;
  voucher_method?: InputMaybe<Scalars['Int']>;
  voucher_type?: InputMaybe<Scalars['Int']>;
};

export type CreateZarrinPalContent = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone_number: Scalars['String'];
};

export type CurrentPackage = {
  __typename?: 'CurrentPackage';
  can_use_renew_voucher?: Maybe<Scalars['Boolean']>;
  cost?: Maybe<Scalars['Int']>;
  end_date_time?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_activated?: Maybe<Scalars['Boolean']>;
  is_reserved?: Maybe<Scalars['Boolean']>;
  package?: Maybe<CurrentPackageD>;
  package_detail?: Maybe<PackageDetail>;
  renew?: Maybe<Scalars['Boolean']>;
  start_date_time?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  store?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['Int']>;
};

export type CurrentPackageD = {
  __typename?: 'CurrentPackageD';
  cost?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  package_type?: Maybe<Scalars['Int']>;
  package_type_display?: Maybe<Scalars['String']>;
  renew_voucher?: Maybe<Scalars['Boolean']>;
  renew_voucher_amount?: Maybe<Scalars['Int']>;
  renew_voucher_type?: Maybe<Scalars['Int']>;
  show_cost?: Maybe<Scalars['Int']>;
  states?: Maybe<Scalars['Int']>;
};

export type CustomDomainContent = {
  domain?: InputMaybe<Scalars['String']>;
  storeId?: InputMaybe<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  card_number?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone_number: Scalars['String'];
  user?: Maybe<Scalars['Int']>;
};

export type CustomerMutation = {
  __typename?: 'CustomerMutation';
  addFavorite?: Maybe<Scalars['Void']>;
  addFavoriteList?: Maybe<Scalars['Void']>;
  cancelOrder?: Maybe<Scalars['Void']>;
  cancelOrderV3?: Maybe<Scalars['Void']>;
  changePassword?: Maybe<Scalars['Void']>;
  changePasswordWithoutOtp?: Maybe<Scalars['Void']>;
  createAddress: Address;
  createLoyaltyGift: LoyaltyGift;
  createOrder: Order;
  createProfile: Profile;
  createStoreOpeningNotifier?: Maybe<Scalars['Void']>;
  createThemeCustomization: ThemeCustomization;
  createUserNotify: UserNotify;
  deleteAddress?: Maybe<Scalars['Void']>;
  deleteUserNotify: UserNotify;
  forgetPassword?: Maybe<Scalars['Void']>;
  getAdminAccessToken: AccessToken;
  getChangePasswordAuth: Auth;
  getGateway: Gateway;
  likeBlogArticle: Highlight;
  otpSend?: Maybe<Scalars['Void']>;
  otpSendSignup: Token;
  otpSendV2: Otp;
  partialUpdateAddress: Address;
  partialUpdateBasket: Basket;
  paymentCard?: Maybe<Scalars['Void']>;
  removeFavorite?: Maybe<Scalars['Void']>;
  reportAvailable?: Maybe<Scalars['Void']>;
  returnImage: Image;
  returnOrder: ReturnOrder;
  updateAddress: Address;
  updateBasket: Basket;
  updateNotificationSetting: NotificationSetting;
  updateOrderAdd: Order;
  updateProfile: Profile;
  updateReceiveStatus?: Maybe<Scalars['Void']>;
  updateThemeCustomization: ThemeCustomization;
};


export type CustomerMutationAddFavoriteArgs = {
  id: Scalars['ID'];
};


export type CustomerMutationAddFavoriteListArgs = {
  content: InputMaybe<AddFavoriteListContent>;
};


export type CustomerMutationCancelOrderArgs = {
  id: Scalars['ID'];
};


export type CustomerMutationCancelOrderV3Args = {
  id: Scalars['ID'];
};


export type CustomerMutationChangePasswordArgs = {
  content: InputMaybe<ChangePasswordContent>;
};


export type CustomerMutationChangePasswordWithoutOtpArgs = {
  content: InputMaybe<ChangePasswordWithoutOtpContent>;
};


export type CustomerMutationCreateAddressArgs = {
  content: InputMaybe<AddressContent>;
};


export type CustomerMutationCreateLoyaltyGiftArgs = {
  content: InputMaybe<LoyaltyGiftContent>;
};


export type CustomerMutationCreateOrderArgs = {
  content: InputMaybe<CreateOrderContent>;
};


export type CustomerMutationCreateProfileArgs = {
  content: InputMaybe<ProfileContent>;
};


export type CustomerMutationCreateStoreOpeningNotifierArgs = {
  content: InputMaybe<CreateStoreOpeningNotifierContent>;
};


export type CustomerMutationCreateThemeCustomizationArgs = {
  data: InputMaybe<Scalars['JSON']>;
  themeName: InputMaybe<Scalars['String']>;
};


export type CustomerMutationCreateUserNotifyArgs = {
  content: InputMaybe<UserNotifyContent>;
};


export type CustomerMutationDeleteAddressArgs = {
  id: Scalars['ID'];
};


export type CustomerMutationDeleteUserNotifyArgs = {
  product_id: Scalars['ID'];
};


export type CustomerMutationForgetPasswordArgs = {
  content: InputMaybe<ForgetPasswordContent>;
};


export type CustomerMutationGetAdminAccessTokenArgs = {
  content: AdminAccessTokenInput;
};


export type CustomerMutationGetChangePasswordAuthArgs = {
  content: InputMaybe<GetTokenByOtpContent>;
};


export type CustomerMutationGetGatewayArgs = {
  content: InputMaybe<GatewayLinkUrlContent>;
  id: InputMaybe<Scalars['ID']>;
};


export type CustomerMutationLikeBlogArticleArgs = {
  id: Scalars['ID'];
};


export type CustomerMutationOtpSendArgs = {
  content: InputMaybe<OtpSendContent>;
};


export type CustomerMutationOtpSendSignupArgs = {
  content: InputMaybe<GetTokenByOtpSingUpContent>;
};


export type CustomerMutationOtpSendV2Args = {
  content: InputMaybe<OtpSendContent>;
};


export type CustomerMutationPartialUpdateAddressArgs = {
  content: InputMaybe<AddressContent>;
  id: Scalars['ID'];
};


export type CustomerMutationPartialUpdateBasketArgs = {
  content: InputMaybe<PartialUpdateBasketContent>;
  uuid: InputMaybe<Scalars['String']>;
};


export type CustomerMutationPaymentCardArgs = {
  image: Scalars['Upload'];
  orderId: Scalars['ID'];
};


export type CustomerMutationRemoveFavoriteArgs = {
  id: Scalars['ID'];
};


export type CustomerMutationReportAvailableArgs = {
  content: InputMaybe<ReportAvailableContent>;
};


export type CustomerMutationReturnImageArgs = {
  file: Scalars['Upload'];
};


export type CustomerMutationReturnOrderArgs = {
  content: InputMaybe<ReturnOrderContent>;
};


export type CustomerMutationUpdateAddressArgs = {
  content: InputMaybe<AddressContent>;
  id: Scalars['ID'];
};


export type CustomerMutationUpdateBasketArgs = {
  content: InputMaybe<UpdateBasketContent>;
  uuid: InputMaybe<Scalars['String']>;
};


export type CustomerMutationUpdateNotificationSettingArgs = {
  content: InputMaybe<NotificationSettingContent>;
};


export type CustomerMutationUpdateOrderAddArgs = {
  content: InputMaybe<UpdateOrderAddContent>;
};


export type CustomerMutationUpdateProfileArgs = {
  content: InputMaybe<ProfileContent>;
};


export type CustomerMutationUpdateReceiveStatusArgs = {
  content: UpdateReceiveStatusContent;
  id: Scalars['ID'];
};


export type CustomerMutationUpdateThemeCustomizationArgs = {
  data: InputMaybe<Scalars['JSON']>;
  themeName: InputMaybe<Scalars['String']>;
};

export type CustomerPaymentMethod = {
  __typename?: 'CustomerPaymentMethod';
  card_number?: Maybe<Scalars['String']>;
  gateway_type?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  persian_gateway_type?: Maybe<Scalars['String']>;
};

export type CustomerQuery = {
  __typename?: 'CustomerQuery';
  getAddress: Address;
  getAddresses: Array<Maybe<Address>>;
  getAppearance: Appearance;
  getBasket: Basket;
  getBlogArticle: Article;
  getBlogArticles: Articles;
  getBlogHighlights: Highlights;
  getBreadcrumb: Breadcrumb;
  getCategories: Categories;
  getCategory: Category;
  getCollection: Collection;
  getCollections: Array<Maybe<Collection>>;
  getCollectionsWithProducts: Array<Maybe<Collection>>;
  getCollectionsWithProductsV2: Array<Maybe<CollectionV2>>;
  getFavorite: Favorite;
  getFavoriteV2: Favorite;
  getFavorites: Favorites;
  getFavoritesV2: MinifiedProducts;
  getHotOffer: Product;
  getHotOffers: HotOffers;
  getLoyaltyCredit: LoyaltyCredit;
  getLoyaltyCreditV2: LoyaltyCredit;
  getLoyaltyLogs: LoyaltyLogs;
  getNotificationSetting: NotificationSetting;
  getNotificationToken: NotificationToken;
  getOnlineStoreNotification: Array<Maybe<OnlineStoreNotification>>;
  getOrder: Order;
  getOrderAdd: Order;
  getOrderV3: UserOrder;
  getOrders: Orders;
  getOrdersV3: UserOrders;
  getPaymentMethods: Array<Maybe<CustomerPaymentMethod>>;
  getPocket: Array<Maybe<Pocket>>;
  getProduct: Product;
  getProductFeedback: ProductFeedbacks;
  getProducts: MinifiedProducts;
  getProductsOrHotoffers: MinifiedProducts;
  getProfile: Profile;
  getReceiveStatus: ReceiveStatus;
  getReturnOrders: ReturnOrders;
  getReturnedOrder: ReturnOrder;
  getShippingAddress: ShippingAddress;
  getShippingAddresses: Array<Maybe<ShippingAddress>>;
  getShippingSokect: Array<Maybe<ShippingAddress>>;
  getSitemap: Scalars['String'];
  getStoreInfo: StoreInfo;
  getSuggestionProducts: MinifiedProducts;
  getTag: Tag;
  getTags: Array<Maybe<Tag>>;
  getThemeCustomization: ThemeCustomization;
  getTransactionTypes: Array<Maybe<TransactionTypes>>;
  getUserNotify: UserNotify;
  getUserType: UserType;
  getVariantsStock: Array<Maybe<VariantsStock>>;
  isFavorite: IsFavorite;
  productFiltering: ProductFiltering;
  reportAvailable?: Maybe<Scalars['Void']>;
};


export type CustomerQueryGetAddressArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetBasketArgs = {
  uuid: InputMaybe<Scalars['String']>;
};


export type CustomerQueryGetBlogArticleArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetBlogArticlesArgs = {
  params: InputMaybe<BlogArticlesParams>;
};


export type CustomerQueryGetBlogHighlightsArgs = {
  params: InputMaybe<BlogHighlightsParams>;
};


export type CustomerQueryGetBreadcrumbArgs = {
  params: InputMaybe<BreadcrumbParams>;
};


export type CustomerQueryGetCategoriesArgs = {
  params: InputMaybe<CategoriesParams>;
};


export type CustomerQueryGetCategoryArgs = {
  id: Scalars['ID'];
  params: InputMaybe<CategoriesParams>;
};


export type CustomerQueryGetCollectionArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetFavoriteArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetFavoriteV2Args = {
  id: Scalars['ID'];
};


export type CustomerQueryGetFavoritesArgs = {
  params: InputMaybe<FavoritesParams>;
};


export type CustomerQueryGetFavoritesV2Args = {
  params: InputMaybe<FavoritesParams>;
};


export type CustomerQueryGetHotOfferArgs = {
  id: Scalars['ID'];
  params: InputMaybe<HotOffersParams>;
};


export type CustomerQueryGetHotOffersArgs = {
  params: InputMaybe<HotOffersParams>;
};


export type CustomerQueryGetLoyaltyCreditArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetLoyaltyLogsArgs = {
  params: InputMaybe<LoyaltyLogsParams>;
};


export type CustomerQueryGetOrderArgs = {
  id: Scalars['ID'];
  params: InputMaybe<OrderParams>;
};


export type CustomerQueryGetOrderV3Args = {
  id: Scalars['ID'];
};


export type CustomerQueryGetOrdersArgs = {
  params: InputMaybe<OrdersParams>;
};


export type CustomerQueryGetOrdersV3Args = {
  params: InputMaybe<OrdersParams>;
};


export type CustomerQueryGetProductArgs = {
  id: Scalars['ID'];
  params: InputMaybe<ProductsParams>;
};


export type CustomerQueryGetProductFeedbackArgs = {
  params: InputMaybe<ProductFeedbackParams>;
  product_id: Scalars['ID'];
};


export type CustomerQueryGetProductsArgs = {
  params: InputMaybe<ProductsParams>;
};


export type CustomerQueryGetProductsOrHotoffersArgs = {
  params: InputMaybe<ProductsParams>;
};


export type CustomerQueryGetReceiveStatusArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetReturnOrdersArgs = {
  params: InputMaybe<ReturnParams>;
};


export type CustomerQueryGetReturnedOrderArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetShippingAddressArgs = {
  address_id: Scalars['ID'];
  id: Scalars['ID'];
};


export type CustomerQueryGetShippingAddressesArgs = {
  address_id: Scalars['ID'];
};


export type CustomerQueryGetShippingSokectArgs = {
  address_id: Scalars['ID'];
};


export type CustomerQueryGetSuggestionProductsArgs = {
  params: InputMaybe<SuggestionProductsParams>;
  product_id: Scalars['ID'];
};


export type CustomerQueryGetTagArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryGetThemeCustomizationArgs = {
  themeName: InputMaybe<Scalars['String']>;
};


export type CustomerQueryGetUserNotifyArgs = {
  id: Scalars['ID'];
  params: InputMaybe<AllowedNotificationType>;
};


export type CustomerQueryGetVariantsStockArgs = {
  ids: Array<Scalars['ID']>;
};


export type CustomerQueryIsFavoriteArgs = {
  id: Scalars['ID'];
};


export type CustomerQueryProductFilteringArgs = {
  params: InputMaybe<ProductsParams>;
};


export type CustomerQueryReportAvailableArgs = {
  params: InputMaybe<ReportAvailableContent>;
};

export type DeleteShippingContent = {
  id: Scalars['ID'];
};

export type DigiExpressCities = {
  __typename?: 'DigiExpressCities';
  active_cities?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Earning = {
  __typename?: 'Earning';
  game_type: Scalars['Int'];
  game_type_display: Scalars['String'];
  limit: Scalars['Int'];
  value: Scalars['Int'];
};

export type Ecommerce = {
  __typename?: 'Ecommerce';
  about_returns: Scalars['String'];
  about_us: Scalars['String'];
  cover?: Maybe<Image>;
  domain: Scalars['String'];
  e_namad_img_id: Scalars['String'];
  e_namad_img_src: Scalars['String'];
  e_namad_meta_content: Scalars['String'];
  e_namad_reference_link: Scalars['String'];
  expire_date: Scalars['String'];
  is_cash_acceptable: Scalars['Boolean'];
  is_open: Scalars['Boolean'];
  last_buy?: Maybe<Scalars['String']>;
  shipping_guide: Scalars['String'];
  show_category_in_menu: Scalars['Boolean'];
  show_digify_logo: Scalars['Boolean'];
  show_last_buy: Scalars['Boolean'];
  show_product_comments: Scalars['Boolean'];
  show_special_offer: Scalars['Boolean'];
};

export type Favorite = {
  __typename?: 'Favorite';
  average_score: Scalars['Float'];
  category?: Maybe<Array<Maybe<Category>>>;
  /** @deprecated No longer supported */
  chosen_image?: Maybe<Image>;
  /** @deprecated No longer supported */
  collection_ids?: Maybe<Scalars['Void']>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Feature>>>;
  fixed_cost: Scalars['Int'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  is_service?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
  mark?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  online_package_amount: Scalars['Int'];
  store: Scalars['ID'];
  tags?: Maybe<Array<Maybe<Tag>>>;
  tax: Scalars['Boolean'];
  unit: Scalars['Int'];
  variants?: Maybe<Array<Maybe<Variant>>>;
  voter_number?: Maybe<Scalars['Int']>;
  weight: Scalars['Int'];
  width: Scalars['Int'];
};

export type Favorites = {
  __typename?: 'Favorites';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Favorite>>>;
};

export type FavoritesParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Feature = {
  __typename?: 'Feature';
  description: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type FilterPrimaries = {
  __typename?: 'FilterPrimaries';
  cities?: Maybe<Array<Maybe<Scalars['String']>>>;
  max_cost?: Maybe<Scalars['Int']>;
  min_cost?: Maybe<Scalars['Int']>;
};

export type FinancialData = {
  __typename?: 'FinancialData';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['String']>;
  main_amount?: Maybe<Scalars['Int']>;
  reference_code?: Maybe<Scalars['String']>;
  sms_cost?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  status_display?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  validity_rate?: Maybe<Scalars['Int']>;
};

export type FinancialDataParams = {
  created_at_end?: InputMaybe<Scalars['String']>;
  created_at_start?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  maximum_amount?: InputMaybe<Scalars['Int']>;
  minimum_amount?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
};

export type FinancialDatas = {
  __typename?: 'FinancialDatas';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<FinancialData>>>;
};

export type ForgetPasswordContent = {
  password: Scalars['String'];
  phone_number: Scalars['String'];
  token: Scalars['String'];
};

export type Gateway = {
  __typename?: 'Gateway';
  gateway_link?: Maybe<Scalars['String']>;
};

export type GatewayLinkUrlContent = {
  canceled_url: Scalars['String'];
  redirect_url: Scalars['String'];
};

export type GetTokenByOtpContent = {
  phone_number: Scalars['String'];
  token: Scalars['Int'];
};

export type GetTokenByOtpSingUpContent = {
  phone_number: Scalars['String'];
  set_cookie?: InputMaybe<Scalars['Boolean']>;
  token: Scalars['String'];
};

export type Guild = {
  __typename?: 'Guild';
  guild_list?: Maybe<Array<Scalars['String']>>;
};

export type HeroImage = {
  __typename?: 'HeroImage';
  id: Scalars['ID'];
  image: Scalars['String'];
  url: Scalars['String'];
  uuid?: Maybe<Scalars['String']>;
};

export type Highlight = {
  __typename?: 'Highlight';
  article: Article;
  id: Scalars['Int'];
  store: Scalars['Int'];
};

export type Highlights = {
  __typename?: 'Highlights';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results: Array<Highlight>;
};

export type HomeData = {
  __typename?: 'HomeData';
  customers_count?: Maybe<Scalars['Int']>;
  expire_date?: Maybe<Scalars['String']>;
  initial_sms_charge?: Maybe<Scalars['Int']>;
  logo?: Maybe<LogoHome>;
  name?: Maybe<Scalars['String']>;
  orders_count?: Maybe<Scalars['Int']>;
  products_count?: Maybe<Scalars['Int']>;
  recharge_date?: Maybe<Scalars['String']>;
  sms_charge?: Maybe<Scalars['Int']>;
};

export type HotOffers = {
  __typename?: 'HotOffers';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<MinifiedProduct>>>;
};

export type HotOffersParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<ProductOrderingType>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  image: Scalars['String'];
  uuid: Scalars['String'];
};

export type ImportDigikalaProductsContent = {
  seller_id?: InputMaybe<Scalars['ID']>;
  storeId?: InputMaybe<Scalars['ID']>;
};

export type IsFavorite = {
  __typename?: 'IsFavorite';
  is_favorite: Scalars['Boolean'];
};

export type ItemBrief = {
  __typename?: 'ItemBrief';
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<ItemBriefImage>;
  is_active?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  primary_cost?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['Int']>;
  unlimited_variant_count?: Maybe<Scalars['Int']>;
};

export type ItemBriefImage = {
  __typename?: 'ItemBriefImage';
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type ItemBriefs = {
  __typename?: 'ItemBriefs';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<ItemBrief>>>;
};

export type ItemMutation = {
  __typename?: 'ItemMutation';
  createCategory?: Maybe<CategoryMerchant>;
  createOption?: Maybe<Scalars['Void']>;
  createOptionValue?: Maybe<Scalars['Void']>;
  createProduct?: Maybe<ProductMerchant>;
  createVoucher?: Maybe<Scalars['Void']>;
  deleteCategory?: Maybe<Scalars['Void']>;
  deleteOption?: Maybe<Scalars['Void']>;
  deleteOptionValue?: Maybe<Scalars['Void']>;
  deleteProduct?: Maybe<Scalars['Void']>;
  deleteVoucher?: Maybe<Scalars['Void']>;
  partialUpdateCategory?: Maybe<CategoryMerchant>;
  partialUpdateOptionValue?: Maybe<Scalars['Void']>;
  partialUpdateProduct?: Maybe<Scalars['Void']>;
  partialUpdateVariant?: Maybe<Scalars['Void']>;
  partialUpdateVoucher?: Maybe<Scalars['Void']>;
  updateCategory?: Maybe<Scalars['Void']>;
  updateOption?: Maybe<Scalars['Void']>;
  updateOptionValue?: Maybe<Scalars['Void']>;
  updateProduct?: Maybe<Scalars['Void']>;
  uploadImage?: Maybe<Image>;
};


export type ItemMutationCreateCategoryArgs = {
  content: InputMaybe<CategoryContent>;
};


export type ItemMutationCreateOptionArgs = {
  content: InputMaybe<OptionContent>;
};


export type ItemMutationCreateOptionValueArgs = {
  content: InputMaybe<OptionValueContent>;
};


export type ItemMutationCreateProductArgs = {
  content: InputMaybe<ProductContent>;
};


export type ItemMutationCreateVoucherArgs = {
  content: InputMaybe<VoucherContent>;
};


export type ItemMutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type ItemMutationDeleteOptionArgs = {
  id: Scalars['ID'];
};


export type ItemMutationDeleteOptionValueArgs = {
  id: Scalars['ID'];
};


export type ItemMutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type ItemMutationDeleteVoucherArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type ItemMutationPartialUpdateCategoryArgs = {
  content: InputMaybe<CategoryContent>;
  id: Scalars['ID'];
};


export type ItemMutationPartialUpdateOptionValueArgs = {
  content: InputMaybe<OptionValueContent>;
  id: Scalars['ID'];
};


export type ItemMutationPartialUpdateProductArgs = {
  content: InputMaybe<ProductContent>;
  id: Scalars['ID'];
};


export type ItemMutationPartialUpdateVariantArgs = {
  content: InputMaybe<VariantLiteInput>;
  id: Scalars['ID'];
};


export type ItemMutationPartialUpdateVoucherArgs = {
  content: InputMaybe<VoucherContent>;
  id: InputMaybe<Scalars['ID']>;
};


export type ItemMutationUpdateCategoryArgs = {
  content: InputMaybe<CategoryContent>;
  id: Scalars['ID'];
};


export type ItemMutationUpdateOptionArgs = {
  content: InputMaybe<OptionContent>;
  id: Scalars['ID'];
};


export type ItemMutationUpdateOptionValueArgs = {
  content: InputMaybe<OptionValueContent>;
  id: Scalars['ID'];
};


export type ItemMutationUpdateProductArgs = {
  content: InputMaybe<ProductContent>;
  id: Scalars['ID'];
};


export type ItemMutationUploadImageArgs = {
  file: Scalars['Upload'];
};

export type ItemQuery = {
  __typename?: 'ItemQuery';
  getCategories?: Maybe<CategoriesLite>;
  getCategory?: Maybe<CategoryLite>;
  getItemsBrief?: Maybe<ItemBriefs>;
  getOption?: Maybe<Option>;
  getOptionValue?: Maybe<OptionValue>;
  getOptionValues?: Maybe<Array<Maybe<OptionValue>>>;
  getOptions?: Maybe<Array<Maybe<Option>>>;
  getProduct?: Maybe<ProductMerchant>;
  getProducts?: Maybe<ProductsLite>;
  getProductsFilterPrimsMerchant?: Maybe<FilterPrimariesProduct>;
  getVariant?: Maybe<VariantLite>;
  getVoucher?: Maybe<VoucherLite>;
  getVouchers?: Maybe<VouchersLite>;
};


export type ItemQueryGetCategoriesArgs = {
  params: InputMaybe<CategoriesParams>;
};


export type ItemQueryGetCategoryArgs = {
  id: Scalars['ID'];
};


export type ItemQueryGetItemsBriefArgs = {
  params: InputMaybe<ItemsBriefParams>;
};


export type ItemQueryGetOptionArgs = {
  id: Scalars['ID'];
};


export type ItemQueryGetOptionValueArgs = {
  id: Scalars['ID'];
};


export type ItemQueryGetOptionValuesArgs = {
  params: InputMaybe<OptionValueParams>;
};


export type ItemQueryGetOptionsArgs = {
  params: InputMaybe<OptionParams>;
};


export type ItemQueryGetProductArgs = {
  id: Scalars['ID'];
};


export type ItemQueryGetProductsArgs = {
  params: InputMaybe<ProductsParams>;
};


export type ItemQueryGetVariantArgs = {
  id: Scalars['ID'];
};


export type ItemQueryGetVoucherArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type ItemQueryGetVouchersArgs = {
  params: InputMaybe<VoucherParams>;
};

export type ItemsBriefParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type LatLngAddress = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
};

export type LogoHome = {
  __typename?: 'LogoHome';
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type LoyaltyCredit = {
  __typename?: 'LoyaltyCredit';
  id: Scalars['ID'];
  loyalty_credit: Scalars['Float'];
};

export type LoyaltyGift = {
  __typename?: 'LoyaltyGift';
  earning_gift: Scalars['Int'];
  items?: Maybe<Array<Maybe<LoyaltyGiftItems>>>;
};

export type LoyaltyGiftContent = {
  items: Array<LoyaltyGiftItemsContent>;
};

export type LoyaltyGiftItems = {
  __typename?: 'LoyaltyGiftItems';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  selected_variant: LoyaltyGiftItemsSelectedVariant;
};

export type LoyaltyGiftItemsContent = {
  id?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
  selected_variant: LoyaltyGiftItemsSelectedVariantContent;
};

export type LoyaltyGiftItemsSelectedVariant = {
  __typename?: 'LoyaltyGiftItemsSelectedVariant';
  id: Scalars['ID'];
};

export type LoyaltyGiftItemsSelectedVariantContent = {
  id?: InputMaybe<Scalars['ID']>;
};

export type LoyaltyLog = {
  __typename?: 'LoyaltyLog';
  account_credit: Scalars['Int'];
  amount: Scalars['Int'];
  created_at: Scalars['String'];
  data?: Maybe<LoyaltyLogData>;
  id: Scalars['ID'];
  log_type_display: Scalars['String'];
  order_cost?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
};

export type LoyaltyLogData = {
  __typename?: 'LoyaltyLogData';
  game?: Maybe<Scalars['Int']>;
};

export type LoyaltyLogs = {
  __typename?: 'LoyaltyLogs';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results: Array<LoyaltyLog>;
};

export type LoyaltyLogsParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ManagerContent = {
  address?: InputMaybe<Scalars['String']>;
  confirmed_at?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  is_seen?: InputMaybe<Scalars['Boolean']>;
  owner_card_name?: InputMaybe<Scalars['String']>;
  owner_card_number?: InputMaybe<Scalars['String']>;
  pocket?: InputMaybe<Scalars['String']>;
  prepare_deadline?: InputMaybe<Scalars['String']>;
  return_order?: InputMaybe<Scalars['Void']>;
  sent_at?: InputMaybe<Scalars['String']>;
  shipping?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tax?: InputMaybe<Scalars['Float']>;
};

export type ManagersParams = {
  cities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  city?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['String']>;
  created_at_max?: InputMaybe<Scalars['String']>;
  created_at_min?: InputMaybe<Scalars['String']>;
  days_upto_deadline?: InputMaybe<Scalars['String']>;
  is_pre_order?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  max_cost?: InputMaybe<Scalars['Float']>;
  max_shipping_time?: InputMaybe<Scalars['String']>;
  min_cost?: InputMaybe<Scalars['Float']>;
  min_shipping_time?: InputMaybe<Scalars['String']>;
  modified_at?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_type?: InputMaybe<Scalars['String']>;
  payment_types?: InputMaybe<Scalars['String']>;
  preparing_day?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  reference_code?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sent_at?: InputMaybe<Scalars['String']>;
  shipping_time?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<InputMaybe<OrderStatusEnum>>>;
  without_return?: InputMaybe<Scalars['String']>;
};

export type MerchantRegisterMutation = {
  __typename?: 'MerchantRegisterMutation';
  changePasswordRegister?: Maybe<Scalars['Void']>;
  checkSub?: Maybe<CheckSub>;
  createProfile?: Maybe<CreateProfile>;
  merchantCheckOtp?: Maybe<Scalars['Void']>;
  otpSend?: Maybe<Scalars['Void']>;
  sendSmsForgetPassword?: Maybe<SendSmsForgetPasswordType>;
  validateOtpToken?: Maybe<OtpToken>;
};


export type MerchantRegisterMutationChangePasswordRegisterArgs = {
  content: InputMaybe<ChangePasswordRegisterContent>;
};


export type MerchantRegisterMutationCheckSubArgs = {
  domain: Scalars['String'];
};


export type MerchantRegisterMutationCreateProfileArgs = {
  content: InputMaybe<CreateMerchantProfileContent>;
};


export type MerchantRegisterMutationMerchantCheckOtpArgs = {
  content: InputMaybe<CheckOtpContent>;
};


export type MerchantRegisterMutationOtpSendArgs = {
  content: InputMaybe<MerchantRegisterOtpSendContent>;
};


export type MerchantRegisterMutationSendSmsForgetPasswordArgs = {
  content: InputMaybe<SendOtpForgetPasswordContent>;
};


export type MerchantRegisterMutationValidateOtpTokenArgs = {
  content: InputMaybe<ValidateOtpTokenContent>;
};

export type MerchantRegisterOtpSendContent = {
  phone_number: Scalars['String'];
};

export type MerchantRegisterQuery = {
  __typename?: 'MerchantRegisterQuery';
  getGuild?: Maybe<Guild>;
};

export type MinVariant = {
  __typename?: 'MinVariant';
  cost?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  is_unlimited?: Maybe<Scalars['Boolean']>;
  loyalty_gift?: Maybe<Scalars['Int']>;
  max_quantity?: Maybe<Scalars['Int']>;
  primary_cost?: Maybe<Scalars['Int']>;
  profit_percent?: Maybe<Scalars['Float']>;
  single_tax?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Boolean']>;
  time_delay?: Maybe<Scalars['Int']>;
};

export type MinifiedProduct = {
  __typename?: 'MinifiedProduct';
  average_score?: Maybe<Scalars['Float']>;
  colors?: Maybe<Array<Maybe<Color>>>;
  has_stock?: Maybe<Scalars['Boolean']>;
  hot_offer_expired_date?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  images?: Maybe<Array<Maybe<Image>>>;
  label?: Maybe<Scalars['String']>;
  main_image?: Maybe<Image>;
  min_variant?: Maybe<MinVariant>;
  orderable_count?: Maybe<Scalars['Int']>;
};

export type MinifiedProducts = {
  __typename?: 'MinifiedProducts';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results: Array<MinifiedProduct>;
};

export type Mutation = {
  __typename?: 'Mutation';
  customer: CustomerMutation;
  item?: Maybe<ItemMutation>;
  merchantRegister?: Maybe<MerchantRegisterMutation>;
  notification?: Maybe<NotificationMutation>;
  order?: Maybe<OrderMutation>;
  packages?: Maybe<PackagesMutation>;
  payment?: Maybe<PaymentMutation>;
  promotion?: Maybe<PromotionMutation>;
  shipping?: Maybe<ShippingMutation>;
  store?: Maybe<StoreMutation>;
  ticket?: Maybe<TicketMutation>;
  user: UserMutation;
};

export type NeshanCityParam = {
  lat?: InputMaybe<Scalars['String']>;
  lng?: InputMaybe<Scalars['String']>;
};

export type NeshanCityResponse = {
  __typename?: 'NeshanCityResponse';
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  formatted_address?: Maybe<Scalars['String']>;
  in_odd_even_zone?: Maybe<Scalars['Boolean']>;
  in_traffic_zone?: Maybe<Scalars['Boolean']>;
  municipality_zone?: Maybe<Scalars['String']>;
  neighbourhood?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  route_name?: Maybe<Scalars['String']>;
  route_type?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  village?: Maybe<Scalars['String']>;
};

export type NotificationMutation = {
  __typename?: 'NotificationMutation';
  deleteNotif?: Maybe<Scalars['Void']>;
  getBusinessWsToken?: Maybe<OtpToken>;
  seenNotif?: Maybe<Scalars['Void']>;
};


export type NotificationMutationDeleteNotifArgs = {
  id: Array<Scalars['ID']>;
};


export type NotificationMutationSeenNotifArgs = {
  id: Array<Scalars['ID']>;
};

export type NotificationQuery = {
  __typename?: 'NotificationQuery';
  getToken?: Maybe<OtpToken>;
  getTokenPanel?: Maybe<OtpToken>;
};

export type NotificationSetting = {
  __typename?: 'NotificationSetting';
  hot_offer_available_email_notify: Scalars['Boolean'];
  hot_offer_available_internal_notify: Scalars['Boolean'];
  hot_offer_available_sms_notify: Scalars['Boolean'];
  id: Scalars['ID'];
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

export type NotificationSettingContent = {
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

export type NotificationToken = {
  __typename?: 'NotificationToken';
  token?: Maybe<Scalars['String']>;
};

export type Otp = {
  __typename?: 'OTP';
  is_forget_password?: Maybe<Scalars['Boolean']>;
  is_register?: Maybe<Scalars['Boolean']>;
};

export type OtpSendContent = {
  is_forget_password: Scalars['Boolean'];
  phone_number: Scalars['String'];
};

export type OnlineStoreNotification = {
  __typename?: 'OnlineStoreNotification';
  _id?: Maybe<Scalars['JSON']>;
  action_id?: Maybe<Scalars['ID']>;
  button?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['JSON']>;
  is_seen?: Maybe<Scalars['Boolean']>;
  notif_type?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['Int']>;
  product_id?: Maybe<OnlineStoreNotificationProductId>;
  section?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['ID']>;
};

export type OnlineStoreNotificationProductId = {
  __typename?: 'OnlineStoreNotificationProductId';
  variant__product_id?: Maybe<Scalars['ID']>;
};

export type Option = {
  __typename?: 'Option';
  id?: Maybe<Scalars['ID']>;
  is_color?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['ID']>;
  values?: Maybe<Array<Maybe<OptionValue>>>;
};

export type OptionContent = {
  is_color?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['ID']>;
  values?: InputMaybe<Array<InputMaybe<OptionContentValue>>>;
};

export type OptionContentValue = {
  value?: InputMaybe<Scalars['String']>;
};

export type OptionLite = {
  __typename?: 'OptionLite';
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_color?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type OptionParams = {
  is_active?: InputMaybe<Scalars['Boolean']>;
};

export type OptionValue = {
  __typename?: 'OptionValue';
  color_code: Scalars['String'];
  id: Scalars['ID'];
  option: OptionValueOption;
  value: Scalars['String'];
};

export type OptionValueContent = {
  color_code?: InputMaybe<Scalars['String']>;
  option?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type OptionValueLite = {
  __typename?: 'OptionValueLite';
  color_code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  option?: Maybe<OptionLite>;
  value?: Maybe<Scalars['String']>;
};

export type OptionValueOption = {
  __typename?: 'OptionValueOption';
  id: Scalars['ID'];
  is_color: Scalars['Boolean'];
  name: Scalars['String'];
  store: Scalars['ID'];
};

export type OptionValueParams = {
  is_active?: InputMaybe<Scalars['Boolean']>;
  option?: InputMaybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Address>;
  approximate_sending_date?: Maybe<ApproximateSendingDate>;
  confirmed_at?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Int']>;
  courier_info?: Maybe<CourierInfo>;
  created_at?: Maybe<Scalars['String']>;
  customer?: Maybe<Customer>;
  customer_description?: Maybe<Scalars['String']>;
  customer_shipping_cost?: Maybe<Scalars['Int']>;
  days_upto_deadline?: Maybe<Scalars['Int']>;
  deadline_date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expired_at?: Maybe<Scalars['String']>;
  fa_registration_type?: Maybe<Scalars['String']>;
  gateway_link?: Maybe<Scalars['String']>;
  gateway_type?: Maybe<Scalars['Int']>;
  gift_amount?: Maybe<Scalars['Int']>;
  has_returns?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  is_finished?: Maybe<Scalars['Boolean']>;
  is_seen?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<OrderItems>>>;
  loyalty_amount?: Maybe<Scalars['Int']>;
  manual_discount?: Maybe<Scalars['Int']>;
  modified_at?: Maybe<Scalars['String']>;
  order_description?: Maybe<Scalars['String']>;
  order_type?: Maybe<Scalars['Int']>;
  order_type_display?: Maybe<Scalars['String']>;
  order_uuid?: Maybe<Scalars['String']>;
  order_weight?: Maybe<Scalars['Int']>;
  owner_card_name?: Maybe<Scalars['String']>;
  owner_card_number?: Maybe<Scalars['String']>;
  pay_in_place?: Maybe<Scalars['Boolean']>;
  payment?: Maybe<Array<Maybe<OrderPayment>>>;
  pocket?: Maybe<Pocket>;
  pocket_cost?: Maybe<Scalars['Int']>;
  pocket_name?: Maybe<Scalars['String']>;
  post_status?: Maybe<Scalars['String']>;
  post_tracking_number?: Maybe<Scalars['String']>;
  pre_loyalty_cost?: Maybe<Scalars['Int']>;
  prepare_deadline?: Maybe<Scalars['String']>;
  preparing_days?: Maybe<Scalars['Int']>;
  previous_status?: Maybe<Scalars['Int']>;
  received_at?: Maybe<Scalars['String']>;
  receiver_last_name?: Maybe<Scalars['String']>;
  receiver_name?: Maybe<Scalars['String']>;
  receiver_number?: Maybe<Scalars['String']>;
  reference_code?: Maybe<Scalars['String']>;
  registration_type?: Maybe<Scalars['Int']>;
  return_status?: Maybe<Scalars['String']>;
  returns?: Maybe<Returns>;
  second_receiver_information?: Maybe<Scalars['Void']>;
  sent_at?: Maybe<Scalars['String']>;
  shipping?: Maybe<Shipping>;
  shipping_cost?: Maybe<Scalars['Int']>;
  shipping_name?: Maybe<Scalars['String']>;
  shipping_support_number?: Maybe<Scalars['String']>;
  shipping_time_count?: Maybe<Scalars['Int']>;
  shipping_type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  status_classification?: Maybe<Scalars['String']>;
  status_display?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Int']>;
  total_discount_cost?: Maybe<Scalars['Int']>;
  total_items_cost?: Maybe<Scalars['Int']>;
  total_primary_cost?: Maybe<Scalars['Int']>;
  total_profit?: Maybe<Scalars['Int']>;
  tracking_url?: Maybe<Scalars['String']>;
  transaction_type?: Maybe<Scalars['Int']>;
  voucher_details?: Maybe<Scalars['Void']>;
  weight?: Maybe<Scalars['Float']>;
};

export type OrderAddItemsContent = {
  unit_amount: Scalars['Int'];
  variant: Scalars['ID'];
};

export type OrderBrief = {
  __typename?: 'OrderBrief';
  cost?: Maybe<Scalars['Int']>;
  customer_first_name?: Maybe<Scalars['String']>;
  customer_last_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['Int']>;
  status_display?: Maybe<Scalars['String']>;
};

export type OrderBriefs = {
  __typename?: 'OrderBriefs';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<OrderBrief>>>;
};

export type OrderItems = {
  __typename?: 'OrderItems';
  details?: Maybe<OrderItemsDetail>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Image>>>;
  product_images?: Maybe<Array<Maybe<Image>>>;
  unit_amount?: Maybe<Scalars['Float']>;
};

export type OrderItemsDetail = {
  __typename?: 'OrderItemsDetail';
  variant?: Maybe<Variant>;
};

export type OrderMutation = {
  __typename?: 'OrderMutation';
  cancelShipping?: Maybe<Scalars['Void']>;
  chargeAloPeykWallet?: Maybe<BuyPackageResult>;
  partialUpdateManager?: Maybe<Scalars['Void']>;
  partialUpdateOrderStatus?: Maybe<Scalars['Void']>;
  partialUpdatePostexInfo?: Maybe<Scalars['Void']>;
  updateManager?: Maybe<Scalars['Void']>;
  updateManagerReceiveStatus?: Maybe<Scalars['Void']>;
  updateOrderSend?: Maybe<Scalars['JSON']>;
  updateOrderStatus?: Maybe<Scalars['Void']>;
};


export type OrderMutationCancelShippingArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type OrderMutationChargeAloPeykWalletArgs = {
  content: InputMaybe<ChargeAlopeykContent>;
};


export type OrderMutationPartialUpdateManagerArgs = {
  content: ManagerContent;
  id: Scalars['ID'];
};


export type OrderMutationPartialUpdateOrderStatusArgs = {
  content: InputMaybe<OrderStatusContent>;
  id: Scalars['ID'];
};


export type OrderMutationPartialUpdatePostexInfoArgs = {
  content: InputMaybe<PostexContent>;
};


export type OrderMutationUpdateManagerArgs = {
  content: ManagerContent;
  id: Scalars['ID'];
};


export type OrderMutationUpdateManagerReceiveStatusArgs = {
  content: ReceiveStatusContent;
  id: Scalars['ID'];
};


export type OrderMutationUpdateOrderSendArgs = {
  content: InputMaybe<OrderSendContent>;
  id: Scalars['ID'];
};


export type OrderMutationUpdateOrderStatusArgs = {
  content: InputMaybe<OrderStatusContent>;
  id: Scalars['ID'];
};

export type OrderParams = {
  statuses?: InputMaybe<AllowedStatuses>;
};

export type OrderPayment = {
  __typename?: 'OrderPayment';
  transactions?: Maybe<Array<Maybe<OrderPaymentTransactions>>>;
};

export type OrderPaymentTransactions = {
  __typename?: 'OrderPaymentTransactions';
  card_bills?: Maybe<Array<Maybe<OrderPaymentTransactionsCardBills>>>;
  card_number?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  mount?: Maybe<Scalars['Int']>;
  reference_number?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
  type_display?: Maybe<Scalars['String']>;
};

export type OrderPaymentTransactionsCardBills = {
  __typename?: 'OrderPaymentTransactionsCardBills';
  created_at?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type OrderQuery = {
  __typename?: 'OrderQuery';
  getManager?: Maybe<Order>;
  getManagers?: Maybe<Orders>;
  getManagersFilterPrimaries?: Maybe<FilterPrimaries>;
  getManagersStatusCount?: Maybe<StatusesCount>;
  getOrderSend?: Maybe<OrderSend>;
  getOrderStatus?: Maybe<OrderStatus>;
  getOrdersBrief?: Maybe<OrderBriefs>;
  getPostCartoonsInsurances?: Maybe<PostCartoonsInsurances>;
  getPostProvincesCities?: Maybe<PostProvincesCities>;
  getPostexInfo?: Maybe<PostexInfo>;
  getPostexPassword?: Maybe<Scalars['Void']>;
};


export type OrderQueryGetManagerArgs = {
  id: Scalars['ID'];
};


export type OrderQueryGetManagersArgs = {
  params: InputMaybe<ManagersParams>;
};


export type OrderQueryGetOrderSendArgs = {
  id: Scalars['ID'];
};


export type OrderQueryGetOrderStatusArgs = {
  id: Scalars['ID'];
};


export type OrderQueryGetOrdersBriefArgs = {
  params: InputMaybe<OrdersBriefParams>;
};


export type OrderQueryGetPostProvincesCitiesArgs = {
  params: InputMaybe<CitiesParams>;
};

export type OrderSend = {
  __typename?: 'OrderSend';
  address?: Maybe<Address>;
  approximate_post_cost?: Maybe<Scalars['Int']>;
  cached?: Maybe<Scalars['Boolean']>;
  customer_shipping_cost?: Maybe<Scalars['Int']>;
  has_access_to_printer?: Maybe<Scalars['Boolean']>;
  is_morning_shift?: Maybe<Scalars['Boolean']>;
  is_non_standard_package?: Maybe<Scalars['Boolean']>;
  is_sms_service_active?: Maybe<Scalars['Boolean']>;
  merchant_data?: Maybe<OrderSendMerchantData>;
  merchant_shipping_cost?: Maybe<Scalars['Int']>;
  need_cartoon?: Maybe<Scalars['Boolean']>;
  pay_at_dest?: Maybe<Scalars['Boolean']>;
  post_tracking_number?: Maybe<Scalars['String']>;
  postex_username?: Maybe<Scalars['String']>;
  receiver_first_name?: Maybe<Scalars['String']>;
  receiver_last_name?: Maybe<Scalars['String']>;
  receiver_phone_number?: Maybe<Scalars['String']>;
  shipping_time_sending?: Maybe<Scalars['Int']>;
  wallet_balance?: Maybe<Scalars['Int']>;
  /** وزن محصول */
  weight?: Maybe<Scalars['Int']>;
};

export type OrderSendMerchantData = {
  __typename?: 'OrderSendMerchantData';
  address?: Maybe<Address>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
};

export type OrderStatus = {
  __typename?: 'OrderStatus';
  owner_card_name?: Maybe<Scalars['String']>;
  owner_card_number?: Maybe<Scalars['String']>;
  preparing_days?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  status_display?: Maybe<Scalars['String']>;
};

export type OrderStatusContent = {
  cancellation_reason?: InputMaybe<Scalars['String']>;
  owner_card_name?: InputMaybe<Scalars['String']>;
  owner_card_number?: InputMaybe<Scalars['String']>;
  preparing_days?: InputMaybe<Scalars['Int']>;
  put_back_items?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['Int']>;
};

export type OrderStatusCount = {
  __typename?: 'OrderStatusCount';
  status: Scalars['Int'];
  total: Scalars['Int'];
};

export type OrderStatusEnum =
  | 'STATUS_CANCELED'
  | 'STATUS_CANCELED_BY_MERCHANT'
  | 'STATUS_CANCELED_BY_MERCHANT_SETTLED'
  | 'STATUS_CANCELED_OVER_TIME'
  | 'STATUS_CANCELED_OVER_TIME_SETTLED'
  | 'STATUS_EXPIRED'
  | 'STATUS_IN_PREPARING'
  | 'STATUS_PAID'
  | 'STATUS_PRE_ORDER_NOTIFIED'
  | 'STATUS_RECEIVED'
  | 'STATUS_SENT'
  | 'STATUS_UNPAID'
  | 'STATUS_UNRECEIVED'
  | 'STATUS_WAITING_FOR_APPROVAL'
  | 'STATUS_WAITING_FOR_PAYMENT'
  | 'STATUS_WAITING_FOR_PAYMENT_APPROVAL';

export type Orders = {
  __typename?: 'Orders';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Order>>>;
  returns_count: Scalars['Int'];
  status_count: Array<OrderStatusCount>;
};

export type OrdersParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<AllowedStatus>;
  statuses?: InputMaybe<AllowedStatuses>;
};

export type OtpToken = {
  __typename?: 'OtpToken';
  token: Scalars['String'];
};

export type PacKagesByVoucher = {
  __typename?: 'PacKagesByVoucher';
  count: Scalars['Int'];
  data: Array<Maybe<PackagePurchased>>;
  safir: Safir;
};

export type PacKagesByVouchers = {
  __typename?: 'PacKagesByVouchers';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<PacKagesByVoucher>>>;
};

export type Package = {
  __typename?: 'Package';
  cost: Scalars['Int'];
  duration: Scalars['Int'];
  features?: Maybe<Scalars['Void']>;
  id: Scalars['ID'];
  is_active: Scalars['Boolean'];
  name: Scalars['String'];
  package_type: Scalars['Int'];
  package_type_display: Scalars['String'];
  primary_cost?: Maybe<Scalars['Int']>;
  renew_voucher?: Maybe<Scalars['Boolean']>;
  renew_voucher_amount?: Maybe<Scalars['Int']>;
  renew_voucher_type?: Maybe<Scalars['Int']>;
  show_cost?: Maybe<Scalars['Int']>;
  states: Scalars['Int'];
};

export type PackageDetail = {
  __typename?: 'PackageDetail';
  author?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  package_type?: Maybe<Scalars['Int']>;
  states?: Maybe<Scalars['Int']>;
};

export type PackagePurchased = {
  __typename?: 'PackagePurchased';
  cost: Scalars['Int'];
  id: Scalars['Int'];
  is_activated: Scalars['Boolean'];
  is_reserved: Scalars['Boolean'];
  package: Package;
  renew: Scalars['Boolean'];
  status: Scalars['Int'];
  store: Scalars['Int'];
  type: Scalars['Int'];
};

export type PackagePurchaseds = {
  __typename?: 'PackagePurchaseds';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<PackagePurchased>>>;
};

export type PackageSerialized = {
  __typename?: 'PackageSerialized';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type PackageVoucher = {
  __typename?: 'PackageVoucher';
  discount?: Maybe<Scalars['Int']>;
};

export type Packages = {
  __typename?: 'Packages';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Package>>>;
};

export type PackagesBySafir = {
  __typename?: 'PackagesBySafir';
  count: Scalars['Int'];
  data: Array<Maybe<PackagePurchased>>;
};

export type PackagesBySafirs = {
  __typename?: 'PackagesBySafirs';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<PackagesBySafir>>>;
};

export type PackagesBySafirsParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  voucher__safir__code: Scalars['String'];
};

export type PackagesByVoucherParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  voucher__code: Scalars['String'];
};

export type PackagesMutation = {
  __typename?: 'PackagesMutation';
  buyPackage?: Maybe<BuyPackageResult>;
  chargeSms?: Maybe<BuyPackageResult>;
  checkPackageVoucher?: Maybe<PackageVoucher>;
  createPackage?: Maybe<Scalars['Void']>;
  createPurchasedPackage?: Maybe<Scalars['Void']>;
  createSafir?: Maybe<Scalars['Void']>;
  createVoucher?: Maybe<Scalars['Void']>;
  deletePackage?: Maybe<Scalars['Void']>;
  deletePurchasedPackage?: Maybe<Scalars['Void']>;
  deleteSafir?: Maybe<Scalars['Void']>;
  deleteVoucher?: Maybe<Scalars['Void']>;
  partialUpdatePackage?: Maybe<Scalars['Void']>;
  partialUpdatePurchasedPackage?: Maybe<Scalars['Void']>;
  partialUpdateSafir?: Maybe<Scalars['Void']>;
  partialUpdateVoucher?: Maybe<VoucherPackage>;
  updatePackage?: Maybe<Scalars['Void']>;
  updatePurchasedPackage?: Maybe<Scalars['Void']>;
  updateSafir?: Maybe<Scalars['Void']>;
  updateVoucher?: Maybe<Scalars['Void']>;
};


export type PackagesMutationBuyPackageArgs = {
  content: InputMaybe<BuyPackageParams>;
};


export type PackagesMutationChargeSmsArgs = {
  content: InputMaybe<ChargeSmsParams>;
};


export type PackagesMutationCheckPackageVoucherArgs = {
  params: InputMaybe<PackageVoucherParams>;
};


export type PackagesMutationCreatePackageArgs = {
  content: InputMaybe<CreatePackageContent>;
};


export type PackagesMutationCreatePurchasedPackageArgs = {
  content: InputMaybe<CreatePurchasedPackageContent>;
};


export type PackagesMutationCreateSafirArgs = {
  content: InputMaybe<CreateSafirContent>;
};


export type PackagesMutationCreateVoucherArgs = {
  content: InputMaybe<CreateVoucherContent>;
};


export type PackagesMutationDeletePackageArgs = {
  id: Scalars['ID'];
};


export type PackagesMutationDeletePurchasedPackageArgs = {
  id: Scalars['ID'];
};


export type PackagesMutationDeleteSafirArgs = {
  id: Scalars['ID'];
};


export type PackagesMutationDeleteVoucherArgs = {
  id: Scalars['ID'];
};


export type PackagesMutationPartialUpdatePackageArgs = {
  content: InputMaybe<CreatePackageContent>;
  id: Scalars['ID'];
};


export type PackagesMutationPartialUpdatePurchasedPackageArgs = {
  content: InputMaybe<CreatePurchasedPackageContent>;
  id: Scalars['ID'];
};


export type PackagesMutationPartialUpdateSafirArgs = {
  content: InputMaybe<CreateSafirContent>;
  id: Scalars['ID'];
};


export type PackagesMutationPartialUpdateVoucherArgs = {
  content: InputMaybe<CreateVoucherContent>;
  id: Scalars['ID'];
};


export type PackagesMutationUpdatePackageArgs = {
  content: InputMaybe<CreatePackageContent>;
  id: Scalars['ID'];
};


export type PackagesMutationUpdatePurchasedPackageArgs = {
  content: InputMaybe<CreatePurchasedPackageContent>;
  id: Scalars['ID'];
};


export type PackagesMutationUpdateSafirArgs = {
  content: InputMaybe<CreateSafirContent>;
  id: Scalars['ID'];
};


export type PackagesMutationUpdateVoucherArgs = {
  content: InputMaybe<CreateVoucherContent>;
  id: Scalars['ID'];
};

export type PackagesParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PackagesQuery = {
  __typename?: 'PackagesQuery';
  getCurrentPackage?: Maybe<CurrentPackage>;
  getFinancialData?: Maybe<FinancialDatas>;
  getPackage?: Maybe<Package>;
  getPackages?: Maybe<Packages>;
  getPackagesBySafirs?: Maybe<PackagesBySafirs>;
  getPackagesByVoucher?: Maybe<PacKagesByVouchers>;
  getPurchasePackages?: Maybe<PurchasePackages>;
  getPurchasedPackage?: Maybe<PackagePurchased>;
  getPurchasedPackages?: Maybe<PackagePurchaseds>;
  getReservedPackages?: Maybe<ReservedPackages>;
  getSafir?: Maybe<Safir>;
  getSafirs?: Maybe<Safirs>;
  getVoucher?: Maybe<Voucher>;
  getVouchers?: Maybe<Vouchers>;
  getVouchersOfSafirs?: Maybe<VouchersBySafirs>;
};


export type PackagesQueryGetFinancialDataArgs = {
  params: InputMaybe<FinancialDataParams>;
};


export type PackagesQueryGetPackageArgs = {
  id: Scalars['ID'];
};


export type PackagesQueryGetPackagesArgs = {
  params: InputMaybe<PackagesParams>;
};


export type PackagesQueryGetPackagesBySafirsArgs = {
  params: InputMaybe<PackagesBySafirsParams>;
};


export type PackagesQueryGetPackagesByVoucherArgs = {
  params: InputMaybe<PackagesByVoucherParams>;
};


export type PackagesQueryGetPurchasePackagesArgs = {
  params: InputMaybe<PurchasePackagesParams>;
};


export type PackagesQueryGetPurchasedPackageArgs = {
  id: Scalars['ID'];
};


export type PackagesQueryGetPurchasedPackagesArgs = {
  params: InputMaybe<PurchasedPackagesInput>;
};


export type PackagesQueryGetReservedPackagesArgs = {
  params: InputMaybe<ReservedPackagesParams>;
};


export type PackagesQueryGetSafirsArgs = {
  params: InputMaybe<PackagesParams>;
};


export type PackagesQueryGetVoucherArgs = {
  id: Scalars['ID'];
};


export type PackagesQueryGetVouchersArgs = {
  params: InputMaybe<VouchersParams>;
};


export type PackagesQueryGetVouchersOfSafirsArgs = {
  params: InputMaybe<VouchersParams>;
};

export type PartialUpdateBasketContent = {
  basket_items?: InputMaybe<Array<InputMaybe<BasketItemContent>>>;
  id?: InputMaybe<Scalars['ID']>;
  store?: InputMaybe<Scalars['ID']>;
};

export type PatchSmsDataInput = {
  customer_sms_send?: InputMaybe<Scalars['Boolean']>;
  report_sms_send?: InputMaybe<Scalars['Boolean']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Int']>;
  belongs_to?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['Int']>;
  discount_amount?: Maybe<Scalars['Int']>;
  due_at?: Maybe<Scalars['String']>;
  expired_at?: Maybe<Scalars['String']>;
  fulfilled_at?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  invoice_id?: Maybe<Scalars['String']>;
  main_amount?: Maybe<Scalars['Int']>;
  payable_id?: Maybe<Scalars['Int']>;
  payable_type?: Maybe<Scalars['Int']>;
  payment_type?: Maybe<Scalars['Int']>;
  reference_code?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  store?: Maybe<Scalars['ID']>;
  tax_amount?: Maybe<Scalars['Int']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  address?: Maybe<Scalars['String']>;
  behpardakht_password?: Maybe<Scalars['String']>;
  behpardakht_terminalId?: Maybe<Scalars['String']>;
  behpardakht_username?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  cancel_duration_for_approve_order?: Maybe<Scalars['Int']>;
  card_number?: Maybe<Scalars['String']>;
  card_to_card_customer_payment_duration?: Maybe<Scalars['Int']>;
  card_to_card_working_in_holidays?: Maybe<Scalars['Boolean']>;
  city?: Maybe<Scalars['String']>;
  client_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  gateway_type?: Maybe<Scalars['Int']>;
  gateway_type_display?: Maybe<Scalars['String']>;
  have_access?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_basic_info_confirmed?: Maybe<Scalars['String']>;
  is_confirmed?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  is_gateway_confirmed?: Maybe<Scalars['String']>;
  is_identity_info_confirmed?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  national_code?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  secret_key?: Maybe<Scalars['String']>;
  sheba_number?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['Int']>;
  telephone_number?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type PaymentMethodDetailParams = {
  id: Scalars['ID'];
};

export type PaymentMutation = {
  __typename?: 'PaymentMutation';
  chooseExTerminalZarrinpal?: Maybe<PaymentMethod>;
  createBehPardakht?: Maybe<PaymentMethod>;
  createNewPaymentMethod?: Maybe<PaymentMethod>;
  createZarrinPal?: Maybe<Scalars['Void']>;
  deletePaymentMethod?: Maybe<Scalars['Void']>;
  editCardToCard?: Maybe<PaymentMethod>;
  editPaymentMethod?: Maybe<PaymentMethod>;
  editPaymentMethodPut?: Maybe<PaymentMethod>;
  submitZarrinPalCreation?: Maybe<Scalars['Void']>;
  uploadZarrinPalDocument?: Maybe<Scalars['Void']>;
  verifyZarrinPalOTP?: Maybe<Scalars['Void']>;
};


export type PaymentMutationChooseExTerminalZarrinpalArgs = {
  content: InputMaybe<ChooseZarrinPalTerminalContent>;
};


export type PaymentMutationCreateBehPardakhtArgs = {
  content: InputMaybe<CreateBehPardakhtContent>;
};


export type PaymentMutationCreateNewPaymentMethodArgs = {
  content: InputMaybe<CreatePaymentMethodContent>;
};


export type PaymentMutationCreateZarrinPalArgs = {
  content: InputMaybe<CreateZarrinPalContent>;
};


export type PaymentMutationDeletePaymentMethodArgs = {
  id: Scalars['ID'];
};


export type PaymentMutationEditCardToCardArgs = {
  content: InputMaybe<CreatePaymentMethodContent>;
  id: Scalars['ID'];
};


export type PaymentMutationEditPaymentMethodArgs = {
  content: InputMaybe<CreatePaymentMethodContent>;
  id: Scalars['ID'];
};


export type PaymentMutationEditPaymentMethodPutArgs = {
  content: InputMaybe<CreatePaymentMethodContent>;
  id: Scalars['ID'];
};


export type PaymentMutationUploadZarrinPalDocumentArgs = {
  files: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
};


export type PaymentMutationVerifyZarrinPalOtpArgs = {
  content: InputMaybe<CheckZarrinPalOtpContent>;
};

export type PaymentQuery = {
  __typename?: 'PaymentQuery';
  getPaymentMethod?: Maybe<PaymentMethod>;
  getPaymentMethods?: Maybe<Array<Maybe<PaymentMethod>>>;
  getZarrinPalStatus?: Maybe<ZarrinPalStatus>;
};


export type PaymentQueryGetPaymentMethodArgs = {
  id: InputMaybe<Scalars['ID']>;
};

export type Pocket = {
  __typename?: 'Pocket';
  cost?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['ID']>;
};

export type PostCartoonsInsurances = {
  __typename?: 'PostCartoonsInsurances';
  cartoons?: Maybe<Array<Maybe<Scalars['String']>>>;
  insurances?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PostProvincesCities = {
  __typename?: 'PostProvincesCities';
  cities?: Maybe<Scalars['JSON']>;
  provinces?: Maybe<Array<Maybe<PostProvincesCitiesProvince>>>;
};

export type PostProvincesCitiesProvince = {
  __typename?: 'PostProvincesCitiesProvince';
  name?: Maybe<Scalars['String']>;
};

export type PostexContent = {
  first_name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  password_state?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type PostexInfo = {
  __typename?: 'PostexInfo';
  first_name?: Maybe<Scalars['String']>;
  password_state?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  average_score: Scalars['Float'];
  category: Category;
  chosen_image?: Maybe<Image>;
  /** @deprecated No longer supported */
  collection_ids?: Maybe<Scalars['Void']>;
  cost: Cost;
  cost_avg: Scalars['Int'];
  cost_max: Scalars['Int'];
  cost_min: Scalars['Int'];
  description: Scalars['String'];
  features: Array<Feature>;
  feedback_count: Scalars['Int'];
  fixed_cost: Scalars['Int'];
  has_loyalty_gift: Scalars['Boolean'];
  has_stock: Scalars['Boolean'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  image: Image;
  images: Array<Image>;
  is_active: Scalars['Boolean'];
  is_favorite: Scalars['Boolean'];
  is_service: Scalars['Boolean'];
  label: Scalars['String'];
  length?: Maybe<Scalars['Int']>;
  mark?: Maybe<Scalars['String']>;
  /** @deprecated No longer supported */
  modifiers?: Maybe<Scalars['Void']>;
  name: Scalars['String'];
  offline_visible: Scalars['Boolean'];
  online_package_amount: Scalars['Int'];
  online_visible: Scalars['Boolean'];
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
  product_stock: Scalars['Int'];
  profit_percent: Scalars['Float'];
  slug?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['ID']>;
  tags: Array<Tag>;
  tax: Scalars['Boolean'];
  type?: Maybe<Scalars['String']>;
  type_display?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['Int']>;
  variants: Array<Variant>;
  voter_number: Scalars['Int'];
  weight?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type ProductContent = {
  bonus_value?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['Int']>;
  change_log?: InputMaybe<Scalars['String']>;
  chosen_image?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Array<InputMaybe<ProductContentFeatures>>>;
  fixed_cost?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  is_service?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  length?: InputMaybe<Scalars['Int']>;
  mark?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  offline_visible?: InputMaybe<Scalars['Boolean']>;
  online_package_amount?: InputMaybe<Scalars['Int']>;
  online_visible?: InputMaybe<Scalars['Boolean']>;
  seo_tags?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  store?: InputMaybe<Scalars['ID']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  tax?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['Int']>;
  variants?: InputMaybe<Array<InputMaybe<ProductContentVariant>>>;
  weight?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type ProductContentFeatures = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProductContentImage = {
  id?: InputMaybe<Scalars['ID']>;
  uuid: Scalars['String'];
};

export type ProductContentVariant = {
  cost?: InputMaybe<Scalars['Int']>;
  cost_expired_at?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  imageItems?: InputMaybe<Array<InputMaybe<ProductContentImage>>>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  is_return?: InputMaybe<Scalars['Boolean']>;
  is_unlimited?: InputMaybe<Scalars['Boolean']>;
  max_quantity?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  option_values?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  primary_cost?: InputMaybe<Scalars['Int']>;
  stock?: InputMaybe<Scalars['Int']>;
  stock_alert?: InputMaybe<Scalars['Int']>;
  time_delay?: InputMaybe<Scalars['Int']>;
  vendor?: InputMaybe<Scalars['Int']>;
};

export type ProductFeedback = {
  __typename?: 'ProductFeedback';
  created_at: Scalars['String'];
  description: Scalars['String'];
  first_name: Scalars['String'];
  images: Array<Image>;
  last_name: Scalars['String'];
  reply: Scalars['String'];
  score: Scalars['Int'];
  variant: Variant;
};

export type ProductFeedbackParams = {
  images_only?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ProductFeedbacks = {
  __typename?: 'ProductFeedbacks';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results: Array<ProductFeedback>;
};

export type ProductFiltering = {
  __typename?: 'ProductFiltering';
  available_maximum_cost: Scalars['Int'];
  categories: Array<Maybe<Array<Maybe<Scalars['String']>>>>;
  colors: Array<Array<Scalars['String']>>;
  custom_categories: Array<Category>;
  has_discount: Array<Maybe<Scalars['Boolean']>>;
  has_stock: Array<Maybe<Scalars['Boolean']>>;
  marks: Array<Maybe<Array<Maybe<Scalars['String']>>>>;
  maximum_cost: Scalars['Int'];
  minimum_cost: Scalars['Int'];
  options: Array<ProductFilteringOptions>;
};

export type ProductFilteringData = {
  __typename?: 'ProductFilteringData';
  max_cost?: Maybe<Scalars['Int']>;
  max_primary_cost?: Maybe<Scalars['Int']>;
  max_stock?: Maybe<Scalars['Int']>;
  min_cost?: Maybe<Scalars['Int']>;
  min_primary_cost?: Maybe<Scalars['Int']>;
  min_stock?: Maybe<Scalars['Int']>;
};

export type ProductFilteringOptions = {
  __typename?: 'ProductFilteringOptions';
  name: Scalars['String'];
  option_values: Array<Array<Scalars['String']>>;
};

export type ProductFilteringParams = {
  categories?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  colors?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  has_discount?: InputMaybe<Scalars['Boolean']>;
  has_stock?: InputMaybe<Scalars['Boolean']>;
  marks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  maximum_cost?: InputMaybe<Scalars['Int']>;
  minimum_cost?: InputMaybe<Scalars['Int']>;
  option_values?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['ID']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProductMerchant = {
  __typename?: 'ProductMerchant';
  average_score?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['JSON']>;
  chosen_image?: Maybe<Image>;
  /** @deprecated No longer supported */
  collection_ids?: Maybe<Scalars['Void']>;
  cost?: Maybe<Cost>;
  cost_avg?: Maybe<Scalars['Int']>;
  cost_max?: Maybe<Scalars['Int']>;
  cost_min?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Feature>>>;
  feedback_count?: Maybe<Scalars['Int']>;
  fixed_cost?: Maybe<Scalars['Int']>;
  has_loyalty_gift?: Maybe<Scalars['Boolean']>;
  has_stock?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  images?: Maybe<Array<Maybe<Image>>>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_favorite?: Maybe<Scalars['Boolean']>;
  is_service?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Int']>;
  mark?: Maybe<Scalars['String']>;
  /** @deprecated No longer supported */
  modifiers?: Maybe<Scalars['Void']>;
  name?: Maybe<Scalars['String']>;
  offline_visible?: Maybe<Scalars['Boolean']>;
  online_package_amount?: Maybe<Scalars['Int']>;
  online_visible?: Maybe<Scalars['Boolean']>;
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
  product_stock?: Maybe<Scalars['Int']>;
  profit_percent?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['ID']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  tax?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  type_display?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['Int']>;
  variants?: Maybe<Array<Maybe<Variant>>>;
  voter_number?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type ProductOrderingType =
  | 'COST_MAX'
  | 'COST_MIN'
  | 'LEAST_SALE'
  | 'MOST_DISCOUNT'
  | 'MOST_SALE'
  | 'NEWEST'
  | 'OLDEST';

export type ProductSerialized = {
  __typename?: 'ProductSerialized';
  average_score: Scalars['Float'];
  category?: Maybe<Category>;
  chosen_image?: Maybe<Image>;
  description?: Maybe<Scalars['String']>;
  fixed_cost?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  images_serialized?: Maybe<Array<Maybe<Image>>>;
  is_service?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  name: Scalars['String'];
  online_package_amount: Scalars['Int'];
  store?: Maybe<Scalars['ID']>;
  unit?: Maybe<Unit>;
};

export type ProductsLite = {
  __typename?: 'ProductsLite';
  count: Scalars['Int'];
  filtering_data?: Maybe<ProductFilteringData>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<ProductMerchant>>>;
};

export type ProductsParams = {
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

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Array<Maybe<Address>>>;
  birthday?: Maybe<Scalars['String']>;
  card_number?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  gender_display?: Maybe<Scalars['String']>;
  granted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  last_name?: Maybe<Scalars['String']>;
  marriage_date?: Maybe<Scalars['String']>;
  national_code?: Maybe<Scalars['String']>;
  phone_number: Scalars['String'];
  sheba_number?: Maybe<Scalars['String']>;
  telephone_number?: Maybe<Scalars['String']>;
};

export type ProfileContent = {
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

export type PromotionMutation = {
  __typename?: 'PromotionMutation';
  voucherCheck?: Maybe<Voucher>;
};


export type PromotionMutationVoucherCheckArgs = {
  content: VoucherCheckContent;
};

export type Province = {
  __typename?: 'Province';
  name?: Maybe<Scalars['String']>;
};

export type ProvincesCities = {
  __typename?: 'ProvincesCities';
  cities?: Maybe<Scalars['JSON']>;
  provinces?: Maybe<Array<Maybe<Province>>>;
};

export type ProvincesCitiesParam = {
  type?: InputMaybe<Scalars['Int']>;
};

export type PurchasePackages = {
  __typename?: 'PurchasePackages';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<PurchasePackagesResult>>>;
};

export type PurchasePackagesParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PurchasePackagesResult = {
  __typename?: 'PurchasePackagesResult';
  cost?: Maybe<Scalars['Int']>;
  end_date_time?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_reserved?: Maybe<Scalars['Boolean']>;
  package?: Maybe<Package>;
  payment?: Maybe<Array<Maybe<Payment>>>;
  renew?: Maybe<Scalars['Boolean']>;
  start_date_time?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  store?: Maybe<StoreInfo>;
  type?: Maybe<Scalars['Int']>;
  voucher?: Maybe<Voucher>;
};

export type Query = {
  __typename?: 'Query';
  customer: CustomerQuery;
  item?: Maybe<ItemQuery>;
  merchantRegister?: Maybe<MerchantRegisterQuery>;
  notification?: Maybe<NotificationQuery>;
  order?: Maybe<OrderQuery>;
  packages?: Maybe<PackagesQuery>;
  payment?: Maybe<PaymentQuery>;
  shipping?: Maybe<ShippingQuery>;
  store?: Maybe<StoreQuery>;
  ticket?: Maybe<TicketQuery>;
  user: UserQuery;
};

export type ReceiveStatus = {
  __typename?: 'ReceiveStatus';
  status: Scalars['Int'];
  status_display: Scalars['String'];
};

export type ReceiveStatusContent = {
  status: Scalars['String'];
};

export type RefreshTokenContent = {
  refresh: Scalars['String'];
};

export type ReportAvailableContent = {
  email: Scalars['String'];
  phone_number: Scalars['String'];
  product: Scalars['Int'];
};

export type ReservedPackage = {
  __typename?: 'ReservedPackage';
  cost?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['String']>;
  end_date_time?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_reserved?: Maybe<Scalars['Boolean']>;
  package?: Maybe<CurrentPackageD>;
  payment?: Maybe<Array<Maybe<Payment>>>;
  renew?: Maybe<Scalars['Boolean']>;
  renew_voucher_amount?: Maybe<Scalars['Int']>;
  start_date_time?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

export type ReservedPackages = {
  __typename?: 'ReservedPackages';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<ReservedPackage>>>;
};

export type ReservedPackagesParams = {
  is_reserved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  store?: InputMaybe<Scalars['ID']>;
};

export type ReturnItem = {
  __typename?: 'ReturnItem';
  count: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Image>;
  order_item: ReturnOrderItem;
  reason: Scalars['String'];
  relative_voucher_amount: Scalars['Int'];
  reply_description: Scalars['String'];
  reply_reason: Scalars['String'];
  returned_cost: Scalars['Int'];
  status: Scalars['Int'];
  status_display: Scalars['String'];
};

export type ReturnItemsContent = {
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_item?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
};

export type ReturnOrder = {
  __typename?: 'ReturnOrder';
  card_number: Scalars['String'];
  created_at: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  items: Array<ReturnItem>;
  last_name: Scalars['String'];
  order_created_at: Scalars['String'];
  order_reference_code: Scalars['String'];
  phone_number: Scalars['String'];
  reference_code: Scalars['String'];
  status: Scalars['Int'];
  status_display: Scalars['String'];
  total_returned_cost: Scalars['Int'];
};

export type ReturnOrderContent = {
  card_number?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<InputMaybe<ReturnItemsContent>>>;
  last_name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  phone_number?: InputMaybe<Scalars['String']>;
};

export type ReturnOrderItem = {
  __typename?: 'ReturnOrderItem';
  details?: Maybe<OrderItemsDetail>;
  id?: Maybe<Scalars['ID']>;
  product_label?: Maybe<Scalars['String']>;
  single_cost?: Maybe<Scalars['Int']>;
  single_primary_cost?: Maybe<Scalars['Int']>;
  single_profit?: Maybe<Scalars['Int']>;
  single_tax?: Maybe<Scalars['Int']>;
};

export type ReturnOrders = {
  __typename?: 'ReturnOrders';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<ReturnOrder>>>;
};

export type ReturnParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Returns = {
  __typename?: 'Returns';
  card_number?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<ReturnsItems>>>;
  last_name?: Maybe<Scalars['String']>;
  order_created_at?: Maybe<Scalars['String']>;
  order_reference_code?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  reference_code?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  status_display?: Maybe<Scalars['String']>;
  total_returned_cost?: Maybe<Scalars['Int']>;
};

export type ReturnsId = {
  __typename?: 'ReturnsID';
  created_at?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  reference_code?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type ReturnsItems = {
  __typename?: 'ReturnsItems';
  count?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Image>>>;
  order_item?: Maybe<ReturnsOrderItem>;
  reason?: Maybe<Scalars['String']>;
  relative_voucher_amount?: Maybe<Scalars['Int']>;
  reply_description?: Maybe<Scalars['String']>;
  reply_reason?: Maybe<Scalars['String']>;
  returned_cost?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  status_display?: Maybe<Scalars['String']>;
};

export type ReturnsOrderItem = {
  __typename?: 'ReturnsOrderItem';
  details?: Maybe<OrderItemsDetail>;
  id?: Maybe<Scalars['ID']>;
  product_label?: Maybe<Scalars['String']>;
  single_cost?: Maybe<Scalars['Int']>;
  single_primary_cost?: Maybe<Scalars['Int']>;
  single_profit?: Maybe<Scalars['Int']>;
  single_tax?: Maybe<Scalars['Int']>;
};

export type Safir = {
  __typename?: 'Safir';
  bound?: Maybe<Scalars['Int']>;
  code: Scalars['String'];
  email: Scalars['String'];
  expire_date: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  is_active: Scalars['Boolean'];
  last_name: Scalars['String'];
  phone_number?: Maybe<Scalars['String']>;
};

export type Safirs = {
  __typename?: 'Safirs';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Safir>>>;
};

export type SeeTicketInput = {
  status?: InputMaybe<Scalars['Int']>;
};

export type SendOtpForgetPasswordContent = {
  is_forget_password?: InputMaybe<Scalars['Boolean']>;
  phone_number?: InputMaybe<Scalars['String']>;
};

export type SendSmsForgetPasswordType = {
  __typename?: 'SendSmsForgetPasswordType';
  is_forget_password?: Maybe<Scalars['Boolean']>;
};

export type Shipping = {
  __typename?: 'Shipping';
  cost: Scalars['Int'];
  name: Scalars['String'];
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  approximate_sending_date?: Maybe<ShippingAddressApproximateSendingDate>;
  cost: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  shipping_delay: Scalars['Int'];
  shipping_type: Scalars['Int'];
  shipping_type_display?: Maybe<Scalars['String']>;
  time_sending: Scalars['Int'];
};

export type ShippingAddressApproximateSendingDate = {
  __typename?: 'ShippingAddressApproximateSendingDate';
  end: Scalars['String'];
  start: Scalars['String'];
};

export type ShippingDetailParam = {
  id: Scalars['ID'];
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  address?: Maybe<Address>;
  chips_values?: Maybe<Array<Maybe<Scalars['String']>>>;
  cost?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_national_post_active?: Maybe<Scalars['Boolean']>;
  my_province_is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  other_provinces_cost?: Maybe<Scalars['Int']>;
  other_provinces_is_active?: Maybe<Scalars['Boolean']>;
  other_provinces_time_sending?: Maybe<Scalars['Int']>;
  pay_at_dest?: Maybe<Scalars['Boolean']>;
  postex_username?: Maybe<Scalars['String']>;
  shipping_type?: Maybe<Scalars['Int']>;
  shipping_type_display?: Maybe<Scalars['String']>;
  time_sending?: Maybe<Scalars['Int']>;
  title_values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ShippingMethods = {
  __typename?: 'ShippingMethods';
  count?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<ShippingMethod>>>;
  status_count?: Maybe<Array<Maybe<StatusCount>>>;
};

export type ShippingMethodsParam = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ShippingMutation = {
  __typename?: 'ShippingMutation';
  createNewShipping?: Maybe<CreateShippingResponse>;
  deleteShipping?: Maybe<Scalars['Void']>;
  editShipping?: Maybe<CreateShippingResponse>;
};


export type ShippingMutationCreateNewShippingArgs = {
  content: InputMaybe<CreateShippingContent>;
};


export type ShippingMutationDeleteShippingArgs = {
  content: InputMaybe<DeleteShippingContent>;
};


export type ShippingMutationEditShippingArgs = {
  content: InputMaybe<CreateShippingContent>;
  id: Scalars['ID'];
};

export type ShippingQuery = {
  __typename?: 'ShippingQuery';
  getDigiExpressActiveCities?: Maybe<DigiExpressCities>;
  getNeshanCity?: Maybe<NeshanCityResponse>;
  getProvincesCities?: Maybe<ProvincesCities>;
  getShippingMethodDetail?: Maybe<ShippingMethod>;
  getShippingMethods?: Maybe<ShippingMethods>;
  sendPostexSms?: Maybe<Scalars['JSON']>;
};


export type ShippingQueryGetNeshanCityArgs = {
  param: InputMaybe<NeshanCityParam>;
};


export type ShippingQueryGetProvincesCitiesArgs = {
  param: InputMaybe<ProvincesCitiesParam>;
};


export type ShippingQueryGetShippingMethodDetailArgs = {
  param: InputMaybe<ShippingDetailParam>;
};


export type ShippingQueryGetShippingMethodsArgs = {
  param: InputMaybe<ShippingMethodsParam>;
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook: Scalars['String'];
  instagram: Scalars['String'];
  linkedin: Scalars['String'];
  telegram: Scalars['String'];
  twitter: Scalars['String'];
  whatsapp: Scalars['String'];
};

export type StatisticsParams = {
  end_date?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['String']>;
};

export type StatusCount = {
  __typename?: 'StatusCount';
  shipping_type?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type StatusesCount = {
  __typename?: 'StatusesCount';
  all?: Maybe<Scalars['Int']>;
  returns_count?: Maybe<Scalars['Int']>;
  status_count?: Maybe<Array<Maybe<StatusCount>>>;
};

export type Store = {
  __typename?: 'Store';
  brand_guild?: Maybe<Scalars['String']>;
  brand_identifier_code?: Maybe<Scalars['String']>;
  brand_manager_first_name?: Maybe<Scalars['String']>;
  brand_manager_last_name?: Maybe<Scalars['String']>;
  brand_manager_phone_number?: Maybe<Scalars['String']>;
  brand_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  ecommerce_expire_date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  products_count?: Maybe<Scalars['Int']>;
};

export type StoreAddress = {
  __typename?: 'StoreAddress';
  address: Scalars['String'];
  city: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  no?: Maybe<Scalars['Int']>;
  postal_code?: Maybe<Scalars['String']>;
  province: Scalars['String'];
  unit_number?: Maybe<Scalars['Int']>;
};

export type StoreAddresss = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
};

export type StoreDetail = {
  __typename?: 'StoreDetail';
  brand_guild?: Maybe<Scalars['String']>;
  brand_identifier_code?: Maybe<Scalars['String']>;
  brand_manager_first_name?: Maybe<Scalars['String']>;
  brand_manager_last_name?: Maybe<Scalars['String']>;
  brand_manager_phone_number?: Maybe<Scalars['String']>;
  brand_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  customers_count?: Maybe<Scalars['Int']>;
  domain?: Maybe<Scalars['String']>;
  e_namad?: Maybe<Scalars['Boolean']>;
  ecommerce_expire_date?: Maybe<Scalars['String']>;
  gateways_info?: Maybe<Array<Maybe<StoreGateway>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orders_count?: Maybe<Scalars['Int']>;
  package_state?: Maybe<Scalars['Int']>;
  products_count?: Maybe<Scalars['Int']>;
  ray_chat_enabled?: Maybe<Scalars['Boolean']>;
  shippings?: Maybe<Array<Maybe<StoreShipping>>>;
  torob_is_active?: Maybe<Scalars['Boolean']>;
  variants_count?: Maybe<Scalars['Int']>;
};

export type StoreGateway = {
  __typename?: 'StoreGateway';
  gateway_type?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
};

export type StoreInfo = {
  __typename?: 'StoreInfo';
  brand: Scalars['Int'];
  earning: Earning;
  ecommerce: Ecommerce;
  email: Scalars['String'];
  end_time_work?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  google_analytics_token: Scalars['String'];
  guild: Scalars['String'];
  hotjar_token: Scalars['String'];
  id: Scalars['ID'];
  info: Scalars['String'];
  is_earning_loyalty_active: Scalars['Boolean'];
  last_name: Scalars['String'];
  logo?: Maybe<Image>;
  name: Scalars['String'];
  personel: Scalars['Int'];
  phone_number: Scalars['String'];
  rating_score: Scalars['Float'];
  ray_chat_enabled: Scalars['Boolean'];
  ray_chat_token: Scalars['String'];
  social_media?: Maybe<SocialMedia>;
  start_time_work?: Maybe<Scalars['String']>;
  store_address: StoreAddress;
  tax: Scalars['Boolean'];
  telephone_number: Scalars['String'];
};

export type StoreMutation = {
  __typename?: 'StoreMutation';
  activateTorob?: Maybe<Scalars['Void']>;
  adminChargeWallet?: Maybe<Scalars['Void']>;
  chargeWallet?: Maybe<BuyPackageResult>;
  editStoreData?: Maybe<Scalars['Void']>;
  importDigikalaProducts?: Maybe<Scalars['Void']>;
  patchSmsData?: Maybe<StoreSmsData>;
  updateCustomDomain?: Maybe<Scalars['Void']>;
  updateStoreServiceDetail?: Maybe<Scalars['Void']>;
};


export type StoreMutationActivateTorobArgs = {
  content: InputMaybe<ActivateTorobContent>;
};


export type StoreMutationAdminChargeWalletArgs = {
  content: InputMaybe<AdminChargeWalletContent>;
};


export type StoreMutationChargeWalletArgs = {
  content: InputMaybe<ChargeWalletInput>;
};


export type StoreMutationEditStoreDataArgs = {
  content: InputMaybe<StoreFields>;
};


export type StoreMutationImportDigikalaProductsArgs = {
  content: InputMaybe<ImportDigikalaProductsContent>;
};


export type StoreMutationPatchSmsDataArgs = {
  content: InputMaybe<PatchSmsDataInput>;
};


export type StoreMutationUpdateCustomDomainArgs = {
  content: InputMaybe<CustomDomainContent>;
};


export type StoreMutationUpdateStoreServiceDetailArgs = {
  content: StoreServiceDetailContent;
  storeId: Scalars['ID'];
};

export type StoreQuery = {
  __typename?: 'StoreQuery';
  exportStoresExcel?: Maybe<Scalars['Void']>;
  getBrands?: Maybe<Brands>;
  getHomeData?: Maybe<HomeData>;
  getSmsData?: Maybe<StoreSmsData>;
  getStatistics?: Maybe<Scalars['JSON']>;
  getStoreDetail?: Maybe<StoreDetail>;
  getStorePassword?: Maybe<Scalars['Void']>;
  getStoreServiceDetail?: Maybe<StoreServiceDetail>;
  getStores?: Maybe<Stores>;
  getWalletData?: Maybe<WalletData>;
};


export type StoreQueryExportStoresExcelArgs = {
  params: InputMaybe<StoresParams>;
};


export type StoreQueryGetBrandsArgs = {
  params: InputMaybe<BrandsParams>;
};


export type StoreQueryGetStatisticsArgs = {
  params: InputMaybe<StatisticsParams>;
};


export type StoreQueryGetStoreDetailArgs = {
  storeId: Scalars['ID'];
};


export type StoreQueryGetStorePasswordArgs = {
  phoneNumber: InputMaybe<Scalars['String']>;
};


export type StoreQueryGetStoreServiceDetailArgs = {
  storeId: Scalars['ID'];
};


export type StoreQueryGetStoresArgs = {
  params: InputMaybe<StoresParams>;
};

export type StoreServiceDetail = {
  __typename?: 'StoreServiceDetail';
  brand_name?: Maybe<Scalars['String']>;
  gateway_type?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  idpay_api_key?: Maybe<Scalars['String']>;
  idpay_settlement_api_key?: Maybe<Scalars['String']>;
  idpay_wallet_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type StoreServiceDetailContent = {
  gateway_type?: InputMaybe<Scalars['Int']>;
  idpay_api_key: Scalars['String'];
  idpay_settlement_api_key: Scalars['String'];
  idpay_wallet_id: Scalars['String'];
};

export type StoreShipping = {
  __typename?: 'StoreShipping';
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  shipping_type?: Maybe<Scalars['Int']>;
};

export type StoreSmsData = {
  __typename?: 'StoreSmsData';
  customer_sms_send?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  initial_sms_count?: Maybe<Scalars['Int']>;
  report_sms_send?: Maybe<Scalars['Boolean']>;
  sms_charge?: Maybe<Scalars['Int']>;
  sms_cost?: Maybe<Scalars['Int']>;
  sms_count?: Maybe<Scalars['Int']>;
};

export type Stores = {
  __typename?: 'Stores';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Store>>>;
};

export type StoresParams = {
  created_at_max?: InputMaybe<Scalars['String']>;
  created_at_min?: InputMaybe<Scalars['String']>;
  expire_date_max?: InputMaybe<Scalars['String']>;
  expire_date_min?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  package_state?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type SuggestionProductsParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  store?: Maybe<Scalars['ID']>;
};

export type ThemeCustomization = {
  __typename?: 'ThemeCustomization';
  created_at?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  ecommerce?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  modified_at?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['ID']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  answer?: Maybe<Scalars['String']>;
  answered_by?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  id: Scalars['ID'];
  issued_by: Scalars['Int'];
  modified_at: Scalars['String'];
  question: Scalars['String'];
  solved_at?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  status_display: Scalars['String'];
  store: Scalars['ID'];
  title: Scalars['String'];
};

export type TicketContent = {
  question: Scalars['String'];
  title: Scalars['String'];
};

export type TicketMutation = {
  __typename?: 'TicketMutation';
  createTicket?: Maybe<Ticket>;
  deleteTicket?: Maybe<Scalars['Void']>;
  partialUpdateTicket?: Maybe<Ticket>;
  seeTicket?: Maybe<Ticket>;
  updateTicket?: Maybe<Ticket>;
};


export type TicketMutationCreateTicketArgs = {
  content: InputMaybe<TicketContent>;
};


export type TicketMutationDeleteTicketArgs = {
  id: Scalars['ID'];
};


export type TicketMutationPartialUpdateTicketArgs = {
  content: InputMaybe<TicketContent>;
  id: Scalars['ID'];
};


export type TicketMutationSeeTicketArgs = {
  content: InputMaybe<SeeTicketInput>;
  id: Scalars['ID'];
};


export type TicketMutationUpdateTicketArgs = {
  content: InputMaybe<TicketContent>;
  id: Scalars['ID'];
};

export type TicketQuery = {
  __typename?: 'TicketQuery';
  getAdminTickets?: Maybe<AdminTicket>;
  getTicket?: Maybe<Ticket>;
  getTickets?: Maybe<Array<Maybe<Ticket>>>;
};


export type TicketQueryGetAdminTicketsArgs = {
  params: InputMaybe<AdminTicketsParams>;
};


export type TicketQueryGetTicketArgs = {
  id: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  access: Scalars['String'];
  refresh: Scalars['String'];
};

export type TokenContent = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TransactionTypes = {
  __typename?: 'TransactionTypes';
  card_number?: Maybe<Scalars['String']>;
  gateway_type?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  persian_gateway_type?: Maybe<Scalars['String']>;
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  precision?: Maybe<Scalars['Int']>;
  store: Scalars['ID'];
  unit_type?: Maybe<Scalars['Int']>;
  unit_type_display?: Maybe<Scalars['String']>;
};

export type UpdateBasketContent = {
  basket_items?: InputMaybe<Array<InputMaybe<BasketItemContent>>>;
  id?: InputMaybe<Scalars['ID']>;
  store?: InputMaybe<Scalars['ID']>;
};

export type UpdateOrderAddContent = {
  address: Scalars['Int'];
  canceled_url?: InputMaybe<Scalars['String']>;
  customer_description?: InputMaybe<Scalars['String']>;
  expired_at?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<InputMaybe<OrderAddItemsContent>>>;
  loyalty?: InputMaybe<Scalars['Int']>;
  manual_discount?: InputMaybe<Scalars['Int']>;
  pay_in_place?: InputMaybe<Scalars['Boolean']>;
  pocket?: InputMaybe<Scalars['String']>;
  receiver_name?: InputMaybe<Scalars['String']>;
  receiver_number?: InputMaybe<Scalars['String']>;
  redirect_url?: InputMaybe<Scalars['String']>;
  shipping: Scalars['Int'];
  status: Scalars['Int'];
  total_discount_cost?: InputMaybe<Scalars['Int']>;
  voucher_code?: InputMaybe<Scalars['String']>;
};

export type UpdateReceiveStatusContent = {
  status: AllowedReceiveStatuses;
};

export type UserCheck = {
  __typename?: 'UserCheck';
  result: Scalars['Boolean'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  last_name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  clearCookie?: Maybe<Scalars['Void']>;
  getCookie?: Maybe<Token>;
  getRefreshToken?: Maybe<AccessToken>;
  getToken?: Maybe<Token>;
};


export type UserMutationGetCookieArgs = {
  content: TokenContent;
};


export type UserMutationGetRefreshTokenArgs = {
  content: RefreshTokenContent;
};


export type UserMutationGetTokenArgs = {
  content: TokenContent;
};

export type UserNotify = {
  __typename?: 'UserNotify';
  email?: Maybe<Scalars['String']>;
  email_notify?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  internal_notify?: Maybe<Scalars['Boolean']>;
  notification_type?: Maybe<Scalars['Int']>;
  product?: Maybe<UserNotifyProduct>;
  sms_notify?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Scalars['ID']>;
};

export type UserNotifyContent = {
  email?: InputMaybe<Scalars['String']>;
  email_notify: Scalars['Boolean'];
  internal_notify: Scalars['Boolean'];
  notification_type: AllowedNotificationType;
  product: Scalars['ID'];
  sms_notify: Scalars['Boolean'];
};

export type UserNotifyProduct = {
  __typename?: 'UserNotifyProduct';
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
};

export type UserOrder = {
  __typename?: 'UserOrder';
  address: Address;
  approximate_sending_date?: Maybe<ApproximateSendingDate>;
  can_return_request: Scalars['Boolean'];
  cancellation_reason?: Maybe<Scalars['String']>;
  cost: Scalars['Int'];
  created_at: Scalars['String'];
  customer_shipping_cost: Scalars['Int'];
  expired_at: Scalars['String'];
  id: Scalars['ID'];
  is_finished: Scalars['Boolean'];
  items: Array<UserOrderItems>;
  loyalty_amount: Scalars['Int'];
  order_description: Scalars['String'];
  owner_card_name: Scalars['String'];
  owner_card_number: Scalars['String'];
  pocket?: Maybe<Pocket>;
  pocket_cost: Scalars['Int'];
  post_tracking_number: Scalars['String'];
  previous_status?: Maybe<Scalars['Int']>;
  received_at?: Maybe<Scalars['String']>;
  received_by_customer: Scalars['Boolean'];
  receiver_last_name: Scalars['String'];
  receiver_name: Scalars['String'];
  receiver_number: Scalars['String'];
  reference_code: Scalars['String'];
  registration_type: Scalars['Int'];
  returns?: Maybe<ReturnsId>;
  shipping: Shipping;
  shipping_time_count?: Maybe<Scalars['Int']>;
  status: Scalars['Int'];
  tax: Scalars['Int'];
  total_discount_cost: Scalars['Int'];
  total_items_cost: Scalars['Int'];
};

export type UserOrderItems = {
  __typename?: 'UserOrderItems';
  details: UserOrderItemsDetail;
  id: Scalars['ID'];
  single_cost: Scalars['Int'];
  unit_amount: Scalars['Int'];
  variant_image?: Maybe<Image>;
};

export type UserOrderItemsDetail = {
  __typename?: 'UserOrderItemsDetail';
  variant: UserOrderItemsDetailVariant;
};

export type UserOrderItemsDetailVariant = {
  __typename?: 'UserOrderItemsDetailVariant';
  cost: Scalars['Int'];
  cost_expired_at?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  is_return?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  online_cost?: Maybe<Scalars['Int']>;
  online_primary_cost?: Maybe<Scalars['Int']>;
  option_values?: Maybe<Array<Maybe<OptionValue>>>;
  primary_cost?: Maybe<Scalars['Int']>;
  product_serialized?: Maybe<ProductSerialized>;
  time_delay?: Maybe<Scalars['Int']>;
};

export type UserOrders = {
  __typename?: 'UserOrders';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results: Array<UserOrder>;
  returns_count?: Maybe<Scalars['Int']>;
  status_count?: Maybe<Array<Maybe<OrderStatusCount>>>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  getUserInfo?: Maybe<UserInfo>;
  getUserRead?: Maybe<UserRead>;
  userCheck?: Maybe<UserCheck>;
};


export type UserQueryUserCheckArgs = {
  phoneNumber: Scalars['String'];
};

export type UserRead = {
  __typename?: 'UserRead';
  has_active_purchase_package?: Maybe<Scalars['Boolean']>;
  has_trial?: Maybe<Scalars['Boolean']>;
  is_brand_manager?: Maybe<Scalars['Boolean']>;
  is_store_manager?: Maybe<Scalars['Boolean']>;
  is_superuser?: Maybe<Scalars['Boolean']>;
  my_brand?: Maybe<UserReadMyBrand>;
  my_store?: Maybe<Array<Maybe<UserReadMyStore>>>;
  open_packages?: Maybe<Array<Maybe<UserReadOpenPackages>>>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
  role?: Maybe<Scalars['Int']>;
  role_display?: Maybe<Scalars['Void']>;
  sms_cost?: Maybe<Scalars['Int']>;
  sms_credit?: Maybe<Scalars['Int']>;
};

export type UserReadMyBrand = {
  __typename?: 'UserReadMyBrand';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type UserReadMyStore = {
  __typename?: 'UserReadMyStore';
  address?: Maybe<Scalars['String']>;
  agent_phone_number?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  bonus_percent?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  crisp_token_id?: Maybe<Scalars['String']>;
  ecommerce?: Maybe<UserReadMyStoreEcommerce>;
  email?: Maybe<Scalars['String']>;
  end_time_work?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  info?: Maybe<Scalars['String']>;
  is_loyalty_enabled?: Maybe<Scalars['Boolean']>;
  is_new_bonus?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  logo?: Maybe<Image>;
  loyalty?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  national_code?: Maybe<Scalars['String']>;
  personel?: Maybe<Scalars['Int']>;
  personel_display?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  pos?: Maybe<UserReadMyStorePos>;
  postal_code?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  purchase_package?: Maybe<Array<Maybe<Scalars['ID']>>>;
  ray_chat_enabled?: Maybe<Scalars['Boolean']>;
  ray_chat_token?: Maybe<Scalars['String']>;
  sheba_number?: Maybe<Scalars['String']>;
  social_media?: Maybe<Scalars['Void']>;
  start_time_work?: Maybe<Scalars['String']>;
  store_address?: Maybe<StoreAddress>;
  tax?: Maybe<Scalars['Boolean']>;
  telephone_number?: Maybe<Scalars['String']>;
};

export type UserReadMyStoreEcommerce = {
  __typename?: 'UserReadMyStoreEcommerce';
  cover?: Maybe<Image>;
  domain?: Maybe<Scalars['String']>;
  expire_date?: Maybe<Scalars['String']>;
  full_sub_domain_path?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_cash_acceptable?: Maybe<Scalars['Boolean']>;
  is_domain_confirmed?: Maybe<Scalars['Boolean']>;
  is_open?: Maybe<Scalars['Boolean']>;
};

export type UserReadMyStorePos = {
  __typename?: 'UserReadMyStorePos';
  end_time_work?: Maybe<Scalars['String']>;
  expire_date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  money_unit?: Maybe<Scalars['String']>;
  money_unit_display?: Maybe<Scalars['String']>;
  start_time_work?: Maybe<Scalars['String']>;
};

export type UserReadOpenPackages = {
  __typename?: 'UserReadOpenPackages';
  assigned?: Maybe<Scalars['Boolean']>;
  cost_paid?: Maybe<Scalars['Int']>;
  end_date_time?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  package?: Maybe<UserReadOpenPackagesPackage>;
  start_date_time?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  /** @deprecated No longer supported */
  store?: Maybe<Scalars['Void']>;
  type?: Maybe<Scalars['Int']>;
};

export type UserReadOpenPackagesPackage = {
  __typename?: 'UserReadOpenPackagesPackage';
  cost?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  /** @deprecated No longer supported */
  features?: Maybe<Scalars['Void']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  package_type?: Maybe<Scalars['Int']>;
  package_type_display?: Maybe<Scalars['String']>;
  states?: Maybe<Scalars['Int']>;
};

export type UserType = {
  __typename?: 'UserType';
  type?: Maybe<Scalars['String']>;
};

export type ValidateOtpTokenContent = {
  otp_token: Scalars['String'];
  phone_number: Scalars['String'];
};

export type Variant = {
  __typename?: 'Variant';
  barcode?: Maybe<Scalars['Int']>;
  cost: Scalars['Int'];
  cost_expired_at?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Image>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_return: Scalars['Boolean'];
  is_unlimited: Scalars['Boolean'];
  loyalty_gift: Scalars['Int'];
  margin_cost?: Maybe<Scalars['Int']>;
  max_quantity: Scalars['Int'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  online_cost: Scalars['Int'];
  online_primary_cost: Scalars['Int'];
  option_values?: Maybe<Array<OptionValue>>;
  orderable_count: Scalars['Int'];
  primary_cost: Scalars['Int'];
  product_serialized?: Maybe<ProductSerialized>;
  /** @deprecated No longer supported */
  sku?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  stock: Scalars['String'];
  time_delay: Scalars['Int'];
  vendor?: Maybe<Scalars['String']>;
};

export type VariantLite = {
  __typename?: 'VariantLite';
  barcode?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Int']>;
  cost_expired_at?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Image>>>;
  is_active?: Maybe<Scalars['Boolean']>;
  is_return?: Maybe<Scalars['Boolean']>;
  is_unlimited?: Maybe<Scalars['Boolean']>;
  margin_cost?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  option_values?: Maybe<Array<Maybe<OptionValueLite>>>;
  primary_cost?: Maybe<Scalars['Int']>;
  product?: Maybe<Scalars['ID']>;
  sku?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['Int']>;
  time_delay?: Maybe<Scalars['Int']>;
  vendor?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type VariantLiteInput = {
  barcode?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Int']>;
  cost_expired_at?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  is_return?: InputMaybe<Scalars['Boolean']>;
  is_unlimited?: InputMaybe<Scalars['Boolean']>;
  margin_cost?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  option_values?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  primary_cost?: InputMaybe<Scalars['Int']>;
  product?: InputMaybe<Scalars['ID']>;
  sku?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
  stock?: InputMaybe<Scalars['Int']>;
  time_delay?: InputMaybe<Scalars['Int']>;
  vendor?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Int']>;
};

export type VariantsStock = {
  __typename?: 'VariantsStock';
  id: Scalars['ID'];
  is_unlimited: Scalars['Boolean'];
  orderable_count: Scalars['Int'];
  stock: Scalars['Int'];
};

export type Voucher = {
  __typename?: 'Voucher';
  amount?: Maybe<Scalars['Int']>;
  bound?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expire_date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_active?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  safir?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  voucher_method?: Maybe<Scalars['Int']>;
  voucher_type?: Maybe<Scalars['Int']>;
  voucher_type_display?: Maybe<Scalars['String']>;
};

export type VoucherCheckContent = {
  amount?: InputMaybe<Scalars['Int']>;
  code: Scalars['String'];
  expire_date?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['String']>;
  voucher_type?: InputMaybe<Scalars['String']>;
};

export type VoucherContent = {
  amount?: InputMaybe<Scalars['String']>;
  customers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  expire_date?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['Int']>;
  voucher_type?: InputMaybe<Scalars['Int']>;
};

export type VoucherLite = {
  __typename?: 'VoucherLite';
  amount?: Maybe<Scalars['Int']>;
  can_use?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  customer_type?: Maybe<Scalars['String']>;
  customer_type_display?: Maybe<Scalars['String']>;
  customers?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  expire_date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['Int']>;
  usage_peak?: Maybe<Scalars['Int']>;
  voucher_type?: Maybe<Scalars['Int']>;
  voucher_type_display?: Maybe<Scalars['String']>;
};

export type VoucherPackage = {
  __typename?: 'VoucherPackage';
  amount: Scalars['Int'];
  bound: Scalars['Int'];
  code: Scalars['String'];
  deadline?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expire_date: Scalars['String'];
  id: Scalars['ID'];
  is_active?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  package?: Maybe<Array<Maybe<PackageSerialized>>>;
  safir?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['String']>;
  voucher_method?: Maybe<Scalars['Int']>;
  voucher_type: Scalars['Int'];
};

export type Vouchers = {
  __typename?: 'Vouchers';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<VoucherPackage>>>;
};

export type VouchersLite = {
  __typename?: 'VouchersLite';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<VoucherLite>>>;
};

export type VouchersParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  safir?: InputMaybe<Scalars['Int']>;
};

export type WalletData = {
  __typename?: 'WalletData';
  amount?: Maybe<Scalars['Int']>;
};

export type ZarrinPalStatus = {
  __typename?: 'ZarrinPalStatus';
  active_terminals?: Maybe<Array<Maybe<ZarrinPalTerminal>>>;
  is_basic_info_confirmed?: Maybe<Scalars['String']>;
  is_gateway_confirmed?: Maybe<Scalars['String']>;
  is_identity_info_confirmed?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
};

export type ZarrinPalTerminal = {
  __typename?: 'ZarrinPalTerminal';
  domain?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type BlogArticlesParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type BlogHighlightsParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type CategoryProduct = {
  __typename?: 'categoryProduct';
  cost?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Image>>>;
  label?: Maybe<Scalars['String']>;
};

export type ChangePasswordContent = {
  current_password: Scalars['String'];
  password: Scalars['String'];
};

export type ChildCategoryLite = {
  __typename?: 'childCategoryLite';
  discount?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<CategoryProduct>>>;
  store?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type CitiesParams = {
  post_type?: InputMaybe<Scalars['Int']>;
};

export type FilterPrimariesProduct = {
  __typename?: 'filterPrimariesProduct';
  categories?: Maybe<Array<Maybe<CategoryMerchant>>>;
  max_cost?: Maybe<Scalars['Int']>;
  max_primary_cost?: Maybe<Scalars['Int']>;
  max_stock?: Maybe<Scalars['Int']>;
  min_cost?: Maybe<Scalars['Int']>;
  min_primary_cost?: Maybe<Scalars['Int']>;
  min_stock?: Maybe<Scalars['Int']>;
};

export type OrderSendContent = {
  address?: InputMaybe<AddressInput>;
  cartoon_size?: InputMaybe<Scalars['String']>;
  cashed?: InputMaybe<Scalars['Boolean']>;
  has_access_to_printer?: InputMaybe<Scalars['Boolean']>;
  insurance_name?: InputMaybe<Scalars['String']>;
  is_morning_shift?: InputMaybe<Scalars['Boolean']>;
  is_non_standard_package?: InputMaybe<Scalars['Boolean']>;
  is_sms_service_active?: InputMaybe<Scalars['Boolean']>;
  merchant_shipping_cost?: InputMaybe<Scalars['Int']>;
  need_cartoon?: InputMaybe<Scalars['Boolean']>;
  pay_at_dest?: InputMaybe<Scalars['Boolean']>;
  pickup_date?: InputMaybe<Scalars['String']>;
  receiver_first_name?: InputMaybe<Scalars['String']>;
  receiver_last_name?: InputMaybe<Scalars['String']>;
  receiver_phone_number?: InputMaybe<Scalars['String']>;
  transport_type?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['Int']>;
};

export type OrdersBriefParams = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PackageVoucherParams = {
  code?: InputMaybe<Scalars['String']>;
  package?: InputMaybe<Scalars['ID']>;
};

export type PurchasedPackagesInput = {
  is_activated?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  package?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
  store?: InputMaybe<Scalars['Int']>;
};

export type StoreFields = {
  birthday?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  guild?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  national_code?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  sheba_number?: InputMaybe<Scalars['String']>;
  store_address?: InputMaybe<StoreAddresss>;
  telephone_number?: InputMaybe<Scalars['String']>;
};

export type VoucherParams = {
  expire_date__date__lte?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  start_date__date__gte?: InputMaybe<Scalars['String']>;
  voucher_type?: InputMaybe<Scalars['Int']>;
};

export type VouchersBySafir = {
  __typename?: 'vouchersBySafir';
  amount?: Maybe<Scalars['Int']>;
  bound?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expire_date?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  is_active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  package?: Maybe<Array<Maybe<PackageSerialized>>>;
  safir: Scalars['ID'];
  safir_code?: Maybe<Scalars['String']>;
  safir_first_name?: Maybe<Scalars['String']>;
  safir_last_name?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  voucher_method?: Maybe<Scalars['Int']>;
  voucher_type?: Maybe<Scalars['Int']>;
};

export type VouchersBySafirs = {
  __typename?: 'vouchersBySafirs';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<VouchersBySafir>>>;
};

export type GetCookieMutationVariables = Exact<{
  content: TokenContent;
}>;


export type GetCookieMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', getCookie?: { __typename?: 'Token', access: string, refresh: string } | null } };

export type GetTokenMutationVariables = Exact<{
  content: TokenContent;
}>;


export type GetTokenMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', getToken?: { __typename?: 'Token', access: string, refresh: string } | null } };

export type GetRefreshTokenMutationVariables = Exact<{
  content: RefreshTokenContent;
}>;


export type GetRefreshTokenMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', getRefreshToken?: { __typename?: 'AccessToken', access: string } | null } };

export type CreateProfileMutationVariables = Exact<{
  content: InputMaybe<ProfileContent>;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', createProfile: { __typename?: 'Profile', first_name?: string | null, last_name?: string | null } } };

export type OtpSendMutationVariables = Exact<{
  content: InputMaybe<OtpSendContent>;
}>;


export type OtpSendMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', otpSend?: any | null } };

export type OtpSendV2MutationVariables = Exact<{
  content: InputMaybe<OtpSendContent>;
}>;


export type OtpSendV2Mutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', otpSendV2: { __typename?: 'OTP', is_forget_password?: boolean | null, is_register?: boolean | null } } };

export type OtpSendSignupMutationVariables = Exact<{
  content: InputMaybe<GetTokenByOtpSingUpContent>;
}>;


export type OtpSendSignupMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', otpSendSignup: { __typename?: 'Token', refresh: string, access: string } } };

export type GetChangePasswordAuthMutationVariables = Exact<{
  content: InputMaybe<GetTokenByOtpContent>;
}>;


export type GetChangePasswordAuthMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', getChangePasswordAuth: { __typename?: 'Auth', auth: string } } };

export type ForgetPasswordMutationVariables = Exact<{
  content: InputMaybe<ForgetPasswordContent>;
}>;


export type ForgetPasswordMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', forgetPassword?: any | null } };

export type ChangePasswordWithoutOtpMutationVariables = Exact<{
  content: InputMaybe<ChangePasswordWithoutOtpContent>;
}>;


export type ChangePasswordWithoutOtpMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', changePasswordWithoutOtp?: any | null } };

export type UpdateNotificationSettingMutationVariables = Exact<{
  content: InputMaybe<NotificationSettingContent>;
}>;


export type UpdateNotificationSettingMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', updateNotificationSetting: { __typename?: 'NotificationSetting', hot_offer_available_email_notify: boolean, id: string, product_available_sms_notify: boolean, product_available_email_notify: boolean, product_available_internal_notify: boolean, hot_offer_available_sms_notify: boolean, hot_offer_available_internal_notify: boolean, receive_order_sms_notify: boolean, receive_order_email_notify: boolean, receive_order_internal_notify: boolean, order_invoice_sms_notify: boolean, order_invoice_email_notify: boolean, order_invoice_internal_notify: boolean, return_invoice_sms_notify: boolean, return_invoice_email_notify: boolean, return_invoice_internal_notify: boolean, survey_sms_notify: boolean, survey_email_notify: boolean, survey_internal_notify: boolean } } };

export type UpdateProfileMutationVariables = Exact<{
  content: InputMaybe<ProfileContent>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', updateProfile: { __typename?: 'Profile', id: string, phone_number: string, national_code?: string | null, telephone_number?: string | null, sheba_number?: string | null, card_number?: string | null, birthday?: string | null, gender?: number | null, marriage_date?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null, gender_display?: string | null } } };

export type PaymentCardMutationVariables = Exact<{
  orderId: Scalars['ID'];
  image: Scalars['Upload'];
}>;


export type PaymentCardMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', paymentCard?: any | null } };

export type UpdateBasketMutationVariables = Exact<{
  uuid: InputMaybe<Scalars['String']>;
  content: InputMaybe<UpdateBasketContent>;
}>;


export type UpdateBasketMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', updateBasket: { __typename?: 'Basket', id: string, temp_id?: string | null, basket_items: Array<{ __typename?: 'BasketItem', product_id: string, amount?: number | null, cost?: number | null, cost_change?: number | null, discount_amount?: number | null, has_loyalty?: boolean | null, id: string, is_unlimited?: boolean | null, loyalty_gift?: number | null, max_quantity?: number | null, online_cost?: number | null, online_primary_cost?: number | null, primary_cost?: number | null, product_label?: string | null, stock?: string | null, orderable_count?: number | null, variant_name?: string | null, variant_id?: string | null, tax?: boolean | null, single_tax?: number | null, bonus_value?: number | null, image?: { __typename?: 'Image', id: string, image: string } | null, option_values?: Array<{ __typename?: 'OptionValue', id: string, value: string, color_code: string, option: { __typename?: 'OptionValueOption', id: string, name: string, is_color: boolean } } | null> | null }> } } };

export type VoucherCheckMutationVariables = Exact<{
  content: VoucherCheckContent;
}>;


export type VoucherCheckMutation = { __typename?: 'Mutation', customer?: { __typename?: 'PromotionMutation', voucherCheck?: { __typename?: 'Voucher', amount?: number | null, code?: string | null, expire_date?: string | null, id?: string | null, limit?: number | null, start_date?: string | null, voucher_type?: number | null, voucher_type_display?: string | null } | null } | null };

export type RemoveFavoriteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', removeFavorite?: any | null } };

export type AddFavoriteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', addFavorite?: any | null } };

export type CreateOrderMutationVariables = Exact<{
  content: InputMaybe<CreateOrderContent>;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', createOrder: { __typename?: 'Order', id?: string | null, gateway_link?: string | null, transaction_type?: number | null, registration_type?: number | null } } };

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', deleteAddress?: any | null } };

export type CreateAddressMutationVariables = Exact<{
  content: InputMaybe<AddressContent>;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', createAddress: { __typename?: 'Address', city?: string | null, province?: string | null, address: string, no?: number | null, postal_code?: string | null, id: string, unit_number?: number | null, description?: string | null, receiver_name?: string | null, receiver_lastname?: string | null, receiver_number?: string | null, name?: string | null, longitude?: string | null, latitude?: string | null } } };

export type PartialUpdateAddressMutationVariables = Exact<{
  id: Scalars['ID'];
  content: InputMaybe<AddressContent>;
}>;


export type PartialUpdateAddressMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', partialUpdateAddress: { __typename?: 'Address', city?: string | null, province?: string | null, address: string, no?: number | null, postal_code?: string | null, id: string, unit_number?: number | null, description?: string | null, receiver_name?: string | null, receiver_lastname?: string | null, receiver_number?: string | null, name?: string | null, longitude?: string | null, latitude?: string | null } } };

export type GetGatewayMutationVariables = Exact<{
  id: InputMaybe<Scalars['ID']>;
  content: GatewayLinkUrlContent;
}>;


export type GetGatewayMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', getGateway: { __typename?: 'Gateway', gateway_link?: string | null } } };

export type ClearCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCookieMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutation', clearCookie?: any | null } };

export type CancelOrderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', cancelOrder?: any | null } };

export type UpdateReceiveStatusMutationVariables = Exact<{
  orderId: Scalars['ID'];
  content: UpdateReceiveStatusContent;
}>;


export type UpdateReceiveStatusMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', updateReceiveStatus?: any | null } };

export type ReturnOrderMutationVariables = Exact<{
  content: InputMaybe<ReturnOrderContent>;
}>;


export type ReturnOrderMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', returnOrder: { __typename?: 'ReturnOrder', id: string, status: number, reference_code: string, order_reference_code: string, created_at: string, status_display: string, order_created_at: string, first_name: string, last_name: string, phone_number: string, card_number: string, total_returned_cost: number, items: Array<{ __typename?: 'ReturnItem', id: string, status_display: string, reason: string, returned_cost: number, count: number, description: string, reply_reason: string, reply_description: string, relative_voucher_amount: number }> } } };

export type UpdateThemeCustomizationMutationVariables = Exact<{
  themeName: InputMaybe<Scalars['String']>;
  data: InputMaybe<Scalars['JSON']>;
}>;


export type UpdateThemeCustomizationMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', updateThemeCustomization: { __typename?: 'ThemeCustomization', id?: string | null, data?: any | null } } };

export type CreateThemeCustomizationMutationVariables = Exact<{
  themeName: InputMaybe<Scalars['String']>;
  data: InputMaybe<Scalars['JSON']>;
}>;


export type CreateThemeCustomizationMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', createThemeCustomization: { __typename?: 'ThemeCustomization', id?: string | null, data?: any | null } } };

export type CreateStoreOpeningNotifierMutationVariables = Exact<{
  content: InputMaybe<CreateStoreOpeningNotifierContent>;
}>;


export type CreateStoreOpeningNotifierMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', createStoreOpeningNotifier?: any | null } };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', item?: { __typename?: 'ItemMutation', uploadImage?: { __typename?: 'Image', id: string, uuid: string, image: string } | null } | null };

export type LikeBlogArticleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeBlogArticleMutation = { __typename?: 'Mutation', customer: { __typename?: 'CustomerMutation', likeBlogArticle: { __typename?: 'Highlight', article: { __typename?: 'Article', id: number, title: string, content: string, published_at: string, view_count: number, image: string, is_active: boolean, is_liked: boolean, like_count: number, is_highlight: boolean, slug: string, tags: Array<{ __typename?: 'ArticleTag', id: number, title: string }>, category: Array<{ __typename?: 'ArticleCategory', id: number, title: string, parent?: number | null }> } } } };

export type GetAppearanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppearanceQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getAppearance: { __typename?: 'Appearance', id: string, theme?: { __typename?: 'AppearanceTheme', id: string, name: number, is_luxury: boolean, product_card_type_display: number, mobile_hot_offer_show: boolean, name_display: string, hot_offer_gradient_type_display: string, primary_color: string, second_primary_color: string, discount_color: string, hot_offer_gradient_color: string, hot_offer_gradient_type: number, images?: Array<{ __typename?: 'HeroImage', id: string, image: string } | null> | null } | null } } };

export type GetStoreInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoreInfoQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getStoreInfo: { __typename?: 'StoreInfo', brand: number, id: string, name: string, hotjar_token: string, google_analytics_token: string, phone_number: string, first_name: string, last_name: string, email: string, guild: string, is_earning_loyalty_active: boolean, ray_chat_enabled: boolean, telephone_number: string, tax: boolean, ray_chat_token: string, store_address: { __typename?: 'StoreAddress', province: string, city: string, address: string, postal_code?: string | null, longitude: string, latitude: string }, logo?: { __typename?: 'Image', id: string, image: string } | null, social_media?: { __typename?: 'SocialMedia', twitter: string, facebook: string, linkedin: string, telegram: string, whatsapp: string, instagram: string } | null, ecommerce: { __typename?: 'Ecommerce', domain: string, is_open: boolean, about_us: string, about_returns: string, shipping_guide: string, e_namad_reference_link: string, e_namad_img_src: string, e_namad_img_id: string, e_namad_meta_content: string, show_digify_logo: boolean, cover?: { __typename?: 'Image', id: string, image: string } | null }, earning: { __typename?: 'Earning', game_type: number, value: number, limit: number, game_type_display: string } } } };

export type GetBasketQueryVariables = Exact<{
  uuid: InputMaybe<Scalars['String']>;
}>;


export type GetBasketQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getBasket: { __typename?: 'Basket', id: string, temp_id?: string | null, basket_items: Array<{ __typename?: 'BasketItem', product_id: string, amount?: number | null, cost?: number | null, cost_change?: number | null, discount_amount?: number | null, has_loyalty?: boolean | null, id: string, is_unlimited?: boolean | null, loyalty_gift?: number | null, max_quantity?: number | null, online_cost?: number | null, online_primary_cost?: number | null, primary_cost?: number | null, product_label?: string | null, stock?: string | null, orderable_count?: number | null, variant_name?: string | null, variant_id?: string | null, tax?: boolean | null, single_tax?: number | null, bonus_value?: number | null, image?: { __typename?: 'Image', id: string, image: string } | null, option_values?: Array<{ __typename?: 'OptionValue', id: string, value: string, color_code: string, option: { __typename?: 'OptionValueOption', id: string, name: string, is_color: boolean } } | null> | null }> } } };

export type GetProductsQueryVariables = Exact<{
  params: InputMaybe<ProductsParams>;
}>;


export type GetProductsQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getProducts: { __typename?: 'MinifiedProducts', count: number, next?: string | null, results: Array<{ __typename?: 'MinifiedProduct', average_score?: number | null, id: string, label?: string | null, hot_offer_expired_date?: string | null, has_stock?: boolean | null, orderable_count?: number | null, colors?: Array<{ __typename?: 'Color', color_code?: string | null, id: string } | null> | null, min_variant?: { __typename?: 'MinVariant', id?: string | null, cost?: number | null, stock?: string | null, time_delay?: number | null, is_unlimited?: boolean | null, loyalty_gift?: number | null, primary_cost?: number | null, max_quantity?: number | null, profit_percent?: number | null, tax?: boolean | null, single_tax?: number | null } | null, main_image?: { __typename?: 'Image', id: string, image: string } | null, images?: Array<{ __typename?: 'Image', id: string, image: string } | null> | null }> } } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProductQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getProduct: { __typename?: 'Product', id: string, label: string, description: string, tax: boolean, average_score: number, voter_number: number, product_stock: number, feedback_count: number, has_stock: boolean, profit_percent: number, has_loyalty_gift: boolean, is_favorite: boolean, category: { __typename?: 'Category', id: string, title: string, parent?: string | null }, variants: Array<{ __typename?: 'Variant', id: string, cost: number, stock: string, orderable_count: number, time_delay: number, is_active?: boolean | null, is_unlimited: boolean, loyalty_gift: number, cost_expired_at?: string | null, primary_cost: number, max_quantity: number, images: Array<{ __typename?: 'Image', id: string, image: string }>, option_values?: Array<{ __typename?: 'OptionValue', id: string, value: string, color_code: string, option: { __typename?: 'OptionValueOption', id: string, name: string, is_color: boolean } }> | null }>, images: Array<{ __typename?: 'Image', id: string, image: string }>, features: Array<{ __typename?: 'Feature', id?: string | null, title: string, description: string }>, chosen_image?: { __typename?: 'Image', id: string, image: string } | null } } };

export type GetSuggestionProductsQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type GetSuggestionProductsQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getSuggestionProducts: { __typename?: 'MinifiedProducts', results: Array<{ __typename?: 'MinifiedProduct', id: string, label?: string | null, orderable_count?: number | null, average_score?: number | null, has_stock?: boolean | null, min_variant?: { __typename?: 'MinVariant', id?: string | null, cost?: number | null, stock?: string | null, is_unlimited?: boolean | null, loyalty_gift?: number | null, primary_cost?: number | null, max_quantity?: number | null, profit_percent?: number | null } | null, image?: { __typename?: 'Image', id: string, image: string } | null, colors?: Array<{ __typename?: 'Color', id: string, value?: string | null, color_code?: string | null } | null> | null }> } } };

export type GetProductFeedbackQueryVariables = Exact<{
  productId: Scalars['ID'];
  params: InputMaybe<ProductFeedbackParams>;
}>;


export type GetProductFeedbackQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getProductFeedback: { __typename?: 'ProductFeedbacks', count: number, next?: string | null, previous?: string | null, results: Array<{ __typename?: 'ProductFeedback', score: number, description: string, reply: string, created_at: string, first_name: string, last_name: string, images: Array<{ __typename?: 'Image', id: string, uuid: string, image: string }>, variant: { __typename?: 'Variant', name: string, option_values?: Array<{ __typename?: 'OptionValue', id: string, value: string, color_code: string, option: { __typename?: 'OptionValueOption', id: string, name: string, is_color: boolean } }> | null } }> } } };

export type ProductFilteringQueryVariables = Exact<{
  params: InputMaybe<ProductsParams>;
}>;


export type ProductFilteringQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', productFiltering: { __typename?: 'ProductFiltering', available_maximum_cost: number, categories: Array<Array<string | null> | null>, colors: Array<Array<string>>, has_discount: Array<boolean | null>, has_stock: Array<boolean | null>, maximum_cost: number, minimum_cost: number, options: Array<{ __typename?: 'ProductFilteringOptions', name: string, option_values: Array<Array<string>> }>, custom_categories: Array<{ __typename?: 'Category', title: string, id: string, child_categories: Array<{ __typename?: 'Category', title: string, id: string, child_categories: Array<{ __typename?: 'Category', title: string, id: string }> }> }> } } };

export type GetCategoriesQueryVariables = Exact<{
  params: InputMaybe<CategoriesParams>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getCategories: { __typename?: 'Categories', count?: number | null, results?: Array<{ __typename?: 'Category', id: string, title: string, image?: { __typename?: 'Image', id: string, image: string } | null, children?: Array<{ __typename?: 'Category', id: string, title: string, image?: { __typename?: 'Image', id: string, image: string } | null, children?: Array<{ __typename?: 'Category', id: string, title: string, image?: { __typename?: 'Image', id: string, image: string } | null, children?: Array<{ __typename?: 'Category', id: string, title: string, image?: { __typename?: 'Image', id: string, image: string } | null, children?: Array<{ __typename?: 'Category', id: string, title: string, image?: { __typename?: 'Image', id: string, image: string } | null } | null> | null } | null> | null } | null> | null } | null> | null } | null> | null } } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getProfile: { __typename?: 'Profile', id: string, phone_number: string, national_code?: string | null, telephone_number?: string | null, card_number?: string | null, birthday?: string | null, marriage_date?: string | null, first_name?: string | null, last_name?: string | null, email?: string | null, granted?: boolean | null } } };

export type GetNotificationSettingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationSettingQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getNotificationSetting: { __typename?: 'NotificationSetting', id: string, product_available_sms_notify: boolean, product_available_email_notify: boolean, product_available_internal_notify: boolean, hot_offer_available_sms_notify: boolean, hot_offer_available_email_notify: boolean, hot_offer_available_internal_notify: boolean, receive_order_sms_notify: boolean, receive_order_email_notify: boolean, receive_order_internal_notify: boolean, order_invoice_sms_notify: boolean, order_invoice_email_notify: boolean, order_invoice_internal_notify: boolean, return_invoice_sms_notify: boolean, return_invoice_email_notify: boolean, return_invoice_internal_notify: boolean, survey_sms_notify: boolean, survey_email_notify: boolean, survey_internal_notify: boolean } } };

export type GetOrdersQueryVariables = Exact<{
  params: InputMaybe<OrdersParams>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getOrdersV3: { __typename?: 'UserOrders', count?: number | null, next?: string | null, results: Array<{ __typename?: 'UserOrder', cost: number, reference_code: string, created_at: string, id: string, status: number, previous_status?: number | null, expired_at: string, owner_card_name: string, received_at?: string | null, registration_type: number, shipping_time_count?: number | null, owner_card_number: string, is_finished: boolean, received_by_customer: boolean, cancellation_reason?: string | null, items: Array<{ __typename?: 'UserOrderItems', details: { __typename?: 'UserOrderItemsDetail', variant: { __typename?: 'UserOrderItemsDetailVariant', product_serialized?: { __typename?: 'ProductSerialized', label: string, id: string, images?: Array<{ __typename?: 'Image', id: string, image: string } | null> | null } | null } } }>, approximate_sending_date?: { __typename?: 'ApproximateSendingDate', start?: string | null, end?: string | null } | null, returns?: { __typename?: 'ReturnsID', id?: number | null, status?: number | null, reference_code?: string | null, created_at?: string | null } | null, shipping: { __typename?: 'Shipping', name: string } }> } } };

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetOrderQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getOrderV3: { __typename?: 'UserOrder', cost: number, created_at: string, received_at?: string | null, registration_type: number, order_description: string, shipping_time_count?: number | null, receiver_name: string, receiver_number: string, receiver_last_name: string, loyalty_amount: number, total_discount_cost: number, pocket_cost: number, tax: number, status: number, previous_status?: number | null, expired_at: string, post_tracking_number: string, reference_code: string, customer_shipping_cost: number, cancellation_reason?: string | null, owner_card_name: string, owner_card_number: string, id: string, is_finished: boolean, received_by_customer: boolean, can_return_request: boolean, address: { __typename?: 'Address', address: string }, approximate_sending_date?: { __typename?: 'ApproximateSendingDate', start?: string | null, end?: string | null } | null, pocket?: { __typename?: 'Pocket', name?: string | null } | null, shipping: { __typename?: 'Shipping', name: string }, items: Array<{ __typename?: 'UserOrderItems', id: string, single_cost: number, unit_amount: number, details: { __typename?: 'UserOrderItemsDetail', variant: { __typename?: 'UserOrderItemsDetailVariant', cost: number, cost_expired_at?: string | null, id: string, is_return?: boolean | null, name?: string | null, online_cost?: number | null, online_primary_cost?: number | null, primary_cost?: number | null, time_delay?: number | null, images?: Array<{ __typename?: 'Image', id: string, image: string } | null> | null, option_values?: Array<{ __typename?: 'OptionValue', value: string, color_code: string, option: { __typename?: 'OptionValueOption', name: string, is_color: boolean } } | null> | null, product_serialized?: { __typename?: 'ProductSerialized', id: string, label: string, images?: Array<{ __typename?: 'Image', id: string, image: string } | null> | null } | null } } }> } } };

export type GetReturnedOrderQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetReturnedOrderQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getReturnedOrder: { __typename?: 'ReturnOrder', id: string, status: number, reference_code: string, order_reference_code: string, created_at: string, status_display: string, first_name: string, order_created_at: string, last_name: string, phone_number: string, card_number: string, total_returned_cost: number, items: Array<{ __typename?: 'ReturnItem', id: string, status_display: string, status: number, reason: string, returned_cost: number, count: number, description: string, reply_reason: string, reply_description: string, relative_voucher_amount: number, images: Array<{ __typename?: 'Image', id: string, uuid: string, image: string }>, order_item: { __typename?: 'ReturnOrderItem', id?: string | null, single_cost?: number | null, single_primary_cost?: number | null, single_tax?: number | null, single_profit?: number | null, product_label?: string | null, details?: { __typename?: 'OrderItemsDetail', variant?: { __typename?: 'Variant', id: string, cost: number, name: string, status: number, online_primary_cost: number, primary_cost: number, online_cost: number, images: Array<{ __typename?: 'Image', id: string, uuid: string, image: string }>, product_serialized?: { __typename?: 'ProductSerialized', name: string, id: string, label: string, images?: Array<{ __typename?: 'Image', id: string, uuid: string, image: string } | null> | null } | null, option_values?: Array<{ __typename?: 'OptionValue', id: string, value: string, color_code: string, option: { __typename?: 'OptionValueOption', id: string, name: string, is_color: boolean } }> | null } | null } | null } }> } } };

export type GetOrdersStatusCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersStatusCountQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getOrderStatusCount: { __typename?: 'Orders', returns_count: number, status_count: Array<{ __typename?: 'OrderStatusCount', status: number, total: number }> } } };

export type GetBreadcrumbQueryVariables = Exact<{
  params: InputMaybe<BreadcrumbParams>;
}>;


export type GetBreadcrumbQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getBreadcrumb: { __typename?: 'Breadcrumb', id: string, title: string, image?: { __typename?: 'Image', id: string, image: string } | null, child?: { __typename?: 'BreadcrumbChild', id?: string | null, title?: string | null, image?: { __typename?: 'Image', id: string, image: string } | null, child?: { __typename?: 'BreadcrumbChild', id?: string | null, title?: string | null, image?: { __typename?: 'Image', id: string, image: string } | null, child?: { __typename?: 'BreadcrumbChild', id?: string | null, title?: string | null, image?: { __typename?: 'Image', id: string, image: string } | null, child?: { __typename?: 'BreadcrumbChild', id?: string | null, title?: string | null, image?: { __typename?: 'Image', id: string, image: string } | null } | null } | null } | null } | null } } };

export type GetAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressesQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getAddresses: Array<{ __typename?: 'Address', city?: string | null, province?: string | null, address: string, no?: number | null, postal_code?: string | null, id: string, unit_number?: number | null, description?: string | null, receiver_name?: string | null, receiver_lastname?: string | null, receiver_number?: string | null, name?: string | null, longitude?: string | null, latitude?: string | null } | null> } };

export type GetShippingAddressesQueryVariables = Exact<{
  addressId: Scalars['ID'];
}>;


export type GetShippingAddressesQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getShippingAddresses: Array<{ __typename?: 'ShippingAddress', cost: number, id: string, name: string, shipping_delay: number, shipping_type: number, shipping_type_display?: string | null, time_sending: number } | null> } };

export type GetPocketQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPocketQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getPocket: Array<{ __typename?: 'Pocket', cost?: number | null, id?: string | null, is_active?: boolean | null, name?: string | null } | null> } };

export type GetLoyaltyCreditQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoyaltyCreditQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getLoyaltyCreditV2: { __typename?: 'LoyaltyCredit', loyalty_credit: number } } };

export type GetFavoritesQueryVariables = Exact<{
  params: InputMaybe<FavoritesParams>;
}>;


export type GetFavoritesQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getFavoritesV2: { __typename?: 'MinifiedProducts', count: number, next?: string | null, results: Array<{ __typename?: 'MinifiedProduct', average_score?: number | null, id: string, label?: string | null, hot_offer_expired_date?: string | null, has_stock?: boolean | null, orderable_count?: number | null, colors?: Array<{ __typename?: 'Color', color_code?: string | null, id: string } | null> | null, min_variant?: { __typename?: 'MinVariant', id?: string | null, cost?: number | null, stock?: string | null, time_delay?: number | null, is_unlimited?: boolean | null, loyalty_gift?: number | null, primary_cost?: number | null, max_quantity?: number | null, profit_percent?: number | null } | null, main_image?: { __typename?: 'Image', id: string, image: string } | null, images?: Array<{ __typename?: 'Image', id: string, image: string } | null> | null }> } } };

export type IsFavoriteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IsFavoriteQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', isFavorite: { __typename?: 'IsFavorite', is_favorite: boolean } } };

export type GetTransactionTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionTypesQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getTransactionTypes: Array<{ __typename?: 'TransactionTypes', gateway_type?: number | null, persian_gateway_type?: string | null } | null> } };

export type GetLoyaltyLogsQueryVariables = Exact<{
  params: InputMaybe<LoyaltyLogsParams>;
}>;


export type GetLoyaltyLogsQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getLoyaltyLogs: { __typename?: 'LoyaltyLogs', count: number, next?: string | null, results: Array<{ __typename?: 'LoyaltyLog', account_credit: number, amount: number, created_at: string, id: string, log_type_display: string, order_cost?: number | null, reason?: string | null, data?: { __typename?: 'LoyaltyLogData', game?: number | null } | null }> } } };

export type GetApproximateSendingDateQueryVariables = Exact<{
  addressId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type GetApproximateSendingDateQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getShippingAddress: { __typename?: 'ShippingAddress', approximate_sending_date?: { __typename?: 'ShippingAddressApproximateSendingDate', start: string, end: string } | null } } };

export type GetThemeCustomizationQueryVariables = Exact<{
  themeName: InputMaybe<Scalars['String']>;
}>;


export type GetThemeCustomizationQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getThemeCustomization: { __typename?: 'ThemeCustomization', id?: string | null, data?: any | null } } };

export type GetUserTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTypeQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getUserType: { __typename?: 'UserType', type?: string | null } } };

export type GetVariantsStockQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetVariantsStockQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getVariantsStock: Array<{ __typename?: 'VariantsStock', id: string, orderable_count: number } | null> } };

export type GetBlogArticlesQueryVariables = Exact<{
  params: InputMaybe<BlogArticlesParams>;
}>;


export type GetBlogArticlesQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getBlogArticles: { __typename?: 'Articles', count: number, next?: string | null, previous?: string | null, results: Array<{ __typename?: 'Article', id: number, title: string, content: string, published_at: string, view_count: number, like_count: number, image: string, is_active: boolean, is_liked: boolean, is_highlight: boolean, slug: string, tags: Array<{ __typename?: 'ArticleTag', id: number, title: string }>, category: Array<{ __typename?: 'ArticleCategory', id: number, title: string, parent?: number | null }> }> } } };

export type GetBlogHighlightsQueryVariables = Exact<{
  params: InputMaybe<BlogHighlightsParams>;
}>;


export type GetBlogHighlightsQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getBlogHighlights: { __typename?: 'Highlights', count: number, next?: string | null, previous?: string | null, results: Array<{ __typename?: 'Highlight', id: number, article: { __typename?: 'Article', id: number, title: string, image: string, slug: string } }> } } };

export type GetBlogArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBlogArticleQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getBlogArticle: { __typename?: 'Article', id: number, title: string, content: string, published_at: string, view_count: number, image: string, is_active: boolean, is_liked: boolean, like_count: number, is_highlight: boolean, slug: string, tags: Array<{ __typename?: 'ArticleTag', id: number, title: string }>, category: Array<{ __typename?: 'ArticleCategory', id: number, title: string, parent?: number | null }> } } };

export type GetSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSitemapQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getSitemap: string } };

export type GetTokenPanelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokenPanelQuery = { __typename?: 'Query', notification?: { __typename?: 'NotificationQuery', getToken?: { __typename?: 'OtpToken', token: string } | null } | null };

export type GetShippingSokectQueryVariables = Exact<{
  addressId: Scalars['ID'];
}>;


export type GetShippingSokectQuery = { __typename?: 'Query', customer: { __typename?: 'CustomerQuery', getShippingSokect: Array<{ __typename?: 'ShippingAddress', cost: number, id: string, name: string, shipping_delay: number, shipping_type: number, shipping_type_display?: string | null, time_sending: number } | null> } };


export const GetCookieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetCookie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCookie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]}}]} as unknown as DocumentNode<GetCookieMutation, GetCookieMutationVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const GetRefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetRefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenContent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRefreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]}}]} as unknown as DocumentNode<GetRefreshTokenMutation, GetRefreshTokenMutationVariables>;
export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const OtpSendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OtpSend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OTPSendContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpSend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]}}]} as unknown as DocumentNode<OtpSendMutation, OtpSendMutationVariables>;
export const OtpSendV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OtpSendV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OTPSendContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpSendV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"is_forget_password"}},{"kind":"Field","name":{"kind":"Name","value":"is_register"}}]}}]}}]}}]} as unknown as DocumentNode<OtpSendV2Mutation, OtpSendV2MutationVariables>;
export const OtpSendSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"otpSendSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTokenByOTPSingUpContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpSendSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}},{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]}}]} as unknown as DocumentNode<OtpSendSignupMutation, OtpSendSignupMutationVariables>;
export const GetChangePasswordAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetChangePasswordAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTokenByOTPContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChangePasswordAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}}]}}]}}]}}]} as unknown as DocumentNode<GetChangePasswordAuthMutation, GetChangePasswordAuthMutationVariables>;
export const ForgetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgetPasswordContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]}}]} as unknown as DocumentNode<ForgetPasswordMutation, ForgetPasswordMutationVariables>;
export const ChangePasswordWithoutOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePasswordWithoutOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordWithoutOtpContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePasswordWithoutOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]}}]} as unknown as DocumentNode<ChangePasswordWithoutOtpMutation, ChangePasswordWithoutOtpMutationVariables>;
export const UpdateNotificationSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNotificationSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationSettingContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNotificationSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hot_offer_available_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_available_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"product_available_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"product_available_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_available_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_available_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"receive_order_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"receive_order_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"receive_order_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"order_invoice_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"order_invoice_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"order_invoice_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"return_invoice_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"return_invoice_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"return_invoice_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"survey_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"survey_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"survey_internal_notify"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNotificationSettingMutation, UpdateNotificationSettingMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"national_code"}},{"kind":"Field","name":{"kind":"Name","value":"telephone_number"}},{"kind":"Field","name":{"kind":"Name","value":"sheba_number"}},{"kind":"Field","name":{"kind":"Name","value":"card_number"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"marriage_date"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender_display"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const PaymentCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PaymentCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}]}]}}]}}]} as unknown as DocumentNode<PaymentCardMutation, PaymentCardMutationVariables>;
export const UpdateBasketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBasket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBasketContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBasket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"temp_id"}},{"kind":"Field","name":{"kind":"Name","value":"basket_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"cost_change"}},{"kind":"Field","name":{"kind":"Name","value":"discount_amount"}},{"kind":"Field","name":{"kind":"Name","value":"has_loyalty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_unlimited"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"max_quantity"}},{"kind":"Field","name":{"kind":"Name","value":"online_cost"}},{"kind":"Field","name":{"kind":"Name","value":"online_primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"option_values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"product_label"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}},{"kind":"Field","name":{"kind":"Name","value":"variant_name"}},{"kind":"Field","name":{"kind":"Name","value":"variant_id"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"single_tax"}},{"kind":"Field","name":{"kind":"Name","value":"bonus_value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBasketMutation, UpdateBasketMutationVariables>;
export const VoucherCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VoucherCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoucherCheckContent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"customer"},"name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voucherCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"expire_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"voucher_type"}},{"kind":"Field","name":{"kind":"Name","value":"voucher_type_display"}}]}}]}}]}}]} as unknown as DocumentNode<VoucherCheckMutation, VoucherCheckMutationVariables>;
export const RemoveFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export const AddFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gateway_link"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_type"}},{"kind":"Field","name":{"kind":"Name","value":"registration_type"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const DeleteAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteAddressMutation, DeleteAddressMutationVariables>;
export const CreateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"postal_code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_lastname"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_number"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const PartialUpdateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PartialUpdateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partialUpdateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"postal_code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_lastname"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_number"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]}}]} as unknown as DocumentNode<PartialUpdateAddressMutation, PartialUpdateAddressMutationVariables>;
export const GetGatewayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetGateway"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GatewayLinkUrlContent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGateway"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gateway_link"}}]}}]}}]}}]} as unknown as DocumentNode<GetGatewayMutation, GetGatewayMutationVariables>;
export const ClearCookieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearCookie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearCookie"}}]}}]}}]} as unknown as DocumentNode<ClearCookieMutation, ClearCookieMutationVariables>;
export const CancelOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<CancelOrderMutation, CancelOrderMutationVariables>;
export const UpdateReceiveStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateReceiveStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateReceiveStatusContent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateReceiveStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]}}]} as unknown as DocumentNode<UpdateReceiveStatusMutation, UpdateReceiveStatusMutationVariables>;
export const ReturnOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReturnOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReturnOrderContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returnOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"order_reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status_display"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"returned_cost"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reply_reason"}},{"kind":"Field","name":{"kind":"Name","value":"reply_description"}},{"kind":"Field","name":{"kind":"Name","value":"relative_voucher_amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status_display"}},{"kind":"Field","name":{"kind":"Name","value":"order_created_at"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"card_number"}},{"kind":"Field","name":{"kind":"Name","value":"total_returned_cost"}}]}}]}}]}}]} as unknown as DocumentNode<ReturnOrderMutation, ReturnOrderMutationVariables>;
export const UpdateThemeCustomizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateThemeCustomization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"themeName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateThemeCustomization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"themeName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"themeName"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateThemeCustomizationMutation, UpdateThemeCustomizationMutationVariables>;
export const CreateThemeCustomizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateThemeCustomization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"themeName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createThemeCustomization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"themeName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"themeName"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<CreateThemeCustomizationMutation, CreateThemeCustomizationMutationVariables>;
export const CreateStoreOpeningNotifierDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStoreOpeningNotifier"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStoreOpeningNotifierContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStoreOpeningNotifier"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]}}]} as unknown as DocumentNode<CreateStoreOpeningNotifierMutation, CreateStoreOpeningNotifierMutationVariables>;
export const UploadImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<UploadImageMutation, UploadImageMutationVariables>;
export const LikeBlogArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeBlogArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeBlogArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"published_at"}},{"kind":"Field","name":{"kind":"Name","value":"view_count"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"is_liked"}},{"kind":"Field","name":{"kind":"Name","value":"like_count"}},{"kind":"Field","name":{"kind":"Name","value":"is_highlight"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LikeBlogArticleMutation, LikeBlogArticleMutationVariables>;
export const GetAppearanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppearance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppearance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_luxury"}},{"kind":"Field","name":{"kind":"Name","value":"product_card_type_display"}},{"kind":"Field","name":{"kind":"Name","value":"mobile_hot_offer_show"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name_display"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_gradient_type_display"}},{"kind":"Field","name":{"kind":"Name","value":"primary_color"}},{"kind":"Field","name":{"kind":"Name","value":"second_primary_color"}},{"kind":"Field","name":{"kind":"Name","value":"discount_color"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_gradient_color"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_gradient_type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAppearanceQuery, GetAppearanceQueryVariables>;
export const GetStoreInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStoreInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStoreInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hotjar_token"}},{"kind":"Field","name":{"kind":"Name","value":"google_analytics_token"}},{"kind":"Field","name":{"kind":"Name","value":"store_address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"postal_code"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"social_media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"linkedin"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"ecommerce"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"is_open"}},{"kind":"Field","name":{"kind":"Name","value":"about_us"}},{"kind":"Field","name":{"kind":"Name","value":"about_returns"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_guide"}},{"kind":"Field","name":{"kind":"Name","value":"e_namad_reference_link"}},{"kind":"Field","name":{"kind":"Name","value":"e_namad_img_src"}},{"kind":"Field","name":{"kind":"Name","value":"e_namad_img_id"}},{"kind":"Field","name":{"kind":"Name","value":"e_namad_meta_content"}},{"kind":"Field","name":{"kind":"Name","value":"show_digify_logo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"guild"}},{"kind":"Field","name":{"kind":"Name","value":"earning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game_type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"game_type_display"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_earning_loyalty_active"}},{"kind":"Field","name":{"kind":"Name","value":"ray_chat_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"telephone_number"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"ray_chat_token"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoreInfoQuery, GetStoreInfoQueryVariables>;
export const GetBasketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBasket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBasket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"temp_id"}},{"kind":"Field","name":{"kind":"Name","value":"basket_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"cost_change"}},{"kind":"Field","name":{"kind":"Name","value":"discount_amount"}},{"kind":"Field","name":{"kind":"Name","value":"has_loyalty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_unlimited"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"max_quantity"}},{"kind":"Field","name":{"kind":"Name","value":"online_cost"}},{"kind":"Field","name":{"kind":"Name","value":"online_primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"option_values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"product_label"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}},{"kind":"Field","name":{"kind":"Name","value":"variant_name"}},{"kind":"Field","name":{"kind":"Name","value":"variant_id"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"single_tax"}},{"kind":"Field","name":{"kind":"Name","value":"bonus_value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBasketQuery, GetBasketQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"average_score"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color_code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"min_variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"time_delay"}},{"kind":"Field","name":{"kind":"Name","value":"is_unlimited"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"max_quantity"}},{"kind":"Field","name":{"kind":"Name","value":"profit_percent"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"single_tax"}}]}},{"kind":"Field","name":{"kind":"Name","value":"main_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_expired_date"}},{"kind":"Field","name":{"kind":"Name","value":"has_stock"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time_delay"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"is_unlimited"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"cost_expired_at"}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"max_quantity"}},{"kind":"Field","name":{"kind":"Name","value":"option_values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"average_score"}},{"kind":"Field","name":{"kind":"Name","value":"voter_number"}},{"kind":"Field","name":{"kind":"Name","value":"chosen_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_stock"}},{"kind":"Field","name":{"kind":"Name","value":"feedback_count"}},{"kind":"Field","name":{"kind":"Name","value":"has_stock"}},{"kind":"Field","name":{"kind":"Name","value":"profit_percent"}},{"kind":"Field","name":{"kind":"Name","value":"has_loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetSuggestionProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSuggestionProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSuggestionProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}},{"kind":"Field","name":{"kind":"Name","value":"min_variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"is_unlimited"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"max_quantity"}},{"kind":"Field","name":{"kind":"Name","value":"profit_percent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"average_score"}},{"kind":"Field","name":{"kind":"Name","value":"has_stock"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSuggestionProductsQuery, GetSuggestionProductsQueryVariables>;
export const GetProductFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductFeedbackParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"previous"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"option_values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductFeedbackQuery, GetProductFeedbackQueryVariables>;
export const ProductFilteringDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductFiltering"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductsParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productFiltering"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available_maximum_cost"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"colors"}},{"kind":"Field","name":{"kind":"Name","value":"has_discount"}},{"kind":"Field","name":{"kind":"Name","value":"has_stock"}},{"kind":"Field","name":{"kind":"Name","value":"maximum_cost"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"option_values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"minimum_cost"}},{"kind":"Field","name":{"kind":"Name","value":"custom_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"child_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"child_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductFilteringQuery, ProductFilteringQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoriesParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"national_code"}},{"kind":"Field","name":{"kind":"Name","value":"telephone_number"}},{"kind":"Field","name":{"kind":"Name","value":"card_number"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"marriage_date"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"granted"}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const GetNotificationSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotificationSetting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNotificationSetting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_available_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"product_available_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"product_available_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_available_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_available_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_available_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"receive_order_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"receive_order_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"receive_order_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"order_invoice_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"order_invoice_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"order_invoice_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"return_invoice_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"return_invoice_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"return_invoice_internal_notify"}},{"kind":"Field","name":{"kind":"Name","value":"survey_sms_notify"}},{"kind":"Field","name":{"kind":"Name","value":"survey_email_notify"}},{"kind":"Field","name":{"kind":"Name","value":"survey_internal_notify"}}]}}]}}]}}]} as unknown as DocumentNode<GetNotificationSettingQuery, GetNotificationSettingQueryVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrdersParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrdersV3"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_serialized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"previous_status"}},{"kind":"Field","name":{"kind":"Name","value":"expired_at"}},{"kind":"Field","name":{"kind":"Name","value":"approximate_sending_date"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner_card_name"}},{"kind":"Field","name":{"kind":"Name","value":"received_at"}},{"kind":"Field","name":{"kind":"Name","value":"registration_type"}},{"kind":"Field","name":{"kind":"Name","value":"returns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shipping_time_count"}},{"kind":"Field","name":{"kind":"Name","value":"owner_card_number"}},{"kind":"Field","name":{"kind":"Name","value":"approximate_sending_date"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_finished"}},{"kind":"Field","name":{"kind":"Name","value":"received_by_customer"}},{"kind":"Field","name":{"kind":"Name","value":"cancellation_reason"}},{"kind":"Field","name":{"kind":"Name","value":"shipping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrderV3"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"received_at"}},{"kind":"Field","name":{"kind":"Name","value":"registration_type"}},{"kind":"Field","name":{"kind":"Name","value":"order_description"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_time_count"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_number"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_last_name"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_amount"}},{"kind":"Field","name":{"kind":"Name","value":"total_discount_cost"}},{"kind":"Field","name":{"kind":"Name","value":"pocket_cost"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"previous_status"}},{"kind":"Field","name":{"kind":"Name","value":"expired_at"}},{"kind":"Field","name":{"kind":"Name","value":"approximate_sending_date"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pocket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shipping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post_tracking_number"}},{"kind":"Field","name":{"kind":"Name","value":"reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"customer_shipping_cost"}},{"kind":"Field","name":{"kind":"Name","value":"cancellation_reason"}},{"kind":"Field","name":{"kind":"Name","value":"owner_card_name"}},{"kind":"Field","name":{"kind":"Name","value":"owner_card_number"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_finished"}},{"kind":"Field","name":{"kind":"Name","value":"received_by_customer"}},{"kind":"Field","name":{"kind":"Name","value":"can_return_request"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"cost_expired_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_return"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"online_cost"}},{"kind":"Field","name":{"kind":"Name","value":"online_primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"option_values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"time_delay"}},{"kind":"Field","name":{"kind":"Name","value":"product_serialized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"single_cost"}},{"kind":"Field","name":{"kind":"Name","value":"unit_amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderQuery, GetOrderQueryVariables>;
export const GetReturnedOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReturnedOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReturnedOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"order_reference_code"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"status_display"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"order_created_at"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"card_number"}},{"kind":"Field","name":{"kind":"Name","value":"total_returned_cost"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status_display"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"returned_cost"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reply_reason"}},{"kind":"Field","name":{"kind":"Name","value":"reply_description"}},{"kind":"Field","name":{"kind":"Name","value":"relative_voucher_amount"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"single_cost"}},{"kind":"Field","name":{"kind":"Name","value":"single_primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"single_tax"}},{"kind":"Field","name":{"kind":"Name","value":"single_profit"}},{"kind":"Field","name":{"kind":"Name","value":"product_label"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"online_primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"product_serialized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"online_cost"}},{"kind":"Field","name":{"kind":"Name","value":"option_values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color_code"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_color"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetReturnedOrderQuery, GetReturnedOrderQueryVariables>;
export const GetOrdersStatusCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrdersStatusCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"getOrderStatusCount"},"name":{"kind":"Name","value":"getOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returns_count"}},{"kind":"Field","name":{"kind":"Name","value":"status_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersStatusCountQuery, GetOrdersStatusCountQueryVariables>;
export const GetBreadcrumbDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBreadcrumb"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BreadcrumbParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBreadcrumb"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"child"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"child"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"child"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"child"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBreadcrumbQuery, GetBreadcrumbQueryVariables>;
export const GetAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"postal_code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_name"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_lastname"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_number"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]}}]} as unknown as DocumentNode<GetAddressesQuery, GetAddressesQueryVariables>;
export const GetShippingAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getShippingAddresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getShippingAddresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_delay"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_type"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_type_display"}},{"kind":"Field","name":{"kind":"Name","value":"time_sending"}}]}}]}}]}}]} as unknown as DocumentNode<GetShippingAddressesQuery, GetShippingAddressesQueryVariables>;
export const GetPocketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPocket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPocket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPocketQuery, GetPocketQueryVariables>;
export const GetLoyaltyCreditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoyaltyCredit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLoyaltyCreditV2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loyalty_credit"}}]}}]}}]}}]} as unknown as DocumentNode<GetLoyaltyCreditQuery, GetLoyaltyCreditQueryVariables>;
export const GetFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FavoritesParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFavoritesV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"average_score"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color_code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"min_variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"time_delay"}},{"kind":"Field","name":{"kind":"Name","value":"is_unlimited"}},{"kind":"Field","name":{"kind":"Name","value":"loyalty_gift"}},{"kind":"Field","name":{"kind":"Name","value":"primary_cost"}},{"kind":"Field","name":{"kind":"Name","value":"max_quantity"}},{"kind":"Field","name":{"kind":"Name","value":"profit_percent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"main_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hot_offer_expired_date"}},{"kind":"Field","name":{"kind":"Name","value":"has_stock"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFavoritesQuery, GetFavoritesQueryVariables>;
export const IsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<IsFavoriteQuery, IsFavoriteQueryVariables>;
export const GetTransactionTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gateway_type"}},{"kind":"Field","name":{"kind":"Name","value":"persian_gateway_type"}}]}}]}}]}}]} as unknown as DocumentNode<GetTransactionTypesQuery, GetTransactionTypesQueryVariables>;
export const GetLoyaltyLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoyaltyLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoyaltyLogsParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLoyaltyLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_credit"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"log_type_display"}},{"kind":"Field","name":{"kind":"Name","value":"order_cost"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLoyaltyLogsQuery, GetLoyaltyLogsQueryVariables>;
export const GetApproximateSendingDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getApproximateSendingDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getShippingAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approximate_sending_date"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetApproximateSendingDateQuery, GetApproximateSendingDateQueryVariables>;
export const GetThemeCustomizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetThemeCustomization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"themeName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getThemeCustomization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"themeName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"themeName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<GetThemeCustomizationQuery, GetThemeCustomizationQueryVariables>;
export const GetUserTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserTypeQuery, GetUserTypeQueryVariables>;
export const GetVariantsStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVariantsStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVariantsStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderable_count"}}]}}]}}]}}]} as unknown as DocumentNode<GetVariantsStockQuery, GetVariantsStockQueryVariables>;
export const GetBlogArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlogArticles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"blogArticlesParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlogArticles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"previous"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"published_at"}},{"kind":"Field","name":{"kind":"Name","value":"view_count"}},{"kind":"Field","name":{"kind":"Name","value":"like_count"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"is_liked"}},{"kind":"Field","name":{"kind":"Name","value":"is_highlight"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBlogArticlesQuery, GetBlogArticlesQueryVariables>;
export const GetBlogHighlightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlogHighlights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"blogHighlightsParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlogHighlights"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"previous"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"article"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBlogHighlightsQuery, GetBlogHighlightsQueryVariables>;
export const GetBlogArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlogArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlogArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"published_at"}},{"kind":"Field","name":{"kind":"Name","value":"view_count"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"is_liked"}},{"kind":"Field","name":{"kind":"Name","value":"like_count"}},{"kind":"Field","name":{"kind":"Name","value":"is_highlight"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<GetBlogArticleQuery, GetBlogArticleQueryVariables>;
export const GetSitemapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSitemap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSitemap"}}]}}]}}]} as unknown as DocumentNode<GetSitemapQuery, GetSitemapQueryVariables>;
export const GetTokenPanelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenPanel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<GetTokenPanelQuery, GetTokenPanelQueryVariables>;
export const GetShippingSokectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getShippingSokect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getShippingSokect"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_delay"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_type"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_type_display"}},{"kind":"Field","name":{"kind":"Name","value":"time_sending"}}]}}]}}]}}]} as unknown as DocumentNode<GetShippingSokectQuery, GetShippingSokectQueryVariables>;