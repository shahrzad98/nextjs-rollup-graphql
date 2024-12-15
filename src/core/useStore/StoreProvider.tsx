import StoreContext from './StoreContext';
import { PropsWithChildren, useMemo } from 'react';
import useBasket from './values/useBasket';
import useCustomization from './values/useCustomization';
import { StoreProviderProps } from './types';
import { useSokect } from '../useSokect';

const StoreProvider = (props: PropsWithChildren<StoreProviderProps>) => {
    const basket = useBasket();
    const customization = useCustomization(props.customization);
    useSokect();

    const value = useMemo(() => ({ basket, customization }), [basket, customization]);

    return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>;
};

export default StoreProvider;
