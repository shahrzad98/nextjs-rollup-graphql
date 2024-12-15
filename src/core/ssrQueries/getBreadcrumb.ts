import { GET_BREADCRUMB } from '../../apollo/queries';
import { BreadcrumbParams } from '../useBreadcrumb/types';
import { SSRQuery } from './types';

const getBreadcrumb: SSRQuery =
    ({ id, type }: BreadcrumbParams = {}) =>
    async (apolloClient, ctx) => {
        if (typeof ctx === 'undefined') throw new Error('Context is required!');
        let _id = id;
        let _type = type;

        if (!_id || !_type) {
            if (ctx.query.categoryNames && ctx.query.categoryNames?.length) {
                _id = ctx.query.categoryNames[0];
                _type = 'CATEGORY';
            } else if (ctx.query.product && ctx.query.product?.length) {
                _id = ctx.query.product[0];
                _type = 'PRODUCT';
            }
        }

        if (!_id || !_type) return undefined;
        // if (!_id || !_type) throw new Error('[Server]: Breadcrumb params ( id and type ) is required!');
        const data = await apolloClient.query({
            query: GET_BREADCRUMB,
            variables: {
                params: {
                    id: _id,
                    type: _type,
                },
            },
            errorPolicy: 'ignore',
        });

        return data;
    };

export default getBreadcrumb;
