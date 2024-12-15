import useStore from '../useStore/useStore';
import { useMemo } from 'react';
import { BasketDescription } from './types';

const useDescription = (): BasketDescription => {
    const { basket } = useStore();

    const handleChangeDescription = (value: string) => {
        basket.handleUpdateLocalBasket({ description: value });
    };

    return useMemo<BasketDescription>(() => {
        return {
            description: basket.data.description,
            handleChangeDescription,
        };
    }, [basket.data.description]);
};

export default useDescription;
