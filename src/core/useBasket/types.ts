import { Link } from '../../sharedInterfaces/Link';
import { ApolloError } from '../../apollo';
import { Address, Addresses } from '../useAddress';
import { OptionValue } from '../../utils/handleCreateOptionValue';
import { ReceiverInfo } from '../useStore/values/types';

export type BasketStep = 'items' | 'address' | 'shipping' | 'payment' | 'pay-order';

export interface Basket {
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

export interface BasketStepItems extends BasketItems {
    outOfStockItems: OutOfStockItem[];
}

export interface OutOfStockItem
    extends Omit<ProductItems, 'handleDecrementAmount' | 'handleIncrementAmount' | 'handleRemove'> {
    handleDecrementAmount?: () => void;
    handleIncrementAmount?: () => void;
    handleRemove?: () => void;
}

export interface BasketAddress extends Address {
    handleSelectAddress: () => void;
    selected: boolean;
}

export interface BasketAddresses extends Addresses {
    addresses: BasketAddress[];
    receiverInfo: ReceiverInfo;
    handleChangeReceiverInfo: (info: ReceiverInfo) => void;
}

export interface ProductItems {
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
    optionValue: OptionValue[];
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

export interface BasketItems {
    products: ProductItems[];
    loading: boolean;
    error: ApolloError;
}

export interface BasketDescription {
    description: string;
    handleChangeDescription: (value: string) => void;
}

export interface Discount {
    amount: number;
    code: string;
    id: string;
    limit: number;
    type: 'percent' | 'cash';
    totalCost: number;
}

export interface DiscountCode {
    error: ApolloError;
    loading: boolean;
    discount: Discount;
    code: string;
    handleSubmitDiscountCode: () => Promise<void>;
    handleChangeDiscountCode: (value: string) => void;
    handleRemoveDiscountCode: () => void;
}
export interface Factor {
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

export interface LoyaltyCredit {
    credit: number;
    handleSelectLoyaltyCredit: () => void;
    loading: boolean;
    error: ApolloError;
    selected: boolean;
}

export type Strategy = 'A' | 'B' | 'C' | 'D';

export interface LoyaltyGift {
    limit: number;
    value: number;
    strategy: Strategy;
    active: boolean;
}
export interface Packs {
    selected: boolean;
    cost: number;
    name: string;
    id: string;
    handleSelectPack: () => void;
}

export interface Packing {
    packs: Packs[];
    error: ApolloError;
    loading: boolean;
}
export interface Shipping {
    id: string;
    name: string;
    timeSendingDays: number;
    cost: number;
    selected: boolean;
    loading: boolean;
    handleSelectShipping: () => void;
}

export interface ShippingMethod {
    fetchShippingMethod: () => Promise<void>;
    shippingList: Shipping[];
    approximateSendingDate: string;
    error: ApolloError;
    loading: boolean;
}

export interface Transaction {
    name: string;
    selected: boolean;
    gatewayType: string;
    handleSelectTransactionType: () => void;
}

export interface TransactionType {
    transactions: Transaction[];
    error: ApolloError;
    loading: boolean;
}
