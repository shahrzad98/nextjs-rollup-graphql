import { IArticle } from '../useBlogArticles';
import { ApolloError } from '../../apollo';

export interface Article {
    data: IArticle | undefined;
    like: ILike;
    error: ApolloError;
    loading: boolean;
}

interface ILike {
    handleClick: (onCompleted?: () => void) => Promise<void>;
    loading: boolean;
    error: ApolloError;
}
