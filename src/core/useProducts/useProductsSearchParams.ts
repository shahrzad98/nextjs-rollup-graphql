import { ProductSearchParams } from './types';

const useProductsSearchParams = (query: any, limit = 12): Partial<ProductSearchParams> => {
    const {
        search,
        custom_option_values,
        categoryNames,
        ordering,
        minimum_cost,
        maximum_cost,
        has_discount,
        has_stock,
        page,
        is_hot_offer,
        product_ids,
    } = query;

    return {
        ...(search && { search: decodeURIComponent(search) }),
        ...(custom_option_values
            ? typeof custom_option_values === 'string'
                ? { custom_option_values: [custom_option_values] }
                : { custom_option_values }
            : {}),
        ...(Array.isArray(categoryNames) && categoryNames?.length && { category: query.categoryNames[0] }),
        ...(ordering && { ordering }),
        ...(+minimum_cost && { minimum_cost: +minimum_cost }),
        ...(+maximum_cost && { maximum_cost: +maximum_cost }),
        ...(has_discount === 'true' && { has_discount: true }),
        ...(has_stock === 'true' && { has_stock: true }),
        offset: page ? (+page - 1) * 12 : 0,
        limit,
        ...(is_hot_offer && { is_hot_offer }),
        ...(product_ids && { product_ids }),
    };
};

export default useProductsSearchParams;
