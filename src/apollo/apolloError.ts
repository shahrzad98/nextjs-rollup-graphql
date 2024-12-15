export interface ApolloError {
    [key: string]: string;
}

const apolloError = (e: any): ApolloError => {
    if (!e) return {};

    const { graphQLErrors } = e;

    let errors: ApolloError = {};

    if (!graphQLErrors || !graphQLErrors?.length || !graphQLErrors[0]?.extensions?.response?.body) return {};

    if (graphQLErrors) {
        graphQLErrors.map(
            ({
                extensions: {
                    response: { body },
                },
            }) => {
                if (body && typeof body === 'object' && Object.keys(body).length) {
                    for (const i in body) {
                        errors = {
                            ...errors,
                            [i]: Array.isArray(body[i]) ? body[i][0] : body[i],
                        };
                    }
                }
            },
        );
    }

    return errors;
};

export default apolloError;
