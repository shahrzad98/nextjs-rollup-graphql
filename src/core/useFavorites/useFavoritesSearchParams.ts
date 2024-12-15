import { FavoritesSearchParams } from './types';

const useFavoritesSearchParams = (query: any): FavoritesSearchParams => {
    const searchParams: FavoritesSearchParams = {
        offset: ((query.page ? +query.page : 1) - 1) * 10,
    };

    for (const i in searchParams) if (!searchParams[i]) delete searchParams[i];

    return searchParams;
};

export default useFavoritesSearchParams;
