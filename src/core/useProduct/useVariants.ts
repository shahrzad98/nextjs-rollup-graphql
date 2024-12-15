import { useEffect, useMemo, useState } from 'react';
import { $Option, $Product, $Variant, OptionValue, Variant } from './types';

const useVariants = (product: $Product | undefined): $Variant => {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [selectedOptionValues, setSelectedOptionValues] = useState<OptionValue[]>([]);

    const variants = useMemo<Variant[]>(() => {
        return product?.variants?.length
            ? product.variants.map((variant: Variant) => ({
                  ...variant,
                  profit_percent: ((variant.primary_cost - variant.cost) * 100) / variant.primary_cost,
              }))
            : [];
    }, [product]);

    const uniqueOptions = useMemo(() => {
        const uniqueOptions: $Option[] = [];
        const uniqueOptionValues: OptionValue[] = [];
        if (product && !!variants?.length) {
            variants.forEach((variant: Variant) => {
                variant.option_values?.forEach((optionValue: OptionValue) => {
                    const selectedOption = uniqueOptions.find((option: $Option) => option.id === optionValue.option.id);
                    if (!selectedOption) uniqueOptions.push({ ...optionValue.option });
                });
            });

            variants.forEach((variant: Variant) => {
                variant.option_values?.forEach((optionValue: OptionValue) => {
                    const selectedOptionValue = uniqueOptionValues.find(
                        (value: OptionValue) => value.id === optionValue.id,
                    );
                    if (!selectedOptionValue) uniqueOptionValues.push({ ...optionValue });
                });
            });

            uniqueOptions.forEach((option) => {
                const values = uniqueOptionValues.filter((value) => value.option.id === option.id);
                option.values = [...values];
            });
        }

        return uniqueOptions;
    }, [product]);

    useEffect(() => {
        if (product && variants.length) {
            const validVariants = variants.filter((variant) => variant.is_active && variant?.orderable_count !== 0);
            if (validVariants.length) {
                const cheapestValid = validVariants.reduce((prev: Variant, curr: Variant) =>
                    prev.cost > curr.cost ? curr : prev,
                );
                setSelectedVariant(cheapestValid);
                if (cheapestValid.option_values) setSelectedOptionValues(cheapestValid.option_values);
                // return cheapestValid;
            } else setSelectedVariant(variants[0]);
        }
    }, [product]);

    const handleSelectedVariant = (newValue: OptionValue) => {
        if (variants[0].option_values?.length) {
            const newOptionValues = selectedOptionValues.map((value: OptionValue) => {
                if (value.option.id === newValue.option.id) return newValue;
                else return value;
            });

            if (newOptionValues && !!newOptionValues.length) setSelectedOptionValues(newOptionValues);
            const newVariant = variants.find((variant: Variant) => {
                const isNewVariant = variant.option_values?.every((value: OptionValue) =>
                    newOptionValues.some((opt: OptionValue) => opt.id === value.id),
                );
                if (isNewVariant) return variant;
            });
            if (newVariant) setSelectedVariant(newVariant);
            else setSelectedVariant(null);
        }
    };

    const handleOptionValueIsSelected = (id: number) => selectedOptionValues.some((value) => value?.id === id);

    return {
        options: uniqueOptions,
        variants,
        selectedVariant,
        handleSelectedVariant,
        handleOptionValueIsSelected,
    };
};

export default useVariants;
