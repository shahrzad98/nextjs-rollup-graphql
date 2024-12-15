import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import useStore from '../useStore/useStore';
import { VOUCHER_CHECK } from '../../apollo/mutations';
import { Discount, DiscountCode } from './types';

const useDiscountCode = (): DiscountCode => {
    const [checkDiscountCode, { loading }] = useMutation(VOUCHER_CHECK);

    const [error, setError] = useState<ApolloError>({});
    const [discount, setDiscount] = useState<Discount>({
        amount: 0,
        code: '',
        id: '',
        limit: 0,
        type: 'percent',
        totalCost: 0,
    });
    const [code, setCode] = useState<string>('');
    const { basket } = useStore();

    useEffect(() => {
        basket.handleUpdateLocalBasket({ discount: '' });
    }, []);

    const handleSubmitDiscountCode = async () => {
        if (!code.length || loading) return;
        setError({});
        await checkDiscountCode({
            variables: {
                content: { code },
            },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            onError(e) {
                setError(apolloError(e));
                setDiscount({
                    ...discount,
                    amount: 0,
                    id: '',
                    limit: 0,
                    type: 'percent',
                });
            },
            onCompleted(d) {
                const voucherCheck = d.customer?.voucherCheck;
                const totalCost = basket.data.items.reduce<number>((previousValue, currentValue) => {
                    return previousValue + currentValue.cost * currentValue.amount;
                }, 0);
                const amount =
                    voucherCheck?.voucher_type_display === 'percent'
                        ? (voucherCheck.amount ?? 0) / 100
                        : voucherCheck?.amount ?? 0;
                const discount: Discount = {
                    limit: voucherCheck?.limit ?? 0,
                    amount: amount,
                    type: voucherCheck?.voucher_type_display as Discount['type'],
                    code: voucherCheck?.code ?? '',
                    id: voucherCheck?.id ?? '',
                    totalCost:
                        voucherCheck?.voucher_type_display === 'percent'
                            ? totalCost * amount > (voucherCheck?.limit ?? 0)
                                ? voucherCheck.limit ?? 0
                                : Math.round(Math.floor(totalCost * amount))
                            : amount,
                };
                if (discount.type === 'cash' && discount.limit > totalCost) {
                    setError({ detail: 'limit greater than total cost' });
                    setDiscount({
                        ...discount,
                        amount: 0,
                        id: '',
                        limit: 0,
                        type: 'percent',
                    });
                } else {
                    setDiscount(discount);
                    if (d.customer?.voucherCheck?.id)
                        basket.handleUpdateLocalBasket({ discount: d.customer?.voucherCheck.id });
                }
            },
        });
    };
    const handleChangeDiscountCode = (value: string) => {
        setCode(value);
    };
    const handleRemoveDiscountCode = () => {
        setCode('');
        setDiscount({
            amount: 0,
            code: '',
            id: '',
            limit: 0,
            type: 'percent',
            totalCost: 0,
        });
        setError({});
        basket.handleUpdateLocalBasket({ discount: '' });
    };

    return {
        error,
        loading,
        handleSubmitDiscountCode,
        handleRemoveDiscountCode,
        handleChangeDiscountCode,
        discount,
        code,
    };
};

export default useDiscountCode;
