import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../apollo/queries';
import useProductsFilterParams from './useProductsFilterParams';
import { useRouter } from 'next/router';
import apolloError from '../../apollo/apolloError';
import useProductsSearchParams from './useProductsSearchParams';
import { MiniProduct, useMiniProduct } from '../../utils/useMiniProduct';
import { usePagination } from '../../utils/usePagination';
import { Products, ProductSearchParams } from './types';
import handleCreateOptionValue from '../../utils/handleCreateOptionValue';
import { useStore } from '../useStore';

const limit = 12;

const useProducts = (customQuery: Partial<ProductSearchParams> = {}): Products => {
    const { query: q } = useRouter();
    const query = { ...q, ...customQuery };
    const [offset, setOffset] = useState<number>(0);
    const { basket } = useStore();

    const searchParams = useMemo(() => useProductsSearchParams(query, limit), [query]);

    const filterParams = useProductsFilterParams(!!Object.keys(customQuery).length);
    const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: {
            params: searchParams,
        },
    });

    const pagination = usePagination(data?.customer?.getProducts, searchParams, limit);

    const handleLoadMore = async () => {
        if (error) return;
        await fetchMore({
            variables: {
                params: {
                    ...searchParams,
                    offset: offset + limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getProducts: {
                            ...previousResult.customer.getProducts,
                            count: fetchMoreResult.customer.getProducts.count,
                            next: fetchMoreResult.customer.getProducts.next,
                            results: [
                                ...previousResult.customer.getProducts.results,
                                ...fetchMoreResult.customer.getProducts.results,
                            ],
                        },
                    },
                };
            },
        });
    };

    const products = useMemo<MiniProduct[]>(
        () => data?.customer?.getProducts?.results.map((product: any) => useMiniProduct(product)) || [],
        [data],
    );
    const handleAddToBasket = (id) => {
        const miniProduct = products.find((P) => P.id === id);
        if (miniProduct) {
            basket.handleAddToBasket({
                image: { image: miniProduct.images[0] || undefined },
                amount: 1,
                product_label: miniProduct.label,
                bonus_value: 0,
                has_loyalty_gift: (miniProduct.loyalty_gift || 0) > 0,
                product_id: miniProduct.id,
                option_values: handleCreateOptionValue(miniProduct.optionValues || []),
                online_cost: miniProduct.cost,
                online_primary_cost: miniProduct.primaryCost,
                variant_id: miniProduct.variantId ? parseInt(miniProduct.variantId) : '',
                variant_name: miniProduct.label,
                orderable_count: miniProduct.orderable_count,
                tax: miniProduct.tax ? miniProduct.tax : 0,
                single_tax: miniProduct.singleTax,
            });
        }
    };

    return {
        data: {
            products,
            hotOfferLink: '/hot-offer',
        },
        ...(!Object.keys(customQuery).length && { filterParams }),
        loading,
        error: apolloError(error),
        handleLoadMore,
        handleAddToBasket,
        hasMore: !!data?.customer.getProducts.next,
        count: data?.customer.getProducts.count ?? 0,
        pagination,
        next: data?.customer.getProducts.next,
    };
};

export default useProducts;
