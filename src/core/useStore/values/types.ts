import { OptionValue } from '../../../utils/handleCreateOptionValue';

export interface NewBasketItem {
    amount: number;
    online_cost: number;
    has_loyalty_gift: boolean;
    online_primary_cost: number;
    variant_name: string;
    image: {
        image: string | undefined;
    };
    option_values: OptionValue[];
    product_id: number | string;
    variant_id: number | string;
    bonus_value: number;
    product_label: string;
    orderable_count: number;
    tax: boolean | number;
    single_tax: number | boolean;
}

export interface BasketData {
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

export interface ReceiverInfo {
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string;
}

export interface Basket {
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
