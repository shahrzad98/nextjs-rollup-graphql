import { apolloLocalState } from '../../apollo';
import { GET_PROFILE } from '../../apollo/queries';

const isUserLoggedIn = (): boolean => {
    const data = apolloLocalState.readQuery({ query: GET_PROFILE });
    return !!data?.customer?.getProfile;
};

export default isUserLoggedIn;
