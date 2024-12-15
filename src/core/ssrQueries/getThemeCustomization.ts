import { GET_THEME_CUSTOMIZATION } from '../../apollo/queries';
import { SSRQuery } from './types';
import { Customization } from '../initializeApp';
import { CREATE_THEME_CUSTOMIZATION } from '../../apollo/mutations';
import extractSchemaValue from '../useCustomization/extractSchemaValue';

const getThemeCustomization: SSRQuery<Customization> = (customization) => async (apolloClient) => {
    if (!customization) throw new Error('getThemeCustomization: customization is required!');

    const localDataSchema = extractSchemaValue(customization.schema);
    let queryDataSchema;

    try {
        const { data } = await apolloClient.query({
            variables: {
                themeName: customization?.config.themeName,
            },
            query: GET_THEME_CUSTOMIZATION,
        });
        if (data) {
            queryDataSchema = data?.customer?.getThemeCustomization?.data;
        }
    } catch (e: any) {
        if (e.message.includes('404')) {
            const { data } = await apolloClient.mutate({
                variables: {
                    themeName: customization?.config.themeName,
                    data: localDataSchema,
                },
                mutation: CREATE_THEME_CUSTOMIZATION,
            });
            if (data) {
                queryDataSchema = data?.customer?.createThemeCustomization?.data;
            }
        }
    }

    if (!queryDataSchema) throw new Error('Customization Schema was not fetched from server!');
};

export default getThemeCustomization;
