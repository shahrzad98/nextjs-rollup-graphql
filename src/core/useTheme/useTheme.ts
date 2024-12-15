import { useQuery } from '@apollo/client';
import { GET_APPEARANCE } from '../../apollo/queries';
import apolloError from '../../apollo/apolloError';
import { Theme } from './types';

const useTheme = (): Theme => {
    const { data, loading, error } = useQuery(GET_APPEARANCE);

    return { data: data?.customer.getAppearance?.theme, loading, error: apolloError(error) };
};

export default useTheme;
