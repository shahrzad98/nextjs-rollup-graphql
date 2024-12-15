import { ApolloError } from '../../apollo';
import { Link } from '../../sharedInterfaces/Link';

export interface IBlogHighlights {
    data: IHighlight[];
    loading: boolean;
    error: ApolloError;
}

export interface IHighlight {
    id: number;
    article: IHighlightArticle;
}

export interface IHighlightArticle {
    id: number;
    title: string;
    image: string;
    link: Link;
    slug: string;
}
