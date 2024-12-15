import { useMutation, useQuery } from '@apollo/client';
import { GET_THEME_CUSTOMIZATION } from '../../../apollo/queries';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Customization } from '../../initializeApp';
import cacheIntegration from '../../../utils/cacheIntegration';
import extractSchemaValue from '../../useCustomization/extractSchemaValue';
import apolloError, { ApolloError } from '../../../apollo/apolloError';
import { UPDATE_THEME_CUSTOMIZATION } from '../../../apollo/mutations';

const useCustomization = (customization: Customization): any => {
    const { data: d } = useQuery(GET_THEME_CUSTOMIZATION, {
        variables: {
            themeName: customization?.config?.themeName,
        },
    });
    const lastChanges = useRef<any>({});

    const [updateThemeCustomization, { loading: publishLoading }] = useMutation(UPDATE_THEME_CUSTOMIZATION);

    const initialCustomizationSchema = useMemo(() => {
        const queryData = d?.customer?.getThemeCustomization?.data || {};
        let schema: any = {};
        const localData = customization.schema;

        for (const model in localData) {
            for (const field in localData[model]) {
                if (!Object.keys(localData[model][field]).length) {
                    throw new Error(
                        `"localData.${model}.${field}": Schema is not valid!\n ${JSON.stringify(
                            queryData[model],
                            null,
                            2,
                        )}`,
                    );
                }

                const value = queryData?.current?.[model]
                    ? queryData?.current?.[model]?.[field]
                        ? queryData?.current[model]?.[field]?.value
                        : localData?.[model]?.[field]?.defaultValue
                    : localData?.[model]?.[field]?.defaultValue;

                schema = {
                    ...schema,
                    [model]: {
                        ...schema[model],
                        [field]: {
                            handleLoadDefault: () =>
                                handleLoadDefault([model, field], localData[model][field]?.defaultValue),
                            type: localData[model][field]?.type,
                            value,
                            ...(localData[model][field]?.type === 'string' && {
                                handleChangeString: (value: string) => handleChangeString([model, field], value),
                            }),
                            ...(localData[model][field]?.type === 'boolean' && {
                                handleChangeBoolean: () => handleChangeBoolean([model, field]),
                            }),
                            ...(localData[model][field]?.type === 'number' && {
                                handleChangeNumber: (value: number) => handleChangeNumber([model, field], value),
                            }),
                            ...(localData[model][field]?.options?.length && {
                                options:
                                    localData[model][field]?.type === 'checkbox'
                                        ? localData[model][field]?.options?.map((option) => ({
                                              ...option,
                                              handleChange: () => handleChangeCheckbox([model, field], option.value),
                                          }))
                                        : localData[model][field]?.options,
                            }),
                            ...(localData[model][field]?.options?.length &&
                                localData[model][field]?.type === 'object[]' && {
                                    handleAddNewItem: () => addNewItem([model, field]),
                                    handleDeleteItem: (id: number) => deleteArrayItem([model, field], id),
                                    handleChange: (id: number, key: string, value: string | number | boolean) =>
                                        handleChangeObjItem([model, field], id, key, value),
                                }),
                            ...(localData[model][field]?.type === 'string[]' && {
                                handleAddToArray: (id: string) => addItemToArray([model, field], id),
                                handleRemoveFromArray: (id: string) => removeItemFromArray([model, field], id),
                            }),
                        },
                    },
                };
            }
        }

        return schema;
    }, [d]);

    const [publishError, setPublishError] = useState<ApolloError>({});
    const [customizeData, setCustomizeData] = useState(initialCustomizationSchema);

    const handleChangeString = ([model, field], value: string) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value,
                },
            },
        }));
    };
    const handleChangeNumber = ([model, field], value: number) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value,
                },
            },
        }));
    };
    const handleChangeBoolean = ([model, filed]) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [filed]: {
                    ...prev[model][filed],
                    value: !prev[model][filed].value,
                },
            },
        }));
    };
    const handleChangeCheckbox = ([model, filed], value) => {
        setCustomizeData((prev) => {
            const checkboxValue = JSON.parse(JSON.stringify(prev[model][filed].value));
            const foundIndex = checkboxValue.indexOf(value);

            if (foundIndex === -1) {
                checkboxValue.push(value);
            } else {
                checkboxValue.splice(foundIndex, 1);
            }

            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [filed]: {
                        ...prev[model][filed],
                        value: checkboxValue,
                    },
                },
            };
        });
    };
    const addNewItem = ([model, field]) => {
        setCustomizeData((prev) => {
            const newDefaultItem = {
                id: Math.floor(Math.random() * 10000),
            };
            prev[model][field].options.forEach((option) => (newDefaultItem[option.key] = option.value));

            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [field]: {
                        ...prev[model][field],
                        value: [...prev[model][field].value, newDefaultItem].filter((item) => item?.id),
                    },
                },
            };
        });
    };
    const deleteArrayItem = ([model, field], id: number) => {
        setCustomizeData((prev) => {
            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [field]: {
                        ...prev[model][field],
                        value: [...prev[model][field].value.filter((item) => item.id !== id)],
                    },
                },
            };
        });
    };
    const handleChangeObjItem = ([model, field], id: number, key: string, value: string | number | boolean) => {
        setCustomizeData((prev) => {
            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [field]: {
                        ...prev[model][field],
                        value: [
                            ...prev[model][field].value.map((item) => {
                                const newItem = { ...item };
                                if (newItem.id === id && key in newItem) {
                                    newItem[key] = value;
                                }
                                return newItem;
                            }),
                        ],
                    },
                },
            };
        });
    };
    const handleLoadDefault = ([model, filed], value) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [filed]: {
                    ...prev[model][filed],
                    value,
                },
            },
        }));
    };

    const handlePublishCustomization = async (onCompleted) => {
        await updateThemeCustomization({
            variables: {
                themeName: customization?.config.themeName,
                data: cacheIntegration(lastChanges, extractSchemaValue(customization)),
            },
            onError(e) {
                setPublishError(apolloError(e));
            },
            onCompleted: () => onCompleted?.(),
        });
    };

    const handleRemoveAllChanges = () => {
        setCustomizeData(initialCustomizationSchema);
        setPublishError({});
    };

    const addItemToArray = ([model, field], newValue) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value: [...prev[model][field].value, newValue],
                },
            },
        }));
    };

    const removeItemFromArray = ([model, field], value) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value: prev[model][field].value.filter((item: any) => item !== value),
                },
            },
        }));
    };

    useEffect(() => {
        lastChanges.current = extractSchemaValue(customizeData);
    }, [customizeData]);

    const data = useMemo(() => customizeData, [customizeData]);

    return { data, handlePublishCustomization, publishError, publishLoading, handleRemoveAllChanges };
};

export default useCustomization;
