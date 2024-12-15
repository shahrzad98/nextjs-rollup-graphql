import persianFullDate from '../../utils/persianFullDate';
import { OrderStatusName } from './types';

const orderDescription = (order: any, statusName: OrderStatusName, type: 'SUMMERY' | 'FULL' = 'FULL') => {
    const start = order?.approximate_sending_date?.start ? new Date(order.approximate_sending_date.start) : new Date(),
        end = order?.approximate_sending_date?.end ? new Date(order.approximate_sending_date.end) : new Date(),
        receivedAt = order?.received_at ? new Date(order?.received_at) : new Date(),
        expiredAt = order?.expired_at ? new Date(order?.expired_at) : new Date();

    const now = new Date().getTime();
    const expireIn = expiredAt.getTime();
    const remainedSecond = (expireIn - now) / 1000;
    const remainedObject = {
        h: Math.floor(remainedSecond / (60 * 60)) || undefined,
        m: Math.floor((remainedSecond % (60 * 60)) / 60) || undefined,
    };
    const diff = `${remainedObject.h ? `${remainedObject.h} ساعت ${remainedObject.m ? 'و' : ''} ` : ''} ${
        remainedObject.m ? `${remainedObject.m} دقیقه ` : ''
    }`;

    const fullDescription: Record<OrderStatusName, string> = {
        WAITING_FOR_APPROVAL:
            'درخواست شما ثبت شد برای پرداخت و ثبت نهایی سفارش لازم است فروشگاه درخواست شما را تایید کند.',
        WAITING_FOR_PAYMENT:
            'فروشگاه سفارش شما را تایید کرد، برای ثبت سفارش 4 ساعت فرصت دارید مبلغ را کارت به کارت و تصویر آن را ارسال کنید.',
        WAITING_FOR_PAYMENT_APPROVAL:
            'اطلاعات پرداخت شما ارسال شد برای ثبت نهایی سفارش لازم است فروشگاه صحت پرداخت شما را تایید کند.',
        IN_PREPARING: `سفارشات شما در حال آماده سازی است و در بازه ${persianFullDate(start)} الی ${persianFullDate(
            end,
        )} به دستتان میرسد`,
        SENT: `سفارشات شما ارسال شد و در بازه ${persianFullDate(start)} الی ${persianFullDate(end)} به دستتان میرسد`,
        RECEIVED: `سفارش شما در روز ${persianFullDate(
            receivedAt,
        )} تحویل داده شده است. در صورتی که سفارش به دست شما نرسیده به ما اطلاع دهید.`,
        UNRECEIVED:
            'ما در حال بررسی مشکل هستیم. اگر سفارش را دریافت کردید به ما اطلاع دهید، در غیر اینصورت میتوانید برای پیگیری بیشتر با فروشگاه تماس بگیرید.',
        OVERTIME_REQUEST_BY_MERCHANT: 'سفارش شما به دلیل عدم تایید فروشگاه در زمان تعیین شده، منقضی شد.',
        OVERTIME_PAYMENT_BY_CUSTOMER: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        OVERTIME_ORDER_BY_MERCHANT:
            'پرداخت شما به علت عدم تایید فروشگاه در مدت مشخص منقضی شده و مبلغ پرداختی به حساب شما بازگردانده می‌شود. برای اطلاعات بیشتر میتوانید با فروشگاه تماس بگیرید.',
        OVERTIME_ORDER_BY_MERCHANT_SETTLED:
            'پرداخت شما به علت عدم تایید فروشنده در مدت مشخص منقضی شده و مبلغ پرداختی به حساب شما بازگردانده می‌شود.',
        CANCELED_REQUEST_BY_MERCHANT: 'سفارش شما به دلیل عدم تایید پذیرنده در زمان تعیین شده، منقضی شد.',
        CANCELED_ORDER_BY_MERCHANT:
            'پرداخت شما به علت عدم تایید فروشنده رد شده و مبلغ پرداختی به حساب شما بازگردانده می‌شود. ',
        CANCELED_ORDER_BY_MERCHANT_SETTLED:
            'پرداخت شما توسط فروشنده رد شد. برای اطلاعات بیشتر میتوانید با فروشنده تماس بگیرید.',
        UNPAID: 'این سفارش پس از 70 دقیقه به صورت خودکار حذف می‌شود، برای ثبت آن قبل از پایان زمان هزینه سفارش را پرداخت کنید.',
        EXPIRED: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        PAID: '',
    };

    const summeryDescription: Record<OrderStatusName, string> = {
        WAITING_FOR_APPROVAL:
            'درخواست شما ثبت شد برای پرداخت و ثبت نهایی سفارش لازم است فروشنده درخواست شما را تایید کند.',
        WAITING_FOR_PAYMENT: `برای ثبت سفارش ${diff} فرصت دارید مبلغ را کارت به کارت و تصویر آن را ارسال کنید.`,
        WAITING_FOR_PAYMENT_APPROVAL:
            'اطلاعات پرداخت شما ارسال شد برای ثبت نهایی سفارش لازم است فروشنده صحت پرداخت شما را تایید کند.',
        IN_PREPARING: 'سفارش شما در حال آماده سازی برای ارسال است.',
        SENT: `سفارش شما برای ارسال،${order?.shipping?.name ? ` به ${order.shipping.name}` : ''} تحویل داده شد.`,
        RECEIVED: 'سفارش شما تحویل داده شده است.',
        UNRECEIVED: 'ما در حال بررسی مشکل هستیم.',
        OVERTIME_REQUEST_BY_MERCHANT: 'سفارش شما به دلیل عدم تایید فروشگاه در زمان تعیین شده، منقضی شد.',
        OVERTIME_PAYMENT_BY_CUSTOMER: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        OVERTIME_ORDER_BY_MERCHANT: 'سفارش شما تایید نشد.',
        OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'سفارش شما تایید نشد.',
        CANCELED_REQUEST_BY_MERCHANT: 'سفارش شما تایید نشد.',
        CANCELED_ORDER_BY_MERCHANT: 'سفارش شما تایید نشد.',
        CANCELED_ORDER_BY_MERCHANT_SETTLED: 'سفارش شما تایید نشد.',
        UNPAID: `شما برای ثبت این سفارش تنها ${diff} دقیقه فرصت دارید ﻣﺒﻠﻎ آن را ﭘﺮداﺧﺖ ﮐﻨﯿﺪ.`,
        EXPIRED: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        PAID: '',
    };

    return type === 'FULL' ? fullDescription[statusName] : summeryDescription[statusName];
};

export default orderDescription;
