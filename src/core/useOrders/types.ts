import { ApolloError } from '../../apollo';
import { Link } from '../../sharedInterfaces/Link';

export interface Orders {
    data: {
        statusCount: OrdersStatusCount;
        ordersList: OrdersList;
    };
    loading: boolean;
    error: ApolloError;
}

export type HandleSubmitCardToCardPayment = (orderId: string, image: File) => Promise<void>;
export type HandleRefundOrder = (orderId: string) => void;
export type HandleRePayOrder = (orderId: string) => Promise<void>;
export type HandleRemoveOrder = (orderId: string) => Promise<void>;
export type HandleUnrecivedOrder = (orderId: string, recivedStatus: 5 | 17) => Promise<void>;
export type OrderActionTypes =
    | 'CARD_TO_CARD_PAYMENT'
    | 'REMOVE_ORDER'
    | 'RE_PAY_ORDER'
    | 'UNRECEIVED_ORDER'
    | 'RECEIVED_ORDER';

export interface UseOrderActions {
    handleSubmitCardToCardPayment: HandleSubmitCardToCardPayment;
    handleRemoveOrder: HandleRemoveOrder;
    handleRePayOrder: HandleRePayOrder;
    handleUnreceivedOrder: HandleUnrecivedOrder;
    error: ApolloError;
    loading: boolean;
}
export type OrderStatusName =
    | 'UNPAID'
    | 'PAID'
    | 'WAITING_FOR_APPROVAL'
    | 'WAITING_FOR_PAYMENT'
    | 'WAITING_FOR_PAYMENT_APPROVAL'
    | 'IN_PREPARING'
    | 'SENT'
    | 'RECEIVED'
    | 'UNRECEIVED'
    | 'EXPIRED'
    | 'OVERTIME_ORDER_BY_MERCHANT'
    | 'CANCELED_ORDER_BY_MERCHANT'
    | 'CANCELED_ORDER_BY_MERCHANT_SETTLED'
    | 'CANCELED_REQUEST_BY_MERCHANT'
    | 'OVERTIME_ORDER_BY_MERCHANT_SETTLED'
    | 'OVERTIME_REQUEST_BY_MERCHANT'
    | 'OVERTIME_PAYMENT_BY_CUSTOMER';

export interface Order {
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

export interface OrdersList {
    orders: Order[];
    error: ApolloError;
    loading: boolean;
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
}

export type OrdersSearchParamsStatuses = 'PROCESSING' | 'RECEIVED' | 'RETURNED' | 'CANCELED' | 'WAITING_FOR_PAYMENT';

export interface OrdersSearchParams {
    status: OrdersSearchParamsStatuses;
    offset: number;
}

export interface StatusItem {
    count: number;
    selected: boolean;
}

export interface Statuses {
    inProgress: StatusItem;
    waitingForPayment: StatusItem;
    received: StatusItem;
    returned: StatusItem;
    canceled: StatusItem;
}

export interface OrdersStatusCount {
    statuses: Statuses;
    handleChangeTab: (status: string) => Promise<void>;
    loading: boolean;
    error: ApolloError;
}
