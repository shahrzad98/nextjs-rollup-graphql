import { ApolloError } from '../../apollo';
import { MiniProduct } from '../../utils/useMiniProduct';
import { Image } from '../useProduct';

export type TFactor = {
    items: IUseReturnedOrderItem[];
    approvedProductsCount: number;
    allReturnedCost: number;
};

export interface IUseReturnedOrderDetail {
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

export interface IUseReturnedOrderInvoice {
    reference_code: string;
    order_reference_code: string;
    created_at: string;
    order_created_at: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    card_number: string;
}

export interface IReturnedItem {
    id: number | string;
    status: number;
    status_display: string;
    reason: string;
    description: string;
    images: Image[];
    reply_reason: string;
    reply_description: string;
    returned_cost: number;
    count: number;
    order_item: any;
    relative_voucher_amount: number;
}

export interface IUseReturnedOrderStatus {
    step: number;
    status_display: string;
    step_description: string;
}
export interface IUseReturnedOrderItem {
    id: number | string;
    reason: string;
    description: string;
    images: Image[];
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
