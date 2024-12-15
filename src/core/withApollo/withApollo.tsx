import { SSRQueries } from '../ssrQueries';
import isSearchEngine from '../../utils/isSearchEngine';
import { addApolloState } from '../../apollo/apolloClient';

const withApollo =
    (C) =>
    (...queries: SSRQueries[][]) => {
        const Component: any = (props) => <C {...props} />;

        Component.getInitialProps = async (ctx) => {
            if (!Array.isArray(queries)) {
                throw new Error('Queries must be array !');
            }
            if (!queries.length) {
                throw new Error('Queries cannot be empty !');
            }

            if (C.setPageConfig?.private || C.setPageConfig?.guestOnly) {
                throw new Error('SSR pages cannot be authenticated !');
            }

            const pageConfig = {
                dynamicRendering: false,
                ...(C.setPageConfig && { ...C.setPageConfig }),
            };

            const isServer = typeof window === 'undefined';

            const canFetchDataInServerSide: boolean = pageConfig.dynamicRendering
                ? isServer && isSearchEngine(ctx)
                : isServer;

            if (canFetchDataInServerSide) {
                for (const query of queries) {
                    const results = await Promise.all<any[]>(query.map((q) => q(ctx.apolloClient, ctx)));
                    if (queries.length >= 2) {
                        ctx.previousData = results
                            .filter(({ data }) => !!data?.customer)
                            .map(({ data: { customer } }) => customer);
                    }
                }
                ctx.previousData = [];
            }

            return { ...addApolloState(ctx.apolloClient), csrOnly: !canFetchDataInServerSide };
        };

        return Component;
    };

export default withApollo;
