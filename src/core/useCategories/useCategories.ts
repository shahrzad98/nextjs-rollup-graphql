import { useQuery } from '@apollo/client';
import apolloError from '../../apollo/apolloError';
import { useMemo } from 'react';
import { GET_CATEGORIES } from '../../apollo/queries';
import { $Categories, $Category } from './types';

const useCategories = (): $Categories => {
    const { data, loading, error } = useQuery(GET_CATEGORIES, {
        variables: {
            params: {
                has_product: true,
                all: true,
            },
        },
    });

    const categories = useMemo(() => {
        if (!data?.customer.getCategories?.results) return [];
        const newCategories = JSON.parse(JSON.stringify(data.customer.getCategories?.results));
        return newCategories.map((category: $Category) => ({
            ...category,
            children: category.children.map((child) => ({
                ...child,
                link: {
                    href: {
                        pathname: '/products/[[...categoryNames]]',
                        query: {
                            categoryNames: [child.id, child.title?.replace(/ /gi, '-')],
                        },
                    },
                },
            })),
            link: {
                href: {
                    pathname: '/products/[[...categoryNames]]',
                    query: {
                        categoryNames: [category.id, category.title?.replace(/ /gi, '-')],
                    },
                },
            },
        }));
    }, [data]);

    return {
        data: { categories },
        count: data?.customer.getCategories?.count || 0,
        loading,
        error: apolloError(error),
        link: {
            href: {
                pathname: '/products/[[...categoryNames]]',
                query: {
                    categoryNames: [],
                },
            },
        },
    };
};

export default useCategories;
