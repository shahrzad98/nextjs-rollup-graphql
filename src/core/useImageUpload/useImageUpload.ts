import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPLOAD_IMAGE } from '../../apollo/mutations';
import apolloError from '../../apollo/apolloError';
import { ImageUpload } from './types';

const initData = {
    item: {
        uploadImage: {
            image: '',
            id: '',
            uuid: '',
        },
    },
};

const useImageUpload = (): ImageUpload => {
    const [uploadImage, { loading, error }] = useMutation(UPLOAD_IMAGE);
    const [uploadError, setUploadError] = useState({});
    const [uploadData, setUploadData] = useState(initData);

    const handleUploadImage = async (image: Required<any>) => {
        setUploadError({});
        await uploadImage({
            variables: { file: image },
            onError(e) {
                setUploadError(e);
            },
            onCompleted: (data) => {
                if (data?.item?.uploadImage) {
                    setUploadData(data as typeof initData);
                }
            },
        });
    };

    const reset = () => {
        setUploadData(initData);
        setUploadError({});
    };

    return {
        image: uploadData.item.uploadImage.image,
        uuid: uploadData.item.uploadImage.uuid,
        loading: loading,
        handleUploadImage,
        reset,
        id: uploadData.item.uploadImage.id,
        error: apolloError(uploadError || error),
    };
};

export default useImageUpload;
