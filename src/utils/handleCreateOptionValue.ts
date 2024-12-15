export interface OptionValue {
    name: string;
    value: string;
    colorCode?: string;
}

const handleCreateOptionValue = (optionValue: any[]): OptionValue[] => {
    if (!Array.isArray(optionValue)) throw new Error('optionValue is an array!');

    if (!optionValue?.length) return [];
    return optionValue.map((i) => ({
        name: i.option?.name,
        value: i.value,
        ...(i.option?.is_color && { colorCode: i.color_code }),
    }));
};

export default handleCreateOptionValue;
