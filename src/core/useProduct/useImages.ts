import { useMemo } from 'react';
import { $Product, Image } from './types';

const useImages = (product: $Product | undefined) => {
    const images = useMemo(() => {
        const allImages: Image[] = [];
        if (product?.chosen_image) allImages.push(product?.chosen_image);

        if (product?.images?.length) {
            product?.images.forEach((image) => {
                if (product?.chosen_image) {
                    if (image.id !== product?.chosen_image.id) allImages.push(image);
                } else {
                    allImages.push(image);
                }
            });
        }

        product?.variants.forEach((variant) => {
            if (variant?.images.length) allImages.push(variant?.images[0]);
        });

        return allImages;
    }, [product]);

    return {
        images,
    };
};

export default useImages;
