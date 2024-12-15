import { ApolloError } from '../../apollo';
import { MiniProduct } from '../../utils/useMiniProduct';

export interface MiniFavoriteProduct extends MiniProduct {
    handleRemoveFavorite: () => Promise<void>;
    // handleAddToBasket: () => void;
}

export interface Favorites {
    loadings: {
        fetchLoading: boolean;
        addLoading: boolean;
    };
    errors: {
        fetchError: ApolloError;
        addError: ApolloError;
    };
    data: MiniFavoriteProduct[];
    handleLoadMore: () => void;
    hasMore: boolean;
    count: number;
    handleAddToFavorites: (id: string, onCompleted?: () => void, onError?: () => void) => Promise<void>;
}
export interface FavoritesSearchParams {
    offset: number;
}
