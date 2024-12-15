import { NetworkStatus, useMutation, useQuery } from '@apollo/client';
import apolloError, { ApolloError } from '../../apollo/apolloError';
import { useEffect, useMemo, useState } from 'react';
import { UPDATE_PROFILE, CHANGE_PASSWORD_WITHOUT_OTP } from '../../apollo/mutations';
import { GET_PROFILE, GET_LOYALTY_CREDIT, GET_USER_TYPE } from '../../apollo/queries';
import { isUserLoggedIn } from '../isUserLoggedIn';
import { Info, InfoFields, User, UserRole } from './types';

const useUser = (): User => {
    const {
        error: fetchError,
        loading: fetchLoading,
        data,
        refetch,
        networkStatus,
    } = useQuery(GET_PROFILE, {
        fetchPolicy: 'cache-only',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
    });

    const { data: loyaltyCreditQueryData } = useQuery(GET_LOYALTY_CREDIT, {
        skip: !isUserLoggedIn(),
    });
    const { data: userTypeData } = useQuery(GET_USER_TYPE, {
        skip: !isUserLoggedIn(),
    });

    const [updateProfile, { loading: updateLoading }] = useMutation(UPDATE_PROFILE);
    const [changePass, { loading: changePassLoading }] = useMutation(CHANGE_PASSWORD_WITHOUT_OTP);

    const [error, setError] = useState<ApolloError>({});
    const [user, setUser] = useState<Info>({
        birthday: '',
        card_number: '',
        email: '',
        first_name: '',
        last_name: '',
        marriage_date: '',
        national_code: '',
        phone_number: '',
        telephone_number: '',
        granted: false,
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loyaltyCreditStateData, setLoyaltyCreditStateData] = useState<number>(0);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        if (fetchError) {
            setError(apolloError(fetchError));
            return;
        }
        if (data) {
            setIsLoggedIn(true);

            const info: Omit<typeof data.customer.getProfile, 'id' | '__typename'> = { ...data.customer.getProfile };

            delete info['__typename'];
            delete info['id'];

            setUser(info);
        }
    }, [fetchError, data]);
    useEffect(() => {
        if (loyaltyCreditQueryData)
            setLoyaltyCreditStateData(+loyaltyCreditQueryData.customer.getLoyaltyCreditV2.loyalty_credit);
    }, [loyaltyCreditQueryData]);

    const handleChange = (name: InfoFields, value: string) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFetchUser = async () => {
        await refetch();
    };
    const handleSubmit = async (onCompleted) => {
        if (updateLoading) return;

        const {
            card_number,
            phone_number,
            telephone_number,
            first_name,
            last_name,
            national_code,
            marriage_date,
            birthday,
            email,
        } = user;

        await updateProfile({
            variables: {
                content: {
                    ...(card_number && { card_number: card_number }),
                    ...(phone_number && { phone_number: phone_number }),
                    ...(telephone_number && { telephone_number: telephone_number }),
                    ...(first_name && { first_name: first_name }),
                    ...(last_name && { last_name: last_name }),
                    ...(national_code && { national_code: national_code }),
                    ...(marriage_date && { marriage_date: marriage_date }),
                    ...(birthday && { birthday: birthday }),
                    ...(email && { email: email }),
                },
            },
            onError(e) {
                setError(apolloError(e));
            },
            onCompleted,
        });
    };

    const handleChangePassword = async (oldPass, newPass, onCompleted, isGranted = false) => {
        await changePass({
            variables: {
                content: {
                    ...(!isGranted && { password: oldPass }),
                    new_password: newPass,
                },
            },
            onError(e) {
                setError(apolloError(e));
            },
            onCompleted,
        });
        // await updateProfile({
        //     variables: {
        //         content: {
        //             password: oldPass,
        //             new_password: newPass,
        //             phone_number: user.phone_number,
        //         },
        //     },
        //     onError(e) {
        //         setError(apolloError(e));
        //     },
        //     onCompleted,
        // });
    };

    const info = useMemo(() => user, [user]);
    const loyaltyCredit = useMemo<number>(() => loyaltyCreditStateData, [loyaltyCreditStateData]);
    const handleCancel = () => {
        if (data) {
            const info: Omit<typeof data.customer.getProfile, 'id' | '__typename'> = { ...data.customer.getProfile };

            delete info['__typename'];
            delete info['id'];

            setUser({ ...info });
            handleEditMode(false);
        }
    };

    const handleEditMode = (mode) => {
        setEditMode(mode);
    };
    return {
        handleChange,
        handleSubmit,
        data: {
            info,
            userRole: isUserLoggedIn() ? (userTypeData?.customer.getUserType.type as UserRole) : 'guest',
            loyaltyCredit,
        },
        loadings: {
            fetchLoading: fetchLoading || networkStatus === NetworkStatus.refetch,
            updateLoading: changePassLoading || updateLoading,
        },
        error,
        isLoggedIn,
        fetchUserInfo: handleFetchUser,
        handleChangePassword,
        handleCancel,
        editMode,
        handleEditMode,
    };
};

export default useUser;
