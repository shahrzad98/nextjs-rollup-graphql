import { ApolloError } from '../../apollo';
import { MiniProduct } from '../../utils/useMiniProduct';
import {
    HandleRemoveOrder,
    HandleRePayOrder,
    OrderStatusName,
    HandleRefundOrder,
    HandleSubmitCardToCardPayment,
    HandleUnrecivedOrder,
} from '../useOrders';

export interface OrderDetail {
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

export interface OrderInvoice {
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

export interface OrderItems {
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

export type PaymentMethod = 'GATEWAY' | 'CARD_TO_CARD';

export type OrderState = 'ERROR' | 'SUCCESS';

export interface OrderStatus {
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
