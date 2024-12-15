import { ApolloError } from '../../apollo';
import { Image } from '../../sharedInterfaces/Image';

export interface Options {
    offset: number;
    limit: number;
}

export interface ProductFeedback {
    data: FeedbackData;
    loading: boolean;
    error: ApolloError;
    paginationHandler: (page: number) => void;
    pageHandlerDesktop: (page: number) => void;
}

export interface FeedbackData {
    pages: number[];
    page: number;
    resultsPerPage: Comment[];
    results: Comment[];
    count: number;
}

export interface Comment {
    score: number;
    images: Image[];
    description: string;
    reply: string;
    created_at: string;
    first_name: string;
    last_name: string;
    variant: $$Variant;
}

export interface $$Variant {
    option_values?: $OptionValue[] | null;
    name: string;
}

export interface $OptionValue {
    id?: number | string | null;
    value: string;
    option: $$Option;
    color_code: string;
}

export interface $$Option {
    id?: string | number | null;
    name: string;
    is_color: boolean;
}
