import { Image } from '../../sharedInterfaces/Image';
import { ApolloError } from '../../apollo';
import { Link } from '../../sharedInterfaces/Link';

export interface BreadcrumbParams {
    id?: string;
    type?: 'CATEGORY' | 'PRODUCT';
}

export interface IBreadcrumb {
    data: CategoryChild | null;
    loading: boolean;
    error: ApolloError;
}

interface CategoryDeepChild {
    id: number | string | null;
    child: Partial<CategoryDeepChild> | null;
    title: string | null;
    image: Pick<Image, 'id' | 'image'> | null;
    link: Link | unknown;
}

export interface CategoryChild {
    id: number | string;
    child?: Partial<CategoryDeepChild> | null;
    title: string;
    image?: Pick<Image, 'id' | 'image'> | null;
    link?: Link;
}
