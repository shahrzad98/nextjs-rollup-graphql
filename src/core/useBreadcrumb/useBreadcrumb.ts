import { useQuery } from '@apollo/client';
import { GET_BREADCRUMB } from '../../apollo/queries';
import { useRouter } from 'next/router';
import apolloError from '../../apollo/apolloError';
import { useMemo } from 'react';
import { BreadcrumbParams, CategoryChild, IBreadcrumb } from './types';

const useBreadcrumb = ({ id, type }: BreadcrumbParams = {}): IBreadcrumb => {
    const { query } = useRouter();

    let _id = id;
    let _type = type;

    if (!_id || !_type) {
        if (query.categoryNames && query.categoryNames?.length) {
            _id = query.categoryNames[0];
            _type = 'CATEGORY';
        } else if (query.product && query.product?.length) {
            _id = query.product[0];
            _type = 'PRODUCT';
        }
    }

    const { data, error, loading } = useQuery(GET_BREADCRUMB, {
        skip: !_id || !_type,
        variables: {
            params: {
                id: _id ?? '0',
                type: _type ?? 'PRODUCT',
            },
        },
    });

    const category = useMemo<CategoryChild | null>(() => {
        if (!data?.customer?.getBreadcrumb) return null;
        const cloneCategory: CategoryChild = { ...data?.customer?.getBreadcrumb };

        return {
            ...cloneCategory,
            child:
                cloneCategory.child && cloneCategory.child?.id
                    ? {
                          ...cloneCategory.child,
                          child:
                              cloneCategory.child.child && cloneCategory.child.child?.id
                                  ? {
                                        ...cloneCategory.child.child,
                                        link: {
                                            href: {
                                                pathname: '/products/[[...categoryNames]]',
                                                query: {
                                                    categoryNames: [
                                                        `${cloneCategory.child.child.id}`,
                                                        cloneCategory.child.child.title?.replace(/ /gi, '-'),
                                                    ],
                                                },
                                            },
                                        },
                                    }
                                  : null,
                          link: {
                              href: {
                                  pathname: '/products/[[...categoryNames]]',
                                  query: {
                                      categoryNames: [
                                          `${cloneCategory.child.id}`,
                                          cloneCategory.child.title?.replace(/ /gi, '-'),
                                      ],
                                  },
                              },
                          },
                      }
                    : null,
            link: {
                href: {
                    pathname: '/products/[[...categoryNames]]',
                    query: {
                        categoryNames: [`${cloneCategory.id}`, cloneCategory.title?.replace(/ /gi, '-')],
                    },
                },
            },
        };
    }, [data]);

    return {
        data: category,
        loading,
        error: apolloError(error),
    };
};

export default useBreadcrumb;
