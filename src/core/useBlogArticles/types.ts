import { Link } from '../../sharedInterfaces/Link';
import { Pagination } from '../../utils/usePagination';
import { ApolloError } from '../../apollo';

export interface IBlogArticles {
    data: IArticle[];
    search: Search;
    loading: boolean;
    error: ApolloError;
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
    pagination: Pagination;
    next?: string | null;
}

export interface IArticle {
    id: number;
    title: string;
    content: string;
    published_at: string;
    view_count: number;
    like_count: number;
    tags: ArticleTag[];
    category: ArticleCategory[];
    image: string;
    is_active: boolean;
    is_liked: boolean;
    is_highlight: boolean;
    slug: string;
    link?: Link;
}

export interface ArticleTag {
    id: number;
    title: string;
}

export interface ArticleCategory {
    id: number;
    title: string;
    parent?: number | null;
}

export interface Search {
    value: string;
    handleChange: (search: string) => void;
    handleClear: () => void;
}
