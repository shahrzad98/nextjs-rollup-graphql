import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:5000/graphql',
    documents: ['src/apollo/queries.ts', 'src/apollo/mutations.ts'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/': {
            preset: 'client',
            config: {
                avoidOptionals: {
                    input: false,
                    object: true,
                },
                maybeValue: 'T',
                enumsAsTypes: true,
            },
            plugins: [],
        },
    },
};

export default config;
