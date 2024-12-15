import { ApolloError } from '../../apollo/apolloError';

export interface ImageUpload {
    image: any;
    id: string;
    uuid: any;
    loading: boolean;
    error: ApolloError;
    handleUploadImage: (image: any) => Promise<void>;
    reset: () => void;
}
