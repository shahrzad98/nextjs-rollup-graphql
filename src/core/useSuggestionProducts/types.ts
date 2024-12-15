import { ApolloError } from '../../apollo/apolloError';
import { MiniProduct } from '../../utils/useMiniProduct';

export interface SuggestionProducts {
    data: MiniProduct[];
    loading: boolean;
    error: ApolloError;
}
