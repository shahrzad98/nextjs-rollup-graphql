import { OrderStatusName } from './types';

const orderStatusName = (orderId: number, prevOrderId: number): OrderStatusName => {
    switch (orderId) {
        case 14:
            return 'WAITING_FOR_APPROVAL';
        case 15:
            return 'WAITING_FOR_PAYMENT';
        case 16:
            return 'WAITING_FOR_PAYMENT_APPROVAL';
        case 1:
            return 'UNPAID';
        case 2:
            return 'PAID';
        case 3:
            return 'IN_PREPARING';
        case 4:
            return 'SENT';
        case 5:
            return 'RECEIVED';
        case 8:
            return 'EXPIRED';
        case 10:
            return 'OVERTIME_ORDER_BY_MERCHANT';
        case 11:
            return 'CANCELED_ORDER_BY_MERCHANT';
        case 12:
            switch (prevOrderId) {
                case 11:
                    return 'CANCELED_ORDER_BY_MERCHANT_SETTLED';
                case 14:
                    return 'CANCELED_REQUEST_BY_MERCHANT';
            }
            break;
        case 13:
            switch (prevOrderId) {
                case 10:
                    return 'OVERTIME_ORDER_BY_MERCHANT_SETTLED';
                case 14:
                    return 'OVERTIME_REQUEST_BY_MERCHANT';
                case 15:
                    return 'OVERTIME_PAYMENT_BY_CUSTOMER';
            }
            break;
        case 17:
            return 'UNRECEIVED';
    }
    return 'UNPAID';
};

export default orderStatusName;
