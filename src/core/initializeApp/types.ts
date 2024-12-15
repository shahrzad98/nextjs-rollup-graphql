import { ApolloConfig } from '../../apollo/apolloClient';

export interface ThemeConfig {
    apollo: ApolloConfig;
    customization: Customization;
}

export interface Customization {
    config: CustomizationConfig;
    schema: CustomizationSchema;
}

export interface CustomizationConfig {
    themeName: string;
}

export interface CustomizationSchema {
    [model: string]: { [field: string]: CustomizationSchemaModel };
}

export interface CustomizationSchemaModel {
    type: CustomizationSchemaType;
    options?: CustomizationSchemaOption[];
    defaultValue: any;
}

export type CustomizationSchemaType =
    | 'string'
    | 'number'
    | 'container'
    | 'boolean'
    | 'checkbox'
    | 'object'
    | 'object[]'
    | 'string[]'
    | 'number[]'
    | 'boolean[]'
    | 'component[]';

export interface CustomizationSchemaOption {
    key: string;
    value: any;
    additionalData: any;
}
