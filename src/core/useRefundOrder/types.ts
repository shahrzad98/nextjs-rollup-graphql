import { MiniProduct } from '../../utils/useMiniProduct';
import { OrderDetail } from '../useOrderDetail';
import { Info } from '../useUser';

export type TSelectableOrder = {
    product: MiniProduct;
    handleSelectItem: () => void;
    selected: boolean;
    selectedID: string;
};

export interface IRefundedValueOrder {
    reason: string | null;
    description: string | null;
    images: string[];
    orderItemId: string;
}

export interface IUseRefundOrder extends Omit<OrderDetail, 'invoice' | 'items' | 'orderId'> {
    step: number;
    handleNextStep: (reasonValues: IRefundedValueOrder[]) => void;
    selectableItems: TSelectableOrder[];
    reasonItems: string[];
    selectedItems: MiniProduct[];
    info: IChangeableUserInformations;
    navigateBack: () => void;
    navigateToOrdersPage: () => void;
    navigateToReturnedOrderPage: () => void;
}

export type TUserInformations = 'last_name' | 'first_name' | 'phone_number';

export interface IChangeableUserInformations extends Pick<Info, TUserInformations> {
    handleChangeCardNumber: (value: string) => void;
    card_number: string;
}

export type TPickOrderDetail = 'error' | 'loading' | 'data';

export interface IUseSelectableOrder extends Pick<OrderDetail, TPickOrderDetail> {
    selectableItems: TSelectableOrder[];
    createSelectedItems: () => void;
    selectedItems: MiniProduct[];
}
