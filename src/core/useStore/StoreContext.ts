import { createContext } from 'react';
import { StoreContext } from './types';

const StoreContext = createContext({} as StoreContext);
StoreContext.displayName = 'StoreContext';
export default StoreContext;
