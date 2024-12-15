import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import { NormalizedCacheObject } from '@apollo/client';

const cacheIntegration = <T = NormalizedCacheObject>(newData: T, existingCache: T): T => {
    return merge(newData, existingCache, {
        arrayMerge: (destinationArray, sourceArray) => [
            ...sourceArray,
            ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
        ],
    });
};

export default cacheIntegration;
