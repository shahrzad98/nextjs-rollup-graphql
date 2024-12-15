import isEqual from 'lodash.isequal';

const needSchemaSync = (localSchema, querySchema): boolean => {
    const localSchemaClone = JSON.parse(JSON.stringify(localSchema));
    const querySchemaClone = JSON.parse(JSON.stringify(querySchema));

    for (const model in querySchemaClone) {
        for (const field in querySchemaClone[model]) {
            if (Object.keys(localSchemaClone[model]).length && localSchemaClone[model][field]?.value) {
                localSchemaClone[model][field].value = querySchemaClone[model][field].value;
            }
        }
    }

    return !isEqual(localSchemaClone, querySchemaClone);
};

export default needSchemaSync;
