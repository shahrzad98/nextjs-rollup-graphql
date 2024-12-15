import { Basket } from './values/types';
import { Customization } from '../initializeApp';

export interface StoreProviderProps {
    customization: Customization;
}
export interface StoreContext {
    basket: Basket;
    customization: any;
}
