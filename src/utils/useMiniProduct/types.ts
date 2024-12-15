import { Link } from '../../sharedInterfaces/Link';
import { OptionValue } from '../handleCreateOptionValue';

type TColor = { __typename: string; color_code: string; id: string | number };
export interface MiniProduct {
    id: string;
    variantId: string;
    orderItemId: string;
    image: string;
    images: string[];
    /**
     * Product name
     */
    label: string;
    /**
     * Cost before discount
     */
    primaryCost: number;
    loyalty_gift: number | undefined;
    link: Link;
    /**
     * Cost after discount
     */
    cost: number;
    optionValues: OptionValue[];
    amount: number;
    isHotOffer: boolean;
    hotOfferExpireDate?: Date;
    discountPercent: number;
    orderable_count: number;
    colors: TColor[];
    singleCost: number;
    tax: boolean;
    singleTax: number;
}
