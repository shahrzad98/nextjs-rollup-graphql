const extractSchemaValue = (schema) => {
    let data = {};
    for (const model in schema) {
        for (const filed in schema[model]) {
            data = {
                ...data,
                [model]: {
                    ...data[model],
                    [filed]: {
                        value: schema[model][filed].value ?? schema[model][filed].defaultValue,
                    },
                },
            };
        }
    }
    return data;
};

export default extractSchemaValue;
