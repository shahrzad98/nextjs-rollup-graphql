import { useQuery } from '@apollo/client';
import { GET_PRODUCT_FILTER_PARAMS } from '../../apollo/queries';
import { useMemo, useState } from 'react';
import Router, { useRouter } from 'next/router';
import useDidUpdateEffect from '../../utils/useDidUpdateEffect';
import useProductsSearchParams from './useProductsSearchParams';
import { Categories, Cost, FilterParams, Ordering, OtherFilters, Search, Specifications } from './types';
import apolloError from '../../apollo/apolloError';

const useProductsFilterParams = (skip: boolean): FilterParams => {
    const { pathname, replace, query } = useRouter();

    const searchParams = useMemo(() => useProductsSearchParams(query), [query]);

    const { data, loading, error } = useQuery(GET_PRODUCT_FILTER_PARAMS, {
        skip,
        variables: {
            params: searchParams.category ? { category: searchParams.category } : {},
        },
    });

    const [_search, setSearch] = useState<string>(searchParams.search ?? '');
    const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>(searchParams.custom_option_values ?? []);
    const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category ?? '');
    const [selectedHasDiscount, setSelectedHasDiscount] = useState<boolean>(!!searchParams.has_discount);
    const [selectedHasStock, setSelectedHasStock] = useState<boolean>(!!searchParams.has_stock);
    const [selectedCost, setSelectedCost] = useState<[number, number]>([
        searchParams?.minimum_cost ?? 0,
        searchParams?.maximum_cost ?? 0,
    ]);

    const orderingOptions = [
        {
            key: 'mostSale',
            value: 'MOST_SALE',
        },
        {
            key: 'costMin',
            value: 'COST_MIN',
        },
        {
            key: 'costMax',
            value: 'COST_MAX',
        },
        {
            key: 'newest',
            value: 'NEWEST',
        },
    ];

    useDidUpdateEffect(() => {
        const timeout = setTimeout(() => {
            const _query = { ...query };
            delete _query.page;

            replace(
                {
                    pathname,
                    query: {
                        ..._query,
                        categoryNames: _query.categoryNames ? _query.categoryNames : [],
                        page: 1,
                        search: encodeURIComponent(_search),
                    },
                },
                undefined,
                { shallow: true },
            );
        }, 1000);
        return () => clearTimeout(timeout);
    }, [_search]);

    useDidUpdateEffect(() => {
        setSelectedOptionValues(searchParams.custom_option_values ?? []);
        setSelectedHasDiscount(!!searchParams.has_discount);
        setSelectedHasStock(!!searchParams.has_stock);
        setSelectedCategory(searchParams.category ?? '');
        setSelectedCost([searchParams?.minimum_cost || 0, searchParams?.maximum_cost || 0]);
    }, [searchParams]);

    const handleSubmitCategory = () => {
        const foundCategory = flatCategories.find((category) => category.value === selectedCategory);

        replace(
            {
                pathname,
                query: {
                    categoryNames: foundCategory ? [foundCategory.value, foundCategory.key?.replace(/ /gi, '-')] : [],
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleChangeCategory = async (categoryId: string) => {
        const foundCategory = flatCategories.find((category) => category.value === categoryId);
        setSelectedCategory(foundCategory?.value ?? '');
    };

    const handleSubmitOptionValues = () => {
        const _query = { ...Router.query };

        delete _query.page;
        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    custom_option_values: selectedOptionValues,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleChangeOptionValues = (value: string) => {
        const _selectedOptionValues = [...selectedOptionValues];
        const foundIndex = _selectedOptionValues.indexOf(value);
        if (foundIndex !== -1) {
            _selectedOptionValues.splice(foundIndex, 1);
        } else {
            _selectedOptionValues.push(value);
        }
        setSelectedOptionValues(_selectedOptionValues);
    };

    const handleSubmitCost = () => {
        const _query = { ...Router.query };
        delete _query.page;

        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    ...(selectedCost[0] && { minimum_cost: selectedCost[0] }),
                    ...(selectedCost[1] && { maximum_cost: selectedCost[1] }),
                },
            },
            undefined,
            { shallow: true },
        );
    };
    const handleChangeCost = (arg: [number, number]) => {
        setSelectedCost(arg);
    };

    const handleChangeOrdering = (value: string) => {
        const _query = { ...Router.query };
        delete _query.page;

        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    ordering: value,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleChangeDiscount = async () => {
        let _hasDiscount = false;
        setSelectedHasDiscount((prevState) => {
            _hasDiscount = !prevState;
            return !prevState;
        });

        const _query = { ...Router.query };
        delete _query.page;
        delete _query.has_discount;

        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    ...(_hasDiscount ? { has_discount: true } : {}),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleChangeHasStock = () => {
        let _hasStock = false;

        setSelectedHasStock((prevState) => {
            _hasStock = !prevState;
            return !prevState;
        });

        const _query = { ...Router.query };
        delete _query.page;
        delete _query.has_stock;

        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    ...(_hasStock ? { has_stock: true } : {}),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleSubmitOtherFilters = async () => {
        const _query = { ...Router.query };
        delete _query.page;
        delete _query.has_discount;
        delete _query.has_stock;

        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    ...(selectedHasDiscount ? { has_discount: true } : {}),
                    ...(selectedHasStock ? { has_stock: true } : {}),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleClearAllFilters = () => {
        replace(
            {
                pathname,
                query: {
                    categoryNames: query.categoryNames ? query.categoryNames : [],
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleClear = (paramName: string, id?: string) => {
        const _query = JSON.parse(JSON.stringify(Router.query));

        if (paramName === 'custom_option_values' && id) {
            if (typeof _query[paramName] === 'string') {
                delete _query[paramName];
            }
            if (Array.isArray(_query[paramName])) {
                const foundIndex = _query[paramName].indexOf(id);
                if (foundIndex !== -1) {
                    _query[paramName].splice(foundIndex, 1);
                }
            }
        } else if (paramName === 'cost') {
            delete _query['minimum_cost'];
            delete _query['maximum_cost'];
        } else {
            delete _query[paramName];
        }

        delete _query.page;

        replace(
            {
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const ordering = useMemo<Ordering>(() => {
        return {
            options: orderingOptions.map((i) => ({
                ...i,
                handleChange: () => handleChangeOrdering(i.value),
                isSelected: searchParams.ordering === i.value,
            })),
        };
    }, [searchParams.ordering]);

    const search = useMemo<Search>(() => {
        return {
            value: _search,
            handleChange: (value) => setSearch(value),
        };
    }, [_search]);

    const cost = useMemo<Cost>(() => {
        const _cost: Cost = {
            value: selectedCost,
            initialValue: [0, 0],
            handleChange: handleChangeCost,
            handleSubmit: handleSubmitCost,
        };

        if (data?.customer?.productFiltering) {
            const {
                customer: { productFiltering: params },
            } = data;
            _cost.initialValue = [params.minimum_cost, params.maximum_cost];
        }

        return _cost;
    }, [data, selectedCost]);

    const categories = useMemo<Categories>(() => {
        const _categories: Categories = {
            handleSubmit: handleSubmitCategory,
            options: [],
        };

        if (data?.customer?.productFiltering) {
            const {
                customer: { productFiltering: params },
            } = data;

            /*TODO: uncomment this code if category does not return from product filtering query but category is selected otherwise leave this alone

            if (!params.custom_categories.length && query.categoryNames?.length === 2) {
                const _categoryId: string = query.categoryNames[0];
                const _categoryTitle: string = query.categoryNames[1];

                _categories.options.push({
                    key: _categoryTitle,
                    value: _categoryId,
                    isSelected: selectedCategory === _categoryId,
                    categories: [],
                    handleChange: () => handleChangeCategory(_categoryId),
                });
            } else
            */

            _categories.options = params.custom_categories.map((i) => ({
                key: i.title,
                value: i.id,
                isSelected: selectedCategory.includes(i.id),
                categories: i.child_categories.map((j) => ({
                    key: j.title,
                    value: j.id,
                    isSelected: selectedCategory.includes(j.id),
                    categories: [],
                    handleChange: () => handleChangeCategory(j.id),
                })),
                handleChange: () => handleChangeCategory(i.id),
            }));
        }

        return _categories;
    }, [data, selectedCategory]);

    const flatCategories = useMemo(() => {
        let _allCategories = [...categories.options];
        categories.options.forEach((item) => {
            if (item?.categories) _allCategories = _allCategories.concat([...item.categories]);
        });
        return _allCategories;
    }, [categories]);

    const specifications = useMemo<Specifications[]>(() => {
        const _specifications: Specifications[] = [];

        if (data?.customer?.productFiltering) {
            const {
                customer: { productFiltering: params },
            } = data;

            if (params.colors.length) {
                _specifications.push({
                    name: 'رنگ',
                    handleSubmit: handleSubmitOptionValues,
                    options: params.colors.map((i) => {
                        const [key, value, colorCode] = i;
                        return {
                            key,
                            name: 'رنگ',
                            value,
                            colorCode,
                            isSelected: selectedOptionValues.includes(value),
                            handleChange: () => handleChangeOptionValues(value),
                        };
                    }),
                });
            }
            params.options.map((i) => {
                _specifications.push({
                    name: i.name,
                    handleSubmit: handleSubmitOptionValues,
                    options: i.option_values.map(([key, value]) => ({
                        key,
                        value,
                        name: i.name,
                        isSelected: selectedOptionValues.includes(value),
                        handleChange: () => handleChangeOptionValues(value),
                    })),
                });
            });
        }

        return _specifications;
    }, [data, selectedOptionValues]);

    const otherFilters = useMemo<OtherFilters>(() => {
        return {
            has_discount: {
                value: selectedHasDiscount,
                handleChange: handleChangeDiscount,
                handleSubmit: handleSubmitOtherFilters,
            },
            in_stock: {
                value: selectedHasStock,
                handleChange: handleChangeHasStock,
                handleSubmit: handleSubmitOtherFilters,
            },
        };
    }, [selectedHasDiscount, selectedHasStock]);

    const selectedFilters = useMemo(() => {
        const _selectedCost =
            query.minimum_cost || query.maximum_cost
                ? [
                      {
                          name: `از ${
                              query.minimum_cost && +query.minimum_cost ? query.minimum_cost : cost.initialValue[0]
                          } تا ${
                              query.maximum_cost && +query.maximum_cost ? query.maximum_cost : cost.initialValue[1]
                          }`,
                          handleClear: () => handleClear('cost'),
                      },
                  ]
                : [];

        const _selectedSpecifications = specifications
            .map(({ options }) => options)
            .flat()
            .filter(({ isSelected, value }) => isSelected && query.custom_option_values?.includes(value))
            .map(({ name, key, value }) => ({
                name: `${name} ${key}`,
                handleClear: () => handleClear('custom_option_values', value),
            }));

        const _selectedOtherFilters: any = [];

        if (otherFilters.in_stock.value) {
            _selectedOtherFilters.push({
                name: 'فقط کالاهای موجود',
                handleClear: () => handleClear('has_stock'),
            });
        }
        if (otherFilters.has_discount.value) {
            _selectedOtherFilters.push({
                name: 'فقط کالاهای تخفیف دار',
                handleClear: () => handleClear('has_discount'),
            });
        }

        return [..._selectedCost, ..._selectedSpecifications, ..._selectedOtherFilters];
    }, [cost, query.custom_option_values, otherFilters, query.minimum_cost, query.maximum_cost]);

    const updateStates = () => {
        setSelectedOptionValues(searchParams.custom_option_values ?? []);
        setSelectedHasDiscount(!!searchParams.has_discount);
        setSelectedHasStock(!!searchParams.has_stock);
        setSelectedCategory(searchParams.category ?? '');
        setSelectedCost([searchParams?.minimum_cost || 0, searchParams?.maximum_cost || 0]);
    };

    return {
        search,
        specifications,
        categories,
        cost,
        ordering,
        others: otherFilters,
        selectedFilters,
        handleClearAllFilters,
        updateStates,
        loading,
        error: apolloError(error),
    };
};

export default useProductsFilterParams;
