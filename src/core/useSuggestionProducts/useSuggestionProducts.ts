import { useQuery } from '@apollo/client';
import { GET_SUGGESTION_PRODUCTS } from '../../apollo/queries';
import apolloError from '../../apollo/apolloError';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MiniProduct, useMiniProduct } from '../../utils/useMiniProduct';

const useSuggestionProducts = () => {
    const { query } = useRouter();

    const { data, loading, error } = useQuery(GET_SUGGESTION_PRODUCTS, {
        variables: {
            productId: query.product?.length ? query.product[0] : '0',
        },
        skip: !query.product || !query.product?.length,
    });

    const products = useMemo<MiniProduct[]>(
        () => data?.customer.getSuggestionProducts?.results.map((product) => useMiniProduct(product)) || [],
        [data],
    );

    return {
        data: products,
        loading,
        error: apolloError(error),
    };
};

export default useSuggestionProducts;
