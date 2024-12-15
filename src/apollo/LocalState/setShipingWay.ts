import { makeVar } from '@apollo/client';
import { Shipping } from '../../core';

export const shpingVar = makeVar<Shipping[]>([]);
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
export const setShpingData = (data: Shipping[]) => {
    if (!isEmpty(data)) {
        shpingVar(data);
    }
};
