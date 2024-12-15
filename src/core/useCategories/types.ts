import { ApolloError } from '../../apollo';
import { Image } from '../../sharedInterfaces/Image';
import { Link } from '../../sharedInterfaces/Link';

export interface $Categories {
    loading: boolean;
    error: ApolloError;
    data: { categories: $Category[] };
    count: number;
    link: Link;
}

export interface $Category {
    id: string;
    title: string;
    image: Pick<Image, 'id' | 'image'>;
    children: $Category[];
}
