'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var client = require('@apollo/client');
var React = require('react');
var merge = require('deepmerge');
var isEqual = require('lodash.isequal');
var apolloUploadClient = require('apollo-upload-client');
var retry = require('@apollo/client/link/retry');
var context = require('@apollo/client/link/context');
var error = require('@apollo/client/link/error');
var Router = require('next/router');
var jsxRuntime = require('react/jsx-runtime');
var App = require('next/app');
var qs = require('query-string');
var uuid = require('react-uuid');
var Cookies = require('cookies');
var moment = require('moment-jalaali');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var Router__default = /*#__PURE__*/_interopDefaultLegacy(Router);
var App__default = /*#__PURE__*/_interopDefaultLegacy(App);
var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);
var uuid__default = /*#__PURE__*/_interopDefaultLegacy(uuid);
var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

const cacheIntegration = (newData, existingCache) => {
    return merge__default["default"](newData, existingCache, {
        arrayMerge: (destinationArray, sourceArray) => [
            ...sourceArray,
            ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual__default["default"](d, s))),
        ],
    });
};

const customizationSchemaVar = client.makeVar({});

const cache = (storeId, apolloConfig) => {
    return new client.InMemoryCache({
        dataIdFromObject(responseObject) {
            switch (responseObject.__typename) {
                case 'CustomerQuery':
                    return `CustomerQuery:${storeId}`;
                case 'CustomerMutation':
                    return `CustomerMutation:${storeId}`;
                default:
                    return client.defaultDataIdFromObject(responseObject);
            }
        },
        typePolicies: {
            Query: {
                fields: cacheIntegration(apolloConfig?.inMemoryCacheConfig?.typePolicies?.Query?.fields ?? {}, {
                    customizationSchema: {
                        read() {
                            return customizationSchemaVar();
                        },
                    },
                }),
            },
            TransactionTypes: {
                keyFields: ['gateway_type'],
            },
        },
    });
};

const setNextCookie = async (access) => {
    await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            access,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
const clearNextCookie = async () => {
    await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const handleRefreshToken = async (refresh = '') => {
    const _refreshToken = typeof window !== 'undefined' && !refresh ? localStorage.getItem('refresh_token') : refresh;
    if (!_refreshToken || typeof window === 'undefined') {
        if (typeof window !== 'undefined')
            localStorage.removeItem('token');
        return '';
    }
    else {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_REST_URL ? process.env.NEXT_PUBLIC_REST_URL : 'https://backend.digify.shop'}/user/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: _refreshToken }),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data?.access);
                return data.access;
            }
            else {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');
                }
                await clearNextCookie();
                return '';
            }
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('refresh_api_error: ', error);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
            }
            await clearNextCookie();
            return '';
        }
    }
};

/* eslint-disable no-case-declarations */
let apolloClient;
exports.apolloLocalState = void 0;
const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
const getNewToken = async () => {
    const token = await handleRefreshToken();
    if (!token)
        return '';
    else
        return token;
};
const authLink = context.setContext((_, { headers }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    return {
        headers: {
            ...(token && { authorization: `Bearer ${token}` }),
            ...headers,
        },
    };
});
const errorLink = error.onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            switch (err.extensions.code) {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver
                case 'UNAUTHENTICATED':
                    // Modify the operation context with a new token
                    const oldHeaders = operation.getContext().headers;
                    (async () => {
                        const newToken = await getNewToken();
                        if (newToken) {
                            setNextCookie(newToken);
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: `Bearer ${newToken}`,
                                },
                            });
                            // Retry the request, returning the new observable
                            return forward(operation);
                        }
                    })();
            }
        }
    }
    if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
    }
});
const retryLink = new retry.RetryLink({
    delay: {
        initial: 400,
        max: Infinity,
        jitter: true,
    },
    attempts: {
        max: 6,
        retryIf: (error) => {
            return !!error.networkError;
        },
    },
});
const createApolloClient = (storeId, apolloConfig) => {
    if (!apolloConfig)
        throw new Error('apolloConfig is required!');
    exports.apolloLocalState = cache(storeId, apolloConfig);
    return new client.ApolloClient({
        ssrMode: typeof window === 'undefined',
        connectToDevTools: process.env.NODE_ENV !== 'production',
        link: client.from([
            errorLink,
            authLink,
            retryLink,
            apolloUploadClient.createUploadLink({
                uri: apolloConfig.uri,
                credentials: 'same-origin',
                headers: {
                    storeid: storeId,
                },
            }),
        ]),
        cache: exports.apolloLocalState,
    });
};
const initializeApollo = (storeId, initialState = null, apolloConfig) => {
    const _apolloClient = apolloClient ?? createApolloClient(storeId, apolloConfig);
    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore(cacheIntegration(initialState, existingCache));
    }
    // create new apollo and remove cache when window is undefined
    if (typeof window === 'undefined') {
        return _apolloClient;
    }
    if (!apolloClient)
        apolloClient = _apolloClient;
    return _apolloClient;
};
const addApolloState = (client) => {
    return { [APOLLO_STATE_PROP_NAME]: client.cache.extract() };
};
const useApollo = (appProps, apolloConfig, _storeId) => {
    const storeId = _storeId ? parseInt('' + _storeId) : 0;
    const state = appProps[APOLLO_STATE_PROP_NAME];
    return React.useMemo(() => initializeApollo(storeId, state, apolloConfig), [storeId, state]);
};

const GetCookieDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "GetCookie" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "TokenContent" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getCookie" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "access" } }, { "kind": "Field", "name": { "kind": "Name", "value": "refresh" } }] } }] } }] } }] };
const GetTokenDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "GetToken" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "TokenContent" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getToken" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "access" } }, { "kind": "Field", "name": { "kind": "Name", "value": "refresh" } }] } }] } }] } }] };
const GetRefreshTokenDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "GetRefreshToken" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RefreshTokenContent" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getRefreshToken" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "access" } }] } }] } }] } }] };
const CreateProfileDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateProfile" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProfileContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createProfile" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }] } }] } }] } }] };
const OtpSendDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "OtpSend" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "OTPSendContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "otpSend" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] }] } }] } }] };
const OtpSendV2Document = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "OtpSendV2" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "OTPSendContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "otpSendV2" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "is_forget_password" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_register" } }] } }] } }] } }] };
const OtpSendSignupDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "otpSendSignup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "GetTokenByOTPSingUpContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "otpSendSignup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "refresh" } }, { "kind": "Field", "name": { "kind": "Name", "value": "access" } }] } }] } }] } }] };
const GetChangePasswordAuthDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "GetChangePasswordAuth" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "GetTokenByOTPContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getChangePasswordAuth" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "auth" } }] } }] } }] } }] };
const ForgetPasswordDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ForgetPassword" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ForgetPasswordContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "forgetPassword" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] }] } }] } }] };
const ChangePasswordWithoutOtpDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ChangePasswordWithoutOtp" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ChangePasswordWithoutOtpContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "changePasswordWithoutOtp" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] }] } }] } }] };
const UpdateNotificationSettingDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateNotificationSetting" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "NotificationSettingContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateNotificationSetting" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_available_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_available_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_available_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_available_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_available_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_available_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receive_order_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receive_order_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receive_order_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_invoice_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_invoice_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_invoice_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "return_invoice_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "return_invoice_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "return_invoice_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "survey_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "survey_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "survey_internal_notify" } }] } }] } }] } }] };
const UpdateProfileDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateProfile" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProfileContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateProfile" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "phone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "national_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "telephone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "sheba_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "card_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "birthday" } }, { "kind": "Field", "name": { "kind": "Name", "value": "gender" } }, { "kind": "Field", "name": { "kind": "Name", "value": "marriage_date" } }, { "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }, { "kind": "Field", "name": { "kind": "Name", "value": "gender_display" } }] } }] } }] } }] };
const PaymentCardDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "PaymentCard" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "image" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Upload" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "paymentCard" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "orderId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "image" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "image" } } }] }] } }] } }] };
const UpdateBasketDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateBasket" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "uuid" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateBasketContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateBasket" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "uuid" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "uuid" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "temp_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "basket_items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "product_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost_change" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discount_amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_loyalty" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_unlimited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "max_quantity" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option_values" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_color" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "variant_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "variant_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bonus_value" } }] } }] } }] } }] } }] };
const VoucherCheckDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "VoucherCheck" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "VoucherCheckContent" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "customer" }, "name": { "kind": "Name", "value": "promotion" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "voucherCheck" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "expire_date" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "limit" } }, { "kind": "Field", "name": { "kind": "Name", "value": "start_date" } }, { "kind": "Field", "name": { "kind": "Name", "value": "voucher_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "voucher_type_display" } }] } }] } }] } }] };
const RemoveFavoriteDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RemoveFavorite" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "removeFavorite" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] } }] };
const AddFavoriteDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddFavorite" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "addFavorite" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] } }] };
const CreateOrderDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateOrderContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "gateway_link" } }, { "kind": "Field", "name": { "kind": "Name", "value": "transaction_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "registration_type" } }] } }] } }] } }] };
const DeleteAddressDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteAddress" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteAddress" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] } }] };
const CreateAddressDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateAddress" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddressContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createAddress" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "province" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "no" } }, { "kind": "Field", "name": { "kind": "Name", "value": "postal_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "unit_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_lastname" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }] } }] } }] } }] };
const PartialUpdateAddressDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "PartialUpdateAddress" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddressContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "partialUpdateAddress" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "province" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "no" } }, { "kind": "Field", "name": { "kind": "Name", "value": "postal_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "unit_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_lastname" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }] } }] } }] } }] };
const GetGatewayDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "GetGateway" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "GatewayLinkUrlContent" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getGateway" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "gateway_link" } }] } }] } }] } }] };
const ClearCookieDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ClearCookie" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "clearCookie" } }] } }] } }] };
const CancelOrderDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CancelOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cancelOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] } }] };
const UpdateReceiveStatusDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateReceiveStatus" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateReceiveStatusContent" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateReceiveStatus" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] }] } }] } }] };
const ReturnOrderDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ReturnOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ReturnOrderContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "returnOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reason" } }, { "kind": "Field", "name": { "kind": "Name", "value": "returned_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reply_reason" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reply_description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "relative_voucher_amount" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "status_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "phone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "card_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total_returned_cost" } }] } }] } }] } }] };
const UpdateThemeCustomizationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateThemeCustomization" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "themeName" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "JSON" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateThemeCustomization" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "themeName" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "themeName" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "data" } }] } }] } }] } }] };
const CreateThemeCustomizationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateThemeCustomization" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "themeName" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "JSON" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createThemeCustomization" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "themeName" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "themeName" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "data" } }] } }] } }] } }] };
const CreateStoreOpeningNotifierDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateStoreOpeningNotifier" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateStoreOpeningNotifierContent" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createStoreOpeningNotifier" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] }] } }] } }] };
const UploadImageDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UploadImage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "file" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Upload" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "item" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "uploadImage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "file" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "file" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "uuid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }] } }] } }] };
const LikeBlogArticleDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "LikeBlogArticle" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likeBlogArticle" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "article" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "published_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "view_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "category" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "parent" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_active" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_liked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "like_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_highlight" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }] } }] } }] } }] } }] };
const GetAppearanceDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAppearance" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getAppearance" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "theme" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_luxury" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_card_type_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "mobile_hot_offer_show" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "name_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_gradient_type_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_color" } }, { "kind": "Field", "name": { "kind": "Name", "value": "second_primary_color" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discount_color" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_gradient_color" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_gradient_type" } }] } }] } }] } }] } }] };
const GetStoreInfoDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetStoreInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getStoreInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "brand" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hotjar_token" } }, { "kind": "Field", "name": { "kind": "Name", "value": "google_analytics_token" } }, { "kind": "Field", "name": { "kind": "Name", "value": "store_address" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "province" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "postal_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "social_media" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "twitter" } }, { "kind": "Field", "name": { "kind": "Name", "value": "facebook" } }, { "kind": "Field", "name": { "kind": "Name", "value": "linkedin" } }, { "kind": "Field", "name": { "kind": "Name", "value": "telegram" } }, { "kind": "Field", "name": { "kind": "Name", "value": "whatsapp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "instagram" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "phone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ecommerce" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cover" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "domain" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_open" } }, { "kind": "Field", "name": { "kind": "Name", "value": "about_us" } }, { "kind": "Field", "name": { "kind": "Name", "value": "about_returns" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_guide" } }, { "kind": "Field", "name": { "kind": "Name", "value": "e_namad_reference_link" } }, { "kind": "Field", "name": { "kind": "Name", "value": "e_namad_img_src" } }, { "kind": "Field", "name": { "kind": "Name", "value": "e_namad_img_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "e_namad_meta_content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "show_digify_logo" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "guild" } }, { "kind": "Field", "name": { "kind": "Name", "value": "earning" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "game_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "limit" } }, { "kind": "Field", "name": { "kind": "Name", "value": "game_type_display" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_earning_loyalty_active" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ray_chat_enabled" } }, { "kind": "Field", "name": { "kind": "Name", "value": "telephone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ray_chat_token" } }] } }] } }] } }] };
const GetBasketDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetBasket" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "uuid" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getBasket" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "uuid" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "uuid" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "temp_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "basket_items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "product_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost_change" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discount_amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_loyalty" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_unlimited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "max_quantity" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option_values" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_color" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "variant_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "variant_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bonus_value" } }] } }] } }] } }] } }] };
const GetProductsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetProducts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProductsParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getProducts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "average_score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "colors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "min_variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "time_delay" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_unlimited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "max_quantity" } }, { "kind": "Field", "name": { "kind": "Name", "value": "profit_percent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_tax" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "main_image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_expired_date" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }] } }] } }] } }] } }] };
const GetProductDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetProduct" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getProduct" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "category" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "parent" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "variants" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "time_delay" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_active" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_unlimited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost_expired_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "max_quantity" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option_values" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_color" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "features" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "average_score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "voter_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "chosen_image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "feedback_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "profit_percent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_favorite" } }] } }] } }] } }] };
const GetSuggestionProductsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetSuggestionProducts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "productId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getSuggestionProducts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "product_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "productId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "min_variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_unlimited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "max_quantity" } }, { "kind": "Field", "name": { "kind": "Name", "value": "profit_percent" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "average_score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "colors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }] } }] } }] } }] } }] } }] };
const GetProductFeedbackDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetProductFeedback" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "productId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProductFeedbackParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getProductFeedback" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "product_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "productId" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "previous" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reply" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "uuid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "option_values" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_color" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } }] } }] } }] };
const ProductFilteringDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ProductFiltering" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProductsParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "productFiltering" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "available_maximum_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "categories" } }, { "kind": "Field", "name": { "kind": "Name", "value": "colors" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_discount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "maximum_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "options" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option_values" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "minimum_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "custom_categories" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "child_categories" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "child_categories" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] } }] } }] } }] };
const GetCategoriesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetCategories" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CategoriesParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getCategories" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "children" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "children" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "children" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "children" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }] } }] } }] } }] } }] } }] } }] } }] } }] };
const GetProfileDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetProfile" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getProfile" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "phone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "national_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "telephone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "card_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "birthday" } }, { "kind": "Field", "name": { "kind": "Name", "value": "marriage_date" } }, { "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }, { "kind": "Field", "name": { "kind": "Name", "value": "granted" } }] } }] } }] } }] };
const GetNotificationSettingDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetNotificationSetting" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getNotificationSetting" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_available_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_available_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_available_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_available_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_available_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_available_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receive_order_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receive_order_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receive_order_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_invoice_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_invoice_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_invoice_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "return_invoice_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "return_invoice_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "return_invoice_internal_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "survey_sms_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "survey_email_notify" } }, { "kind": "Field", "name": { "kind": "Name", "value": "survey_internal_notify" } }] } }] } }] } }] };
const GetOrdersDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetOrders" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "OrdersParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getOrdersV3" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "details" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "product_serialized" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "previous_status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "expired_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "approximate_sending_date" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "start" } }, { "kind": "Field", "name": { "kind": "Name", "value": "end" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner_card_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "received_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "registration_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "returns" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_time_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner_card_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "approximate_sending_date" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "start" } }, { "kind": "Field", "name": { "kind": "Name", "value": "end" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_finished" } }, { "kind": "Field", "name": { "kind": "Name", "value": "received_by_customer" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cancellation_reason" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } }] } }] } }] };
const GetOrderDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getOrderV3" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "address" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "address" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "received_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "registration_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_time_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total_discount_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "pocket_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "previous_status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "expired_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "approximate_sending_date" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "start" } }, { "kind": "Field", "name": { "kind": "Name", "value": "end" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "pocket" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "post_tracking_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "customer_shipping_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cancellation_reason" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner_card_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner_card_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_finished" } }, { "kind": "Field", "name": { "kind": "Name", "value": "received_by_customer" } }, { "kind": "Field", "name": { "kind": "Name", "value": "can_return_request" } }, { "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "details" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost_expired_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_return" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option_values" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_color" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "time_delay" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_serialized" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }] } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "unit_amount" } }] } }] } }] } }] } }] };
const GetReturnedOrderDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetReturnedOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getReturnedOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_reference_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "first_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "phone_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "card_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total_returned_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reason" } }, { "kind": "Field", "name": { "kind": "Name", "value": "returned_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reply_reason" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reply_description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "relative_voucher_amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "uuid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_item" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_tax" } }, { "kind": "Field", "name": { "kind": "Name", "value": "single_profit" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "details" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "uuid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "product_serialized" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "uuid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "online_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option_values" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }, { "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "option" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_color" } }] } }] } }] } }] } }] } }] } }] } }] } }] } }] };
const GetOrdersStatusCountDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetOrdersStatusCount" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "getOrderStatusCount" }, "name": { "kind": "Name", "value": "getOrders" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "returns_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status_count" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] } }] };
const GetBreadcrumbDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetBreadcrumb" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "BreadcrumbParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getBreadcrumb" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "child" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "child" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "child" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "child" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }] } }] } }] } }] } }] } }] } }] } }] };
const GetAddressesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAddresses" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getAddresses" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "province" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "no" } }, { "kind": "Field", "name": { "kind": "Name", "value": "postal_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "unit_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_lastname" } }, { "kind": "Field", "name": { "kind": "Name", "value": "receiver_number" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }] } }] } }] } }] };
const GetShippingAddressesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getShippingAddresses" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "addressId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getShippingAddresses" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "addressId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_delay" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_type_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "time_sending" } }] } }] } }] } }] };
const GetPocketDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPocket" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getPocket" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_active" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } }] };
const GetLoyaltyCreditDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetLoyaltyCredit" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getLoyaltyCreditV2" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "loyalty_credit" } }] } }] } }] } }] };
const GetFavoritesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetFavorites" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "FavoritesParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getFavoritesV2" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "average_score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "colors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "color_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "min_variant" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "time_delay" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_unlimited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "loyalty_gift" } }, { "kind": "Field", "name": { "kind": "Name", "value": "primary_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "max_quantity" } }, { "kind": "Field", "name": { "kind": "Name", "value": "profit_percent" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "main_image" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hot_offer_expired_date" } }, { "kind": "Field", "name": { "kind": "Name", "value": "has_stock" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }] } }] } }] } }] } }] };
const IsFavoriteDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "IsFavorite" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "isFavorite" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "is_favorite" } }] } }] } }] } }] };
const GetTransactionTypesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetTransactionTypes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getTransactionTypes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "gateway_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "persian_gateway_type" } }] } }] } }] } }] };
const GetLoyaltyLogsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetLoyaltyLogs" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "LoyaltyLogsParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getLoyaltyLogs" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "account_credit" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "data" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "game" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "log_type_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "order_cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "reason" } }] } }] } }] } }] } }] };
const GetApproximateSendingDateDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getApproximateSendingDate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "addressId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getShippingAddress" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "addressId" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "approximate_sending_date" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "start" } }, { "kind": "Field", "name": { "kind": "Name", "value": "end" } }] } }] } }] } }] } }] };
const GetThemeCustomizationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetThemeCustomization" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "themeName" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getThemeCustomization" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "themeName" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "themeName" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "data" } }] } }] } }] } }] };
const GetUserTypeDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetUserType" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getUserType" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "type" } }] } }] } }] } }] };
const GetVariantsStockDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetVariantsStock" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "ids" } }, "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getVariantsStock" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "ids" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "ids" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "orderable_count" } }] } }] } }] } }] };
const GetBlogArticlesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetBlogArticles" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "blogArticlesParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getBlogArticles" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "previous" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "published_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "view_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "like_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "category" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "parent" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_active" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_liked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_highlight" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }] } }] } }] } }] } }] };
const GetBlogHighlightsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetBlogHighlights" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "blogHighlightsParams" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getBlogHighlights" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "next" } }, { "kind": "Field", "name": { "kind": "Name", "value": "previous" } }, { "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "article" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }] } }] } }] } }] } }] } }] };
const GetBlogArticleDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetBlogArticle" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getBlogArticle" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "published_at" } }, { "kind": "Field", "name": { "kind": "Name", "value": "view_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "category" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "parent" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_active" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_liked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "like_count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "is_highlight" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }] } }] } }] } }] };
const GetSitemapDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getSitemap" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getSitemap" } }] } }] } }] };
const GetTokenPanelDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetTokenPanel" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "notification" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getToken" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "token" } }] } }] } }] } }] };
const GetShippingSokectDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getShippingSokect" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "addressId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getShippingSokect" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "addressId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cost" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_delay" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "shipping_type_display" } }, { "kind": "Field", "name": { "kind": "Name", "value": "time_sending" } }] } }] } }] } }] };

/* eslint-disable */
/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    mutation GetCookie($content: TokenContent!) {\n        user {\n            getCookie(content: $content) {\n                access\n                refresh\n            }\n        }\n    }\n": GetCookieDocument,
    "\n    mutation GetToken($content: TokenContent!) {\n        user {\n            getToken(content: $content) {\n                access\n                refresh\n            }\n        }\n    }\n": GetTokenDocument,
    "\n    mutation GetRefreshToken($content: RefreshTokenContent!) {\n        user {\n            getRefreshToken(content: $content) {\n                access\n            }\n        }\n    }\n": GetRefreshTokenDocument,
    "\n    mutation CreateProfile($content: ProfileContent) {\n        customer {\n            createProfile(content: $content) {\n                first_name\n                last_name\n            }\n        }\n    }\n": CreateProfileDocument,
    "\n    mutation OtpSend($content: OTPSendContent) {\n        customer {\n            otpSend(content: $content)\n        }\n    }\n": OtpSendDocument,
    "\n    mutation OtpSendV2($content: OTPSendContent) {\n        customer {\n            otpSendV2(content: $content) {\n                is_forget_password\n                is_register\n            }\n        }\n    }\n": OtpSendV2Document,
    "\n    mutation otpSendSignup($content: GetTokenByOTPSingUpContent) {\n        customer {\n            otpSendSignup(content: $content) {\n                refresh\n                access\n            }\n        }\n    }\n": OtpSendSignupDocument,
    "\n    mutation GetChangePasswordAuth($content: GetTokenByOTPContent) {\n        customer {\n            getChangePasswordAuth(content: $content) {\n                auth\n            }\n        }\n    }\n": GetChangePasswordAuthDocument,
    "\n    mutation ForgetPassword($content: ForgetPasswordContent) {\n        customer {\n            forgetPassword(content: $content)\n        }\n    }\n": ForgetPasswordDocument,
    "\n    mutation ChangePasswordWithoutOtp($content: ChangePasswordWithoutOtpContent) {\n        customer {\n            changePasswordWithoutOtp(content: $content)\n        }\n    }\n": ChangePasswordWithoutOtpDocument,
    "\n    mutation UpdateNotificationSetting($content: NotificationSettingContent) {\n        customer {\n            updateNotificationSetting(content: $content) {\n                hot_offer_available_email_notify\n                id\n                product_available_sms_notify\n                product_available_email_notify\n                product_available_internal_notify\n                hot_offer_available_sms_notify\n                hot_offer_available_internal_notify\n                receive_order_sms_notify\n                receive_order_email_notify\n                receive_order_internal_notify\n                order_invoice_sms_notify\n                order_invoice_email_notify\n                order_invoice_internal_notify\n                return_invoice_sms_notify\n                return_invoice_email_notify\n                return_invoice_internal_notify\n                survey_sms_notify\n                survey_email_notify\n                survey_internal_notify\n            }\n        }\n    }\n": UpdateNotificationSettingDocument,
    "\n    mutation UpdateProfile($content: ProfileContent) {\n        customer {\n            updateProfile(content: $content) {\n                id\n                phone_number\n                national_code\n                telephone_number\n                sheba_number\n                card_number\n                birthday\n                gender\n                marriage_date\n                first_name\n                last_name\n                email\n                gender_display\n            }\n        }\n    }\n": UpdateProfileDocument,
    "\n    mutation PaymentCard($orderId: ID!, $image: Upload!) {\n        customer {\n            paymentCard(orderId: $orderId, image: $image)\n        }\n    }\n": PaymentCardDocument,
    "\n    mutation UpdateBasket($uuid: String, $content: UpdateBasketContent) {\n        customer {\n            updateBasket(content: $content, uuid: $uuid) {\n                id\n                temp_id\n                basket_items {\n                    product_id\n                    amount\n                    cost\n                    cost_change\n                    discount_amount\n                    has_loyalty\n                    id\n                    image {\n                        id\n                        image\n                    }\n                    is_unlimited\n                    loyalty_gift\n                    max_quantity\n                    online_cost\n                    online_primary_cost\n                    option_values {\n                        id\n                        value\n                        option {\n                            id\n                            name\n                            is_color\n                        }\n                        color_code\n                    }\n                    primary_cost\n                    product_label\n                    stock\n                    orderable_count\n                    variant_name\n                    variant_id\n                    tax\n                    single_tax\n                    bonus_value\n                }\n            }\n        }\n    }\n": UpdateBasketDocument,
    "\n    mutation VoucherCheck($content: VoucherCheckContent!) {\n        customer: promotion {\n            voucherCheck(content: $content) {\n                amount\n                code\n                expire_date\n                id\n                limit\n                start_date\n                voucher_type\n                voucher_type_display\n            }\n        }\n    }\n": VoucherCheckDocument,
    "\n    mutation RemoveFavorite($id: ID!) {\n        customer {\n            removeFavorite(id: $id)\n        }\n    }\n": RemoveFavoriteDocument,
    "\n    mutation AddFavorite($id: ID!) {\n        customer {\n            addFavorite(id: $id)\n        }\n    }\n": AddFavoriteDocument,
    "\n    mutation CreateOrder($content: CreateOrderContent) {\n        customer {\n            createOrder(content: $content) {\n                id\n                gateway_link\n                transaction_type\n                registration_type\n            }\n        }\n    }\n": CreateOrderDocument,
    "\n    mutation DeleteAddress($id: ID!) {\n        customer {\n            deleteAddress(id: $id)\n        }\n    }\n": DeleteAddressDocument,
    "\n    mutation CreateAddress($content: AddressContent) {\n        customer {\n            createAddress(content: $content) {\n                city\n                province\n                address\n                no\n                postal_code\n                id\n                unit_number\n                description\n                receiver_name\n                receiver_lastname\n                receiver_number\n                name\n                longitude\n                latitude\n            }\n        }\n    }\n": CreateAddressDocument,
    "\n    mutation PartialUpdateAddress($id: ID!, $content: AddressContent) {\n        customer {\n            partialUpdateAddress(id: $id, content: $content) {\n                city\n                province\n                address\n                no\n                postal_code\n                id\n                unit_number\n                description\n                receiver_name\n                receiver_lastname\n                receiver_number\n                name\n                longitude\n                latitude\n            }\n        }\n    }\n": PartialUpdateAddressDocument,
    "\n    mutation GetGateway($id: ID, $content: GatewayLinkUrlContent!) {\n        customer {\n            getGateway(id: $id, content: $content) {\n                gateway_link\n            }\n        }\n    }\n": GetGatewayDocument,
    "\n    mutation ClearCookie {\n        user {\n            clearCookie\n        }\n    }\n": ClearCookieDocument,
    "\n    mutation CancelOrder($id: ID!) {\n        customer {\n            cancelOrder(id: $id)\n        }\n    }\n": CancelOrderDocument,
    "\n    mutation UpdateReceiveStatus($orderId: ID!, $content: UpdateReceiveStatusContent!) {\n        customer {\n            updateReceiveStatus(id: $orderId, content: $content)\n        }\n    }\n": UpdateReceiveStatusDocument,
    "\n    mutation ReturnOrder($content: ReturnOrderContent) {\n        customer {\n            returnOrder(content: $content) {\n                id\n                status\n                reference_code\n                order_reference_code\n                created_at\n                items {\n                    id\n                    status_display\n                    reason\n                    returned_cost\n                    count\n                    description\n                    reply_reason\n                    reply_description\n                    relative_voucher_amount\n                }\n                status_display\n                order_created_at\n                first_name\n                last_name\n                phone_number\n                card_number\n                total_returned_cost\n            }\n        }\n    }\n": ReturnOrderDocument,
    "\n    mutation UpdateThemeCustomization($themeName: String, $data: JSON) {\n        customer {\n            updateThemeCustomization(themeName: $themeName, data: $data) {\n                id\n                data\n            }\n        }\n    }\n": UpdateThemeCustomizationDocument,
    "\n    mutation CreateThemeCustomization($themeName: String, $data: JSON) {\n        customer {\n            createThemeCustomization(themeName: $themeName, data: $data) {\n                id\n                data\n            }\n        }\n    }\n": CreateThemeCustomizationDocument,
    "\n    mutation CreateStoreOpeningNotifier($content: CreateStoreOpeningNotifierContent) {\n        customer {\n            createStoreOpeningNotifier(content: $content)\n        }\n    }\n": CreateStoreOpeningNotifierDocument,
    "\n    mutation UploadImage($file: Upload!) {\n        item {\n            uploadImage(file: $file) {\n                id\n                uuid\n                image\n            }\n        }\n    }\n": UploadImageDocument,
    "\n    mutation LikeBlogArticle($id: ID!) {\n        customer {\n            likeBlogArticle(id: $id) {\n                article {\n                    id\n                    title\n                    content\n                    published_at\n                    view_count\n                    tags {\n                        id\n                        title\n                    }\n                    category {\n                        id\n                        title\n                        parent\n                    }\n                    image\n                    is_active\n                    is_liked\n                    like_count\n                    is_highlight\n                    slug\n                }\n            }\n        }\n    }\n": LikeBlogArticleDocument,
    "\n    query GetAppearance {\n        customer {\n            getAppearance {\n                id\n                theme {\n                    id\n                    name\n                    is_luxury\n                    product_card_type_display\n                    mobile_hot_offer_show\n                    images {\n                        id\n                        image\n                    }\n                    name_display\n                    hot_offer_gradient_type_display\n                    primary_color\n                    second_primary_color\n                    discount_color\n                    hot_offer_gradient_color\n                    hot_offer_gradient_type\n                }\n            }\n        }\n    }\n": GetAppearanceDocument,
    "\n    query GetStoreInfo {\n        customer {\n            getStoreInfo {\n                brand\n                id\n                name\n                hotjar_token\n                google_analytics_token\n                store_address {\n                    province\n                    city\n                    address\n                    postal_code\n                    longitude\n                    latitude\n                }\n                logo {\n                    id\n                    image\n                }\n                social_media {\n                    twitter\n                    facebook\n                    linkedin\n                    telegram\n                    whatsapp\n                    instagram\n                }\n                phone_number\n                first_name\n                last_name\n                email\n                ecommerce {\n                    cover {\n                        id\n                        image\n                    }\n                    domain\n                    is_open\n                    about_us\n                    about_returns\n                    shipping_guide\n                    e_namad_reference_link\n                    e_namad_img_src\n                    e_namad_img_id\n                    e_namad_meta_content\n                    show_digify_logo\n                }\n                guild\n                earning {\n                    game_type\n                    value\n                    limit\n                    game_type_display\n                }\n                is_earning_loyalty_active\n                ray_chat_enabled\n                telephone_number\n                tax\n                ray_chat_token\n            }\n        }\n    }\n": GetStoreInfoDocument,
    "\n    query GetBasket($uuid: String) {\n        customer {\n            getBasket(uuid: $uuid) {\n                id\n                temp_id\n                basket_items {\n                    product_id\n                    amount\n                    cost\n                    cost_change\n                    discount_amount\n                    has_loyalty\n                    id\n                    image {\n                        id\n                        image\n                    }\n                    is_unlimited\n                    loyalty_gift\n                    max_quantity\n                    online_cost\n                    online_primary_cost\n                    option_values {\n                        id\n                        value\n                        option {\n                            id\n                            name\n                            is_color\n                        }\n                        color_code\n                    }\n                    primary_cost\n                    product_label\n                    stock\n                    orderable_count\n                    variant_name\n                    variant_id\n                    tax\n                    single_tax\n                    bonus_value\n                }\n            }\n        }\n    }\n": GetBasketDocument,
    "\n    query GetProducts($params: ProductsParams) {\n        customer {\n            getProducts(params: $params) {\n                count\n                next\n                results {\n                    average_score\n                    colors {\n                        color_code\n                        id\n                    }\n                    id\n                    label\n                    min_variant {\n                        id\n                        cost\n                        stock\n                        time_delay\n                        is_unlimited\n                        loyalty_gift\n                        primary_cost\n                        max_quantity\n                        profit_percent\n                        tax\n                        single_tax\n                    }\n                    main_image {\n                        id\n                        image\n                    }\n                    images {\n                        id\n                        image\n                    }\n                    hot_offer_expired_date\n                    has_stock\n                    orderable_count\n                }\n            }\n        }\n    }\n": GetProductsDocument,
    "\n    query GetProduct($id: ID!) {\n        customer {\n            getProduct(id: $id) {\n                id\n                label\n                description\n                category {\n                    id\n                    title\n                    parent\n                }\n                variants {\n                    id\n                    cost\n                    stock\n                    orderable_count\n                    images {\n                        id\n                        image\n                    }\n                    time_delay\n                    is_active\n                    is_unlimited\n                    loyalty_gift\n                    cost_expired_at\n                    primary_cost\n                    max_quantity\n                    option_values {\n                        id\n                        value\n                        option {\n                            id\n                            name\n                            is_color\n                        }\n                        color_code\n                    }\n                }\n                images {\n                    id\n                    image\n                }\n                tax\n                features {\n                    id\n                    title\n                    description\n                }\n                average_score\n                voter_number\n                chosen_image {\n                    id\n                    image\n                }\n                product_stock\n                feedback_count\n                has_stock\n                profit_percent\n                has_loyalty_gift\n                is_favorite\n            }\n        }\n    }\n": GetProductDocument,
    "\n    query GetSuggestionProducts($productId: ID!) {\n        customer {\n            getSuggestionProducts(product_id: $productId) {\n                results {\n                    id\n                    label\n                    orderable_count\n                    min_variant {\n                        id\n                        cost\n                        stock\n                        is_unlimited\n                        loyalty_gift\n                        primary_cost\n                        max_quantity\n                        profit_percent\n                    }\n                    image {\n                        id\n                        image\n                    }\n                    average_score\n                    has_stock\n                    colors {\n                        id\n                        value\n                        color_code\n                    }\n                }\n            }\n        }\n    }\n": GetSuggestionProductsDocument,
    "\n    query GetProductFeedback($productId: ID!, $params: ProductFeedbackParams) {\n        customer {\n            getProductFeedback(product_id: $productId, params: $params) {\n                count\n                next\n                previous\n                results {\n                    score\n                    description\n                    reply\n                    images {\n                        id\n                        uuid\n                        image\n                    }\n                    created_at\n                    first_name\n                    last_name\n                    variant {\n                        option_values {\n                            id\n                            value\n                            option {\n                                id\n                                name\n                                is_color\n                            }\n                            color_code\n                        }\n                        name\n                    }\n                }\n            }\n        }\n    }\n": GetProductFeedbackDocument,
    "\n    query ProductFiltering($params: ProductsParams) {\n        customer {\n            productFiltering(params: $params) {\n                available_maximum_cost\n                categories\n                colors\n                has_discount\n                has_stock\n                maximum_cost\n                options {\n                    name\n                    option_values\n                }\n                minimum_cost\n                custom_categories {\n                    title\n                    id\n                    child_categories {\n                        title\n                        id\n                        child_categories {\n                            title\n                            id\n                        }\n                    }\n                }\n            }\n        }\n    }\n": ProductFilteringDocument,
    "\n    query GetCategories($params: CategoriesParams) {\n        customer {\n            getCategories(params: $params) {\n                count\n                results {\n                    id\n                    title\n                    image {\n                        id\n                        image\n                    }\n                    children {\n                        id\n                        title\n                        image {\n                            id\n                            image\n                        }\n                        children {\n                            id\n                            title\n                            image {\n                                id\n                                image\n                            }\n                            children {\n                                id\n                                title\n                                image {\n                                    id\n                                    image\n                                }\n                                children {\n                                    id\n                                    title\n                                    image {\n                                        id\n                                        image\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n": GetCategoriesDocument,
    "\n    query GetProfile {\n        customer {\n            getProfile {\n                id\n                phone_number\n                national_code\n                telephone_number\n                card_number\n                birthday\n                marriage_date\n                first_name\n                last_name\n                email\n                granted\n            }\n        }\n    }\n": GetProfileDocument,
    "\n    query GetNotificationSetting {\n        customer {\n            getNotificationSetting {\n                id\n                product_available_sms_notify\n                product_available_email_notify\n                product_available_internal_notify\n                hot_offer_available_sms_notify\n                hot_offer_available_email_notify\n                hot_offer_available_internal_notify\n                receive_order_sms_notify\n                receive_order_email_notify\n                receive_order_internal_notify\n                order_invoice_sms_notify\n                order_invoice_email_notify\n                order_invoice_internal_notify\n                return_invoice_sms_notify\n                return_invoice_email_notify\n                return_invoice_internal_notify\n                survey_sms_notify\n                survey_email_notify\n                survey_internal_notify\n            }\n        }\n    }\n": GetNotificationSettingDocument,
    "\n    query GetOrders($params: OrdersParams) {\n        customer {\n            getOrdersV3(params: $params) {\n                count\n                next\n                results {\n                    cost\n                    reference_code\n                    created_at\n                    id\n                    items {\n                        details {\n                            variant {\n                                product_serialized {\n                                    label\n                                    images {\n                                        id\n                                        image\n                                    }\n                                    id\n                                }\n                            }\n                        }\n                    }\n                    status\n                    previous_status\n                    expired_at\n                    approximate_sending_date {\n                        start\n                        end\n                    }\n                    owner_card_name\n                    received_at\n                    registration_type\n                    returns {\n                        id\n                        status\n                        reference_code\n                        created_at\n                    }\n                    shipping_time_count\n                    owner_card_number\n                    approximate_sending_date {\n                        start\n                        end\n                    }\n                    is_finished\n                    received_by_customer\n                    cancellation_reason\n                    shipping {\n                        name\n                    }\n                }\n            }\n        }\n    }\n": GetOrdersDocument,
    "\n    query GetOrder($orderId: ID!) {\n        customer {\n            getOrderV3(id: $orderId) {\n                address {\n                    address\n                }\n                cost\n                created_at\n                received_at\n                registration_type\n                order_description\n                shipping_time_count\n                receiver_name\n                receiver_number\n                receiver_last_name\n                loyalty_amount\n                total_discount_cost\n                pocket_cost\n                tax\n                status\n                previous_status\n                expired_at\n                approximate_sending_date {\n                    start\n                    end\n                }\n                pocket {\n                    name\n                }\n                shipping {\n                    name\n                }\n                post_tracking_number\n                reference_code\n                customer_shipping_cost\n                cancellation_reason\n                owner_card_name\n                owner_card_number\n                id\n                is_finished\n                received_by_customer\n                can_return_request\n                items {\n                    id\n                    details {\n                        variant {\n                            cost\n                            cost_expired_at\n                            id\n                            images {\n                                id\n                                image\n                            }\n                            is_return\n                            name\n                            online_cost\n                            online_primary_cost\n                            option_values {\n                                value\n                                option {\n                                    name\n                                    is_color\n                                }\n                                color_code\n                            }\n                            primary_cost\n                            time_delay\n                            product_serialized {\n                                id\n                                label\n                                images {\n                                    id\n                                    image\n                                }\n                            }\n                        }\n                    }\n                    single_cost\n                    unit_amount\n                }\n            }\n        }\n    }\n": GetOrderDocument,
    "\n    query GetReturnedOrder($orderId: ID!) {\n        customer {\n            getReturnedOrder(id: $orderId) {\n                id\n                status\n                reference_code\n                order_reference_code\n                created_at\n                status_display\n                first_name\n                order_created_at\n                last_name\n                phone_number\n                card_number\n                total_returned_cost\n                items {\n                    id\n                    status_display\n                    status\n                    reason\n                    returned_cost\n                    count\n                    description\n                    reply_reason\n                    reply_description\n                    relative_voucher_amount\n                    images {\n                        id\n                        uuid\n                        image\n                    }\n                    order_item {\n                        id\n                        single_cost\n                        single_primary_cost\n                        single_tax\n                        single_profit\n                        product_label\n                        details {\n                            variant {\n                                id\n                                cost\n                                name\n                                images {\n                                    id\n                                    uuid\n                                    image\n                                }\n                                status\n                                online_primary_cost\n                                primary_cost\n                                product_serialized {\n                                    name\n                                    id\n                                    label\n                                    images {\n                                        id\n                                        uuid\n                                        image\n                                    }\n                                }\n                                online_cost\n                                option_values {\n                                    id\n                                    value\n                                    color_code\n                                    option {\n                                        id\n                                        name\n                                        is_color\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n": GetReturnedOrderDocument,
    "\n    query GetOrdersStatusCount {\n        customer {\n            getOrderStatusCount: getOrders {\n                returns_count\n                status_count {\n                    status\n                    total\n                }\n            }\n        }\n    }\n": GetOrdersStatusCountDocument,
    "\n    query GetBreadcrumb($params: BreadcrumbParams) {\n        customer {\n            getBreadcrumb(params: $params) {\n                id\n                title\n                image {\n                    id\n                    image\n                }\n                child {\n                    id\n                    title\n                    image {\n                        id\n                        image\n                    }\n                    child {\n                        id\n                        title\n                        image {\n                            id\n                            image\n                        }\n                        child {\n                            id\n                            title\n                            image {\n                                id\n                                image\n                            }\n                            child {\n                                id\n                                title\n                                image {\n                                    id\n                                    image\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n": GetBreadcrumbDocument,
    "\n    query GetAddresses {\n        customer {\n            getAddresses {\n                city\n                province\n                address\n                no\n                postal_code\n                id\n                unit_number\n                description\n                receiver_name\n                receiver_lastname\n                receiver_number\n                name\n                longitude\n                latitude\n            }\n        }\n    }\n": GetAddressesDocument,
    "\n    query getShippingAddresses($addressId: ID!) {\n        customer {\n            getShippingAddresses(address_id: $addressId) {\n                cost\n                id\n                name\n                shipping_delay\n                shipping_type\n                shipping_type_display\n                time_sending\n            }\n        }\n    }\n": GetShippingAddressesDocument,
    "\n    query GetPocket {\n        customer {\n            getPocket {\n                cost\n                id\n                is_active\n                name\n            }\n        }\n    }\n": GetPocketDocument,
    "\n    query GetLoyaltyCredit {\n        customer {\n            getLoyaltyCreditV2 {\n                loyalty_credit\n            }\n        }\n    }\n": GetLoyaltyCreditDocument,
    "\n    query GetFavorites($params: FavoritesParams) {\n        customer {\n            getFavoritesV2(params: $params) {\n                count\n                next\n                results {\n                    average_score\n                    colors {\n                        color_code\n                        id\n                    }\n                    id\n                    label\n                    min_variant {\n                        id\n                        cost\n                        stock\n                        time_delay\n                        is_unlimited\n                        loyalty_gift\n                        primary_cost\n                        max_quantity\n                        profit_percent\n                    }\n                    main_image {\n                        id\n                        image\n                    }\n                    images {\n                        id\n                        image\n                    }\n                    hot_offer_expired_date\n                    has_stock\n                    orderable_count\n                }\n            }\n        }\n    }\n": GetFavoritesDocument,
    "\n    query IsFavorite($id: ID!) {\n        customer {\n            isFavorite(id: $id) {\n                is_favorite\n            }\n        }\n    }\n": IsFavoriteDocument,
    "\n    query GetTransactionTypes {\n        customer {\n            getTransactionTypes {\n                gateway_type\n                persian_gateway_type\n            }\n        }\n    }\n": GetTransactionTypesDocument,
    "\n    query GetLoyaltyLogs($params: LoyaltyLogsParams) {\n        customer {\n            getLoyaltyLogs(params: $params) {\n                count\n                next\n                results {\n                    account_credit\n                    amount\n                    created_at\n                    data {\n                        game\n                    }\n                    id\n                    log_type_display\n                    order_cost\n                    reason\n                }\n            }\n        }\n    }\n": GetLoyaltyLogsDocument,
    "\n    query getApproximateSendingDate($addressId: ID!, $id: ID!) {\n        customer {\n            getShippingAddress(address_id: $addressId, id: $id) {\n                approximate_sending_date {\n                    start\n                    end\n                }\n            }\n        }\n    }\n": GetApproximateSendingDateDocument,
    "\n    query GetThemeCustomization($themeName: String) {\n        customer {\n            getThemeCustomization(themeName: $themeName) {\n                id\n                data\n            }\n        }\n    }\n": GetThemeCustomizationDocument,
    "\n    query GetUserType {\n        customer {\n            getUserType {\n                type\n            }\n        }\n    }\n": GetUserTypeDocument,
    "\n    query GetVariantsStock($ids: [ID!]!) {\n        customer {\n            getVariantsStock(ids: $ids) {\n                id\n                orderable_count\n            }\n        }\n    }\n": GetVariantsStockDocument,
    "\n    query GetBlogArticles($params: blogArticlesParams) {\n        customer {\n            getBlogArticles(params: $params) {\n                count\n                next\n                previous\n                results {\n                    id\n                    title\n                    content\n                    published_at\n                    view_count\n                    like_count\n                    tags {\n                        id\n                        title\n                    }\n                    category {\n                        id\n                        title\n                        parent\n                    }\n                    image\n                    is_active\n                    is_liked\n                    is_highlight\n                    slug\n                }\n            }\n        }\n    }\n": GetBlogArticlesDocument,
    "\n    query GetBlogHighlights($params: blogHighlightsParams) {\n        customer {\n            getBlogHighlights(params: $params) {\n                count\n                next\n                previous\n                results {\n                    id\n                    article {\n                        id\n                        title\n                        image\n                        slug\n                    }\n                }\n            }\n        }\n    }\n": GetBlogHighlightsDocument,
    "\n    query GetBlogArticle($id: ID!) {\n        customer {\n            getBlogArticle(id: $id) {\n                id\n                title\n                content\n                published_at\n                view_count\n                tags {\n                    id\n                    title\n                }\n                category {\n                    id\n                    title\n                    parent\n                }\n                image\n                is_active\n                is_liked\n                like_count\n                is_highlight\n                slug\n            }\n        }\n    }\n": GetBlogArticleDocument,
    "\n    query getSitemap {\n        customer {\n            getSitemap\n        }\n    }\n": GetSitemapDocument,
    "\n    query GetTokenPanel {\n        notification {\n            getToken {\n                token\n            }\n        }\n    }\n": GetTokenPanelDocument,
    "\n    query getShippingSokect($addressId: ID!) {\n        customer {\n            getShippingSokect(address_id: $addressId) {\n                cost\n                id\n                name\n                shipping_delay\n                shipping_type\n                shipping_type_display\n                time_sending\n            }\n        }\n    }\n": GetShippingSokectDocument,
};
function graphql(source) {
    return documents[source] ?? {};
}

const GET_APPEARANCE = graphql(/* GraphQL */ `
    query GetAppearance {
        customer {
            getAppearance {
                id
                theme {
                    id
                    name
                    is_luxury
                    product_card_type_display
                    mobile_hot_offer_show
                    images {
                        id
                        image
                    }
                    name_display
                    hot_offer_gradient_type_display
                    primary_color
                    second_primary_color
                    discount_color
                    hot_offer_gradient_color
                    hot_offer_gradient_type
                }
            }
        }
    }
`);
const GET_STORE_INFO = graphql(/* GraphQL */ `
    query GetStoreInfo {
        customer {
            getStoreInfo {
                brand
                id
                name
                hotjar_token
                google_analytics_token
                store_address {
                    province
                    city
                    address
                    postal_code
                    longitude
                    latitude
                }
                logo {
                    id
                    image
                }
                social_media {
                    twitter
                    facebook
                    linkedin
                    telegram
                    whatsapp
                    instagram
                }
                phone_number
                first_name
                last_name
                email
                ecommerce {
                    cover {
                        id
                        image
                    }
                    domain
                    is_open
                    about_us
                    about_returns
                    shipping_guide
                    e_namad_reference_link
                    e_namad_img_src
                    e_namad_img_id
                    e_namad_meta_content
                    show_digify_logo
                }
                guild
                earning {
                    game_type
                    value
                    limit
                    game_type_display
                }
                is_earning_loyalty_active
                ray_chat_enabled
                telephone_number
                tax
                ray_chat_token
            }
        }
    }
`);
const GET_BASKET = graphql(/* GraphQL */ `
    query GetBasket($uuid: String) {
        customer {
            getBasket(uuid: $uuid) {
                id
                temp_id
                basket_items {
                    product_id
                    amount
                    cost
                    cost_change
                    discount_amount
                    has_loyalty
                    id
                    image {
                        id
                        image
                    }
                    is_unlimited
                    loyalty_gift
                    max_quantity
                    online_cost
                    online_primary_cost
                    option_values {
                        id
                        value
                        option {
                            id
                            name
                            is_color
                        }
                        color_code
                    }
                    primary_cost
                    product_label
                    stock
                    orderable_count
                    variant_name
                    variant_id
                    tax
                    single_tax
                    bonus_value
                }
            }
        }
    }
`);
const GET_PRODUCTS = graphql(/* GraphQL */ `
    query GetProducts($params: ProductsParams) {
        customer {
            getProducts(params: $params) {
                count
                next
                results {
                    average_score
                    colors {
                        color_code
                        id
                    }
                    id
                    label
                    min_variant {
                        id
                        cost
                        stock
                        time_delay
                        is_unlimited
                        loyalty_gift
                        primary_cost
                        max_quantity
                        profit_percent
                        tax
                        single_tax
                    }
                    main_image {
                        id
                        image
                    }
                    images {
                        id
                        image
                    }
                    hot_offer_expired_date
                    has_stock
                    orderable_count
                }
            }
        }
    }
`);
const GET_PRODUCT = graphql(/* GraphQL */ `
    query GetProduct($id: ID!) {
        customer {
            getProduct(id: $id) {
                id
                label
                description
                category {
                    id
                    title
                    parent
                }
                variants {
                    id
                    cost
                    stock
                    orderable_count
                    images {
                        id
                        image
                    }
                    time_delay
                    is_active
                    is_unlimited
                    loyalty_gift
                    cost_expired_at
                    primary_cost
                    max_quantity
                    option_values {
                        id
                        value
                        option {
                            id
                            name
                            is_color
                        }
                        color_code
                    }
                }
                images {
                    id
                    image
                }
                tax
                features {
                    id
                    title
                    description
                }
                average_score
                voter_number
                chosen_image {
                    id
                    image
                }
                product_stock
                feedback_count
                has_stock
                profit_percent
                has_loyalty_gift
                is_favorite
            }
        }
    }
`);
const GET_SUGGESTION_PRODUCTS = graphql(/* GraphQL */ `
    query GetSuggestionProducts($productId: ID!) {
        customer {
            getSuggestionProducts(product_id: $productId) {
                results {
                    id
                    label
                    orderable_count
                    min_variant {
                        id
                        cost
                        stock
                        is_unlimited
                        loyalty_gift
                        primary_cost
                        max_quantity
                        profit_percent
                    }
                    image {
                        id
                        image
                    }
                    average_score
                    has_stock
                    colors {
                        id
                        value
                        color_code
                    }
                }
            }
        }
    }
`);
const GET_PRODUCTS_FEEDBACK = graphql(/* GraphQL */ `
    query GetProductFeedback($productId: ID!, $params: ProductFeedbackParams) {
        customer {
            getProductFeedback(product_id: $productId, params: $params) {
                count
                next
                previous
                results {
                    score
                    description
                    reply
                    images {
                        id
                        uuid
                        image
                    }
                    created_at
                    first_name
                    last_name
                    variant {
                        option_values {
                            id
                            value
                            option {
                                id
                                name
                                is_color
                            }
                            color_code
                        }
                        name
                    }
                }
            }
        }
    }
`);
const GET_PRODUCT_FILTER_PARAMS = graphql(/* GraphQL */ `
    query ProductFiltering($params: ProductsParams) {
        customer {
            productFiltering(params: $params) {
                available_maximum_cost
                categories
                colors
                has_discount
                has_stock
                maximum_cost
                options {
                    name
                    option_values
                }
                minimum_cost
                custom_categories {
                    title
                    id
                    child_categories {
                        title
                        id
                        child_categories {
                            title
                            id
                        }
                    }
                }
            }
        }
    }
`);
const GET_CATEGORIES = graphql(/* GraphQL */ `
    query GetCategories($params: CategoriesParams) {
        customer {
            getCategories(params: $params) {
                count
                results {
                    id
                    title
                    image {
                        id
                        image
                    }
                    children {
                        id
                        title
                        image {
                            id
                            image
                        }
                        children {
                            id
                            title
                            image {
                                id
                                image
                            }
                            children {
                                id
                                title
                                image {
                                    id
                                    image
                                }
                                children {
                                    id
                                    title
                                    image {
                                        id
                                        image
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
const GET_PROFILE = graphql(/* GraphQL */ `
    query GetProfile {
        customer {
            getProfile {
                id
                phone_number
                national_code
                telephone_number
                card_number
                birthday
                marriage_date
                first_name
                last_name
                email
                granted
            }
        }
    }
`);
const GET_NOTIFICATION_SETTING = graphql(/* GraphQL */ `
    query GetNotificationSetting {
        customer {
            getNotificationSetting {
                id
                product_available_sms_notify
                product_available_email_notify
                product_available_internal_notify
                hot_offer_available_sms_notify
                hot_offer_available_email_notify
                hot_offer_available_internal_notify
                receive_order_sms_notify
                receive_order_email_notify
                receive_order_internal_notify
                order_invoice_sms_notify
                order_invoice_email_notify
                order_invoice_internal_notify
                return_invoice_sms_notify
                return_invoice_email_notify
                return_invoice_internal_notify
                survey_sms_notify
                survey_email_notify
                survey_internal_notify
            }
        }
    }
`);
const GET_ORDERS = graphql(/* GraphQL */ `
    query GetOrders($params: OrdersParams) {
        customer {
            getOrdersV3(params: $params) {
                count
                next
                results {
                    cost
                    reference_code
                    created_at
                    id
                    items {
                        details {
                            variant {
                                product_serialized {
                                    label
                                    images {
                                        id
                                        image
                                    }
                                    id
                                }
                            }
                        }
                    }
                    status
                    previous_status
                    expired_at
                    approximate_sending_date {
                        start
                        end
                    }
                    owner_card_name
                    received_at
                    registration_type
                    returns {
                        id
                        status
                        reference_code
                        created_at
                    }
                    shipping_time_count
                    owner_card_number
                    approximate_sending_date {
                        start
                        end
                    }
                    is_finished
                    received_by_customer
                    cancellation_reason
                    shipping {
                        name
                    }
                }
            }
        }
    }
`);
const GET_ORDER = graphql(/* GraphQL */ `
    query GetOrder($orderId: ID!) {
        customer {
            getOrderV3(id: $orderId) {
                address {
                    address
                }
                cost
                created_at
                received_at
                registration_type
                order_description
                shipping_time_count
                receiver_name
                receiver_number
                receiver_last_name
                loyalty_amount
                total_discount_cost
                pocket_cost
                tax
                status
                previous_status
                expired_at
                approximate_sending_date {
                    start
                    end
                }
                pocket {
                    name
                }
                shipping {
                    name
                }
                post_tracking_number
                reference_code
                customer_shipping_cost
                cancellation_reason
                owner_card_name
                owner_card_number
                id
                is_finished
                received_by_customer
                can_return_request
                items {
                    id
                    details {
                        variant {
                            cost
                            cost_expired_at
                            id
                            images {
                                id
                                image
                            }
                            is_return
                            name
                            online_cost
                            online_primary_cost
                            option_values {
                                value
                                option {
                                    name
                                    is_color
                                }
                                color_code
                            }
                            primary_cost
                            time_delay
                            product_serialized {
                                id
                                label
                                images {
                                    id
                                    image
                                }
                            }
                        }
                    }
                    single_cost
                    unit_amount
                }
            }
        }
    }
`);
const GET_RETURNED_ORDER = graphql(/* GraphQL */ `
    query GetReturnedOrder($orderId: ID!) {
        customer {
            getReturnedOrder(id: $orderId) {
                id
                status
                reference_code
                order_reference_code
                created_at
                status_display
                first_name
                order_created_at
                last_name
                phone_number
                card_number
                total_returned_cost
                items {
                    id
                    status_display
                    status
                    reason
                    returned_cost
                    count
                    description
                    reply_reason
                    reply_description
                    relative_voucher_amount
                    images {
                        id
                        uuid
                        image
                    }
                    order_item {
                        id
                        single_cost
                        single_primary_cost
                        single_tax
                        single_profit
                        product_label
                        details {
                            variant {
                                id
                                cost
                                name
                                images {
                                    id
                                    uuid
                                    image
                                }
                                status
                                online_primary_cost
                                primary_cost
                                product_serialized {
                                    name
                                    id
                                    label
                                    images {
                                        id
                                        uuid
                                        image
                                    }
                                }
                                online_cost
                                option_values {
                                    id
                                    value
                                    color_code
                                    option {
                                        id
                                        name
                                        is_color
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
const GET_ORDERS_STATUS_COUNT = graphql(/* GraphQL */ `
    query GetOrdersStatusCount {
        customer {
            getOrderStatusCount: getOrders {
                returns_count
                status_count {
                    status
                    total
                }
            }
        }
    }
`);
const GET_BREADCRUMB = graphql(/* GraphQL */ `
    query GetBreadcrumb($params: BreadcrumbParams) {
        customer {
            getBreadcrumb(params: $params) {
                id
                title
                image {
                    id
                    image
                }
                child {
                    id
                    title
                    image {
                        id
                        image
                    }
                    child {
                        id
                        title
                        image {
                            id
                            image
                        }
                        child {
                            id
                            title
                            image {
                                id
                                image
                            }
                            child {
                                id
                                title
                                image {
                                    id
                                    image
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
const GET_ADDRESSES = graphql(/* GraphQL */ `
    query GetAddresses {
        customer {
            getAddresses {
                city
                province
                address
                no
                postal_code
                id
                unit_number
                description
                receiver_name
                receiver_lastname
                receiver_number
                name
                longitude
                latitude
            }
        }
    }
`);
const GET_SHIPPING_ADDRESS = graphql(/* GraphQL */ `
    query getShippingAddresses($addressId: ID!) {
        customer {
            getShippingAddresses(address_id: $addressId) {
                cost
                id
                name
                shipping_delay
                shipping_type
                shipping_type_display
                time_sending
            }
        }
    }
`);
const GET_POCKET = graphql(/* GraphQL */ `
    query GetPocket {
        customer {
            getPocket {
                cost
                id
                is_active
                name
            }
        }
    }
`);
const GET_LOYALTY_CREDIT = graphql(/* GraphQL */ `
    query GetLoyaltyCredit {
        customer {
            getLoyaltyCreditV2 {
                loyalty_credit
            }
        }
    }
`);
const GET_FAVORITES = graphql(/* GraphQL */ `
    query GetFavorites($params: FavoritesParams) {
        customer {
            getFavoritesV2(params: $params) {
                count
                next
                results {
                    average_score
                    colors {
                        color_code
                        id
                    }
                    id
                    label
                    min_variant {
                        id
                        cost
                        stock
                        time_delay
                        is_unlimited
                        loyalty_gift
                        primary_cost
                        max_quantity
                        profit_percent
                    }
                    main_image {
                        id
                        image
                    }
                    images {
                        id
                        image
                    }
                    hot_offer_expired_date
                    has_stock
                    orderable_count
                }
            }
        }
    }
`);
const IS_FAVORITE = graphql(/* GraphQL */ `
    query IsFavorite($id: ID!) {
        customer {
            isFavorite(id: $id) {
                is_favorite
            }
        }
    }
`);
const GET_TRANSACTION_TYPES = graphql(/* GraphQL */ `
    query GetTransactionTypes {
        customer {
            getTransactionTypes {
                gateway_type
                persian_gateway_type
            }
        }
    }
`);
const GET_LOYALTY_LOGS = graphql(/* GraphQL */ `
    query GetLoyaltyLogs($params: LoyaltyLogsParams) {
        customer {
            getLoyaltyLogs(params: $params) {
                count
                next
                results {
                    account_credit
                    amount
                    created_at
                    data {
                        game
                    }
                    id
                    log_type_display
                    order_cost
                    reason
                }
            }
        }
    }
`);
const GET_APPROXIMATE_SENDING_DATE = graphql(/* GraphQL */ `
    query getApproximateSendingDate($addressId: ID!, $id: ID!) {
        customer {
            getShippingAddress(address_id: $addressId, id: $id) {
                approximate_sending_date {
                    start
                    end
                }
            }
        }
    }
`);
const GET_THEME_CUSTOMIZATION = graphql(/* GraphQL */ `
    query GetThemeCustomization($themeName: String) {
        customer {
            getThemeCustomization(themeName: $themeName) {
                id
                data
            }
        }
    }
`);
const GET_USER_TYPE = graphql(/* GraphQL */ `
    query GetUserType {
        customer {
            getUserType {
                type
            }
        }
    }
`);
const GET_VARIANTS_STOCK = graphql(/* GraphQL */ `
    query GetVariantsStock($ids: [ID!]!) {
        customer {
            getVariantsStock(ids: $ids) {
                id
                orderable_count
            }
        }
    }
`);
const GET_BLOG_ARTICLES = graphql(/* GraphQL */ `
    query GetBlogArticles($params: blogArticlesParams) {
        customer {
            getBlogArticles(params: $params) {
                count
                next
                previous
                results {
                    id
                    title
                    content
                    published_at
                    view_count
                    like_count
                    tags {
                        id
                        title
                    }
                    category {
                        id
                        title
                        parent
                    }
                    image
                    is_active
                    is_liked
                    is_highlight
                    slug
                }
            }
        }
    }
`);
const GET_BLOG_HIGHLIGHTS = graphql(/* GraphQL */ `
    query GetBlogHighlights($params: blogHighlightsParams) {
        customer {
            getBlogHighlights(params: $params) {
                count
                next
                previous
                results {
                    id
                    article {
                        id
                        title
                        image
                        slug
                    }
                }
            }
        }
    }
`);
const GET_BLOG_ARTICLE = graphql(/* GraphQL */ `
    query GetBlogArticle($id: ID!) {
        customer {
            getBlogArticle(id: $id) {
                id
                title
                content
                published_at
                view_count
                tags {
                    id
                    title
                }
                category {
                    id
                    title
                    parent
                }
                image
                is_active
                is_liked
                like_count
                is_highlight
                slug
            }
        }
    }
`);
const GET_SITE_MAP = graphql(/* GraphQL */ `
    query getSitemap {
        customer {
            getSitemap
        }
    }
`);
const GET_WEBSOCKET_NOTIF = graphql(/* GraphQL */ `
    query GetTokenPanel {
        notification {
            getToken {
                token
            }
        }
    }
`);
const GET_SHIPPING_ADDRESS_SOCKET = graphql(/* GraphQL */ `
    query getShippingSokect($addressId: ID!) {
        customer {
            getShippingSokect(address_id: $addressId) {
                cost
                id
                name
                shipping_delay
                shipping_type
                shipping_type_display
                time_sending
            }
        }
    }
`);

const useDidUpdateEffect = (effect, deps) => {
    const didMountRef = React.useRef(false);
    React.useEffect(() => {
        if (didMountRef.current)
            return effect();
        else
            didMountRef.current = true;
    }, deps);
};

const useProductsSearchParams = (query, limit = 12) => {
    const { search, custom_option_values, categoryNames, ordering, minimum_cost, maximum_cost, has_discount, has_stock, page, is_hot_offer, product_ids, } = query;
    return {
        ...(search && { search: decodeURIComponent(search) }),
        ...(custom_option_values
            ? typeof custom_option_values === 'string'
                ? { custom_option_values: [custom_option_values] }
                : { custom_option_values }
            : {}),
        ...(Array.isArray(categoryNames) && categoryNames?.length && { category: query.categoryNames[0] }),
        ...(ordering && { ordering }),
        ...(+minimum_cost && { minimum_cost: +minimum_cost }),
        ...(+maximum_cost && { maximum_cost: +maximum_cost }),
        ...(has_discount === 'true' && { has_discount: true }),
        ...(has_stock === 'true' && { has_stock: true }),
        offset: page ? (+page - 1) * 12 : 0,
        limit,
        ...(is_hot_offer && { is_hot_offer }),
        ...(product_ids && { product_ids }),
    };
};

const apolloError = (e) => {
    if (!e)
        return {};
    const { graphQLErrors } = e;
    let errors = {};
    if (!graphQLErrors || !graphQLErrors?.length || !graphQLErrors[0]?.extensions?.response?.body)
        return {};
    if (graphQLErrors) {
        graphQLErrors.map(({ extensions: { response: { body }, }, }) => {
            if (body && typeof body === 'object' && Object.keys(body).length) {
                for (const i in body) {
                    errors = {
                        ...errors,
                        [i]: Array.isArray(body[i]) ? body[i][0] : body[i],
                    };
                }
            }
        });
    }
    return errors;
};

const useProductsFilterParams = (skip) => {
    const { pathname, replace, query } = Router.useRouter();
    const searchParams = React.useMemo(() => useProductsSearchParams(query), [query]);
    const { data, loading, error } = client.useQuery(GET_PRODUCT_FILTER_PARAMS, {
        skip,
        variables: {
            params: searchParams.category ? { category: searchParams.category } : {},
        },
    });
    const [_search, setSearch] = React.useState(searchParams.search ?? '');
    const [selectedOptionValues, setSelectedOptionValues] = React.useState(searchParams.custom_option_values ?? []);
    const [selectedCategory, setSelectedCategory] = React.useState(searchParams.category ?? '');
    const [selectedHasDiscount, setSelectedHasDiscount] = React.useState(!!searchParams.has_discount);
    const [selectedHasStock, setSelectedHasStock] = React.useState(!!searchParams.has_stock);
    const [selectedCost, setSelectedCost] = React.useState([
        searchParams?.minimum_cost ?? 0,
        searchParams?.maximum_cost ?? 0,
    ]);
    const orderingOptions = [
        {
            key: 'mostSale',
            value: 'MOST_SALE',
        },
        {
            key: 'costMin',
            value: 'COST_MIN',
        },
        {
            key: 'costMax',
            value: 'COST_MAX',
        },
        {
            key: 'newest',
            value: 'NEWEST',
        },
    ];
    useDidUpdateEffect(() => {
        const timeout = setTimeout(() => {
            const _query = { ...query };
            delete _query.page;
            replace({
                pathname,
                query: {
                    ..._query,
                    categoryNames: _query.categoryNames ? _query.categoryNames : [],
                    page: 1,
                    search: encodeURIComponent(_search),
                },
            }, undefined, { shallow: true });
        }, 1000);
        return () => clearTimeout(timeout);
    }, [_search]);
    useDidUpdateEffect(() => {
        setSelectedOptionValues(searchParams.custom_option_values ?? []);
        setSelectedHasDiscount(!!searchParams.has_discount);
        setSelectedHasStock(!!searchParams.has_stock);
        setSelectedCategory(searchParams.category ?? '');
        setSelectedCost([searchParams?.minimum_cost || 0, searchParams?.maximum_cost || 0]);
    }, [searchParams]);
    const handleSubmitCategory = () => {
        const foundCategory = flatCategories.find((category) => category.value === selectedCategory);
        replace({
            pathname,
            query: {
                categoryNames: foundCategory ? [foundCategory.value, foundCategory.key?.replace(/ /gi, '-')] : [],
            },
        }, undefined, { shallow: true });
    };
    const handleChangeCategory = async (categoryId) => {
        const foundCategory = flatCategories.find((category) => category.value === categoryId);
        setSelectedCategory(foundCategory?.value ?? '');
    };
    const handleSubmitOptionValues = () => {
        const _query = { ...Router__default["default"].query };
        delete _query.page;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
                custom_option_values: selectedOptionValues,
            },
        }, undefined, { shallow: true });
    };
    const handleChangeOptionValues = (value) => {
        const _selectedOptionValues = [...selectedOptionValues];
        const foundIndex = _selectedOptionValues.indexOf(value);
        if (foundIndex !== -1) {
            _selectedOptionValues.splice(foundIndex, 1);
        }
        else {
            _selectedOptionValues.push(value);
        }
        setSelectedOptionValues(_selectedOptionValues);
    };
    const handleSubmitCost = () => {
        const _query = { ...Router__default["default"].query };
        delete _query.page;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
                ...(selectedCost[0] && { minimum_cost: selectedCost[0] }),
                ...(selectedCost[1] && { maximum_cost: selectedCost[1] }),
            },
        }, undefined, { shallow: true });
    };
    const handleChangeCost = (arg) => {
        setSelectedCost(arg);
    };
    const handleChangeOrdering = (value) => {
        const _query = { ...Router__default["default"].query };
        delete _query.page;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
                ordering: value,
            },
        }, undefined, { shallow: true });
    };
    const handleChangeDiscount = async () => {
        let _hasDiscount = false;
        setSelectedHasDiscount((prevState) => {
            _hasDiscount = !prevState;
            return !prevState;
        });
        const _query = { ...Router__default["default"].query };
        delete _query.page;
        delete _query.has_discount;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
                ...(_hasDiscount ? { has_discount: true } : {}),
            },
        }, undefined, { shallow: true });
    };
    const handleChangeHasStock = () => {
        let _hasStock = false;
        setSelectedHasStock((prevState) => {
            _hasStock = !prevState;
            return !prevState;
        });
        const _query = { ...Router__default["default"].query };
        delete _query.page;
        delete _query.has_stock;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
                ...(_hasStock ? { has_stock: true } : {}),
            },
        }, undefined, { shallow: true });
    };
    const handleSubmitOtherFilters = async () => {
        const _query = { ...Router__default["default"].query };
        delete _query.page;
        delete _query.has_discount;
        delete _query.has_stock;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
                ...(selectedHasDiscount ? { has_discount: true } : {}),
                ...(selectedHasStock ? { has_stock: true } : {}),
            },
        }, undefined, { shallow: true });
    };
    const handleClearAllFilters = () => {
        replace({
            pathname,
            query: {
                categoryNames: query.categoryNames ? query.categoryNames : [],
            },
        }, undefined, { shallow: true });
    };
    const handleClear = (paramName, id) => {
        const _query = JSON.parse(JSON.stringify(Router__default["default"].query));
        if (paramName === 'custom_option_values' && id) {
            if (typeof _query[paramName] === 'string') {
                delete _query[paramName];
            }
            if (Array.isArray(_query[paramName])) {
                const foundIndex = _query[paramName].indexOf(id);
                if (foundIndex !== -1) {
                    _query[paramName].splice(foundIndex, 1);
                }
            }
        }
        else if (paramName === 'cost') {
            delete _query['minimum_cost'];
            delete _query['maximum_cost'];
        }
        else {
            delete _query[paramName];
        }
        delete _query.page;
        replace({
            pathname,
            query: {
                ..._query,
                categoryNames: _query.categoryNames ? _query.categoryNames : [],
            },
        }, undefined, { shallow: true });
    };
    const ordering = React.useMemo(() => {
        return {
            options: orderingOptions.map((i) => ({
                ...i,
                handleChange: () => handleChangeOrdering(i.value),
                isSelected: searchParams.ordering === i.value,
            })),
        };
    }, [searchParams.ordering]);
    const search = React.useMemo(() => {
        return {
            value: _search,
            handleChange: (value) => setSearch(value),
        };
    }, [_search]);
    const cost = React.useMemo(() => {
        const _cost = {
            value: selectedCost,
            initialValue: [0, 0],
            handleChange: handleChangeCost,
            handleSubmit: handleSubmitCost,
        };
        if (data?.customer?.productFiltering) {
            const { customer: { productFiltering: params }, } = data;
            _cost.initialValue = [params.minimum_cost, params.maximum_cost];
        }
        return _cost;
    }, [data, selectedCost]);
    const categories = React.useMemo(() => {
        const _categories = {
            handleSubmit: handleSubmitCategory,
            options: [],
        };
        if (data?.customer?.productFiltering) {
            const { customer: { productFiltering: params }, } = data;
            /*TODO: uncomment this code if category does not return from product filtering query but category is selected otherwise leave this alone

            if (!params.custom_categories.length && query.categoryNames?.length === 2) {
                const _categoryId: string = query.categoryNames[0];
                const _categoryTitle: string = query.categoryNames[1];

                _categories.options.push({
                    key: _categoryTitle,
                    value: _categoryId,
                    isSelected: selectedCategory === _categoryId,
                    categories: [],
                    handleChange: () => handleChangeCategory(_categoryId),
                });
            } else
            */
            _categories.options = params.custom_categories.map((i) => ({
                key: i.title,
                value: i.id,
                isSelected: selectedCategory.includes(i.id),
                categories: i.child_categories.map((j) => ({
                    key: j.title,
                    value: j.id,
                    isSelected: selectedCategory.includes(j.id),
                    categories: [],
                    handleChange: () => handleChangeCategory(j.id),
                })),
                handleChange: () => handleChangeCategory(i.id),
            }));
        }
        return _categories;
    }, [data, selectedCategory]);
    const flatCategories = React.useMemo(() => {
        let _allCategories = [...categories.options];
        categories.options.forEach((item) => {
            if (item?.categories)
                _allCategories = _allCategories.concat([...item.categories]);
        });
        return _allCategories;
    }, [categories]);
    const specifications = React.useMemo(() => {
        const _specifications = [];
        if (data?.customer?.productFiltering) {
            const { customer: { productFiltering: params }, } = data;
            if (params.colors.length) {
                _specifications.push({
                    name: 'رنگ',
                    handleSubmit: handleSubmitOptionValues,
                    options: params.colors.map((i) => {
                        const [key, value, colorCode] = i;
                        return {
                            key,
                            name: 'رنگ',
                            value,
                            colorCode,
                            isSelected: selectedOptionValues.includes(value),
                            handleChange: () => handleChangeOptionValues(value),
                        };
                    }),
                });
            }
            params.options.map((i) => {
                _specifications.push({
                    name: i.name,
                    handleSubmit: handleSubmitOptionValues,
                    options: i.option_values.map(([key, value]) => ({
                        key,
                        value,
                        name: i.name,
                        isSelected: selectedOptionValues.includes(value),
                        handleChange: () => handleChangeOptionValues(value),
                    })),
                });
            });
        }
        return _specifications;
    }, [data, selectedOptionValues]);
    const otherFilters = React.useMemo(() => {
        return {
            has_discount: {
                value: selectedHasDiscount,
                handleChange: handleChangeDiscount,
                handleSubmit: handleSubmitOtherFilters,
            },
            in_stock: {
                value: selectedHasStock,
                handleChange: handleChangeHasStock,
                handleSubmit: handleSubmitOtherFilters,
            },
        };
    }, [selectedHasDiscount, selectedHasStock]);
    const selectedFilters = React.useMemo(() => {
        const _selectedCost = query.minimum_cost || query.maximum_cost
            ? [
                {
                    name: `از ${query.minimum_cost && +query.minimum_cost ? query.minimum_cost : cost.initialValue[0]} تا ${query.maximum_cost && +query.maximum_cost ? query.maximum_cost : cost.initialValue[1]}`,
                    handleClear: () => handleClear('cost'),
                },
            ]
            : [];
        const _selectedSpecifications = specifications
            .map(({ options }) => options)
            .flat()
            .filter(({ isSelected, value }) => isSelected && query.custom_option_values?.includes(value))
            .map(({ name, key, value }) => ({
            name: `${name} ${key}`,
            handleClear: () => handleClear('custom_option_values', value),
        }));
        const _selectedOtherFilters = [];
        if (otherFilters.in_stock.value) {
            _selectedOtherFilters.push({
                name: 'فقط کالاهای موجود',
                handleClear: () => handleClear('has_stock'),
            });
        }
        if (otherFilters.has_discount.value) {
            _selectedOtherFilters.push({
                name: 'فقط کالاهای تخفیف دار',
                handleClear: () => handleClear('has_discount'),
            });
        }
        return [..._selectedCost, ..._selectedSpecifications, ..._selectedOtherFilters];
    }, [cost, query.custom_option_values, otherFilters, query.minimum_cost, query.maximum_cost]);
    const updateStates = () => {
        setSelectedOptionValues(searchParams.custom_option_values ?? []);
        setSelectedHasDiscount(!!searchParams.has_discount);
        setSelectedHasStock(!!searchParams.has_stock);
        setSelectedCategory(searchParams.category ?? '');
        setSelectedCost([searchParams?.minimum_cost || 0, searchParams?.maximum_cost || 0]);
    };
    return {
        search,
        specifications,
        categories,
        cost,
        ordering,
        others: otherFilters,
        selectedFilters,
        handleClearAllFilters,
        updateStates,
        loading,
        error: apolloError(error),
    };
};

const handleCreateOptionValue = (optionValue) => {
    if (!Array.isArray(optionValue))
        throw new Error('optionValue is an array!');
    if (!optionValue?.length)
        return [];
    return optionValue.map((i) => ({
        name: i.option?.name,
        value: i.value,
        ...(i.option?.is_color && { colorCode: i.color_code }),
    }));
};

const useMiniProduct = (product) => {
    const { min_variant, details } = product;
    const variant = min_variant || details?.variant;
    const orderItemId = product.id;
    const id = product.id || variant?.id;
    const variantId = variant?.id;
    const tax = product.min_variant.tax;
    const singleTax = product.min_variant.single_tax;
    const label = product?.label || variant?.product_serialized?.label || '';
    const image = product?.main_image?.image ||
        product?.image?.image ||
        variant?.images?.at(0)?.image ||
        variant?.product_serialized?.images?.at(0)?.image ||
        '';
    const images = product?.images?.map((image) => image?.image) || [];
    const primaryCost = variant?.primary_cost;
    const cost = variant?.cost;
    const optionValues = variant?.option_values || [];
    const amount = product?.unit_amount || 1;
    const hot_offer_expired_date = product?.hot_offer_expired_date;
    const colors = product?.colors || [];
    const singleCost = product?.single_cost;
    return {
        label,
        id,
        variantId,
        orderItemId,
        image,
        images,
        colors,
        cost: cost * amount,
        primaryCost: primaryCost * amount,
        tax,
        singleTax,
        optionValues: handleCreateOptionValue(optionValues),
        link: {
            href: {
                pathname: '/product/[...product]',
                query: {
                    product: [id, label?.replace(/ /gi, '-')],
                },
            },
        },
        amount,
        singleCost,
        ...(hot_offer_expired_date && { hotOfferExpireDate: new Date(hot_offer_expired_date) }),
        isHotOffer: !!hot_offer_expired_date,
        discountPercent: primaryCost - cost > 0 ? (((primaryCost - cost) / primaryCost) * 100).toFixed() : 0,
        orderable_count: product?.orderable_count,
    };
};

const usePagination = (data, searchParams, limit = 10) => {
    const { query, push, pathname } = Router.useRouter();
    const handleChangePage = async (page) => {
        await push({
            pathname,
            query: {
                ...query,
                page,
            },
        });
    };
    return React.useMemo(() => {
        const _pagination = {
            page: query.page ? +query.page : 1,
            count: 0,
            hasNextPage: false,
            pageCount: 0,
            handleChangePage,
        };
        if (data) {
            const { count, next } = data;
            _pagination.count = count;
            _pagination.hasNextPage = !!next;
            _pagination.pageCount = Math.ceil(Math.fround(count / limit));
        }
        return _pagination;
    }, [data, searchParams]);
};

const StoreContext = React.createContext({});
StoreContext.displayName = 'StoreContext';

const useStore = () => React.useContext(StoreContext);

const limit = 12;
const useProducts = (customQuery = {}) => {
    const { query: q } = Router.useRouter();
    const query = { ...q, ...customQuery };
    const [offset, setOffset] = React.useState(0);
    const { basket } = useStore();
    const searchParams = React.useMemo(() => useProductsSearchParams(query, limit), [query]);
    const filterParams = useProductsFilterParams(!!Object.keys(customQuery).length);
    const { data, loading, error, fetchMore } = client.useQuery(GET_PRODUCTS, {
        variables: {
            params: searchParams,
        },
    });
    const pagination = usePagination(data?.customer?.getProducts, searchParams, limit);
    const handleLoadMore = async () => {
        if (error)
            return;
        await fetchMore({
            variables: {
                params: {
                    ...searchParams,
                    offset: offset + limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getProducts: {
                            ...previousResult.customer.getProducts,
                            count: fetchMoreResult.customer.getProducts.count,
                            next: fetchMoreResult.customer.getProducts.next,
                            results: [
                                ...previousResult.customer.getProducts.results,
                                ...fetchMoreResult.customer.getProducts.results,
                            ],
                        },
                    },
                };
            },
        });
    };
    const products = React.useMemo(() => data?.customer?.getProducts?.results.map((product) => useMiniProduct(product)) || [], [data]);
    const handleAddToBasket = (id) => {
        const miniProduct = products.find((P) => P.id === id);
        if (miniProduct) {
            basket.handleAddToBasket({
                image: { image: miniProduct.images[0] || undefined },
                amount: 1,
                product_label: miniProduct.label,
                bonus_value: 0,
                has_loyalty_gift: (miniProduct.loyalty_gift || 0) > 0,
                product_id: miniProduct.id,
                option_values: handleCreateOptionValue(miniProduct.optionValues || []),
                online_cost: miniProduct.cost,
                online_primary_cost: miniProduct.primaryCost,
                variant_id: miniProduct.variantId ? parseInt(miniProduct.variantId) : '',
                variant_name: miniProduct.label,
                orderable_count: miniProduct.orderable_count,
                tax: miniProduct.tax ? miniProduct.tax : 0,
                single_tax: miniProduct.singleTax,
            });
        }
    };
    return {
        data: {
            products,
            hotOfferLink: '/hot-offer',
        },
        ...(!Object.keys(customQuery).length && { filterParams }),
        loading,
        error: apolloError(error),
        handleLoadMore,
        handleAddToBasket,
        hasMore: !!data?.customer.getProducts.next,
        count: data?.customer.getProducts.count ?? 0,
        pagination,
        next: data?.customer.getProducts.next,
    };
};

const useVariants = (product) => {
    const [selectedVariant, setSelectedVariant] = React.useState(null);
    const [selectedOptionValues, setSelectedOptionValues] = React.useState([]);
    const variants = React.useMemo(() => {
        return product?.variants?.length
            ? product.variants.map((variant) => ({
                ...variant,
                profit_percent: ((variant.primary_cost - variant.cost) * 100) / variant.primary_cost,
            }))
            : [];
    }, [product]);
    const uniqueOptions = React.useMemo(() => {
        const uniqueOptions = [];
        const uniqueOptionValues = [];
        if (product && !!variants?.length) {
            variants.forEach((variant) => {
                variant.option_values?.forEach((optionValue) => {
                    const selectedOption = uniqueOptions.find((option) => option.id === optionValue.option.id);
                    if (!selectedOption)
                        uniqueOptions.push({ ...optionValue.option });
                });
            });
            variants.forEach((variant) => {
                variant.option_values?.forEach((optionValue) => {
                    const selectedOptionValue = uniqueOptionValues.find((value) => value.id === optionValue.id);
                    if (!selectedOptionValue)
                        uniqueOptionValues.push({ ...optionValue });
                });
            });
            uniqueOptions.forEach((option) => {
                const values = uniqueOptionValues.filter((value) => value.option.id === option.id);
                option.values = [...values];
            });
        }
        return uniqueOptions;
    }, [product]);
    React.useEffect(() => {
        if (product && variants.length) {
            const validVariants = variants.filter((variant) => variant.is_active && variant?.orderable_count !== 0);
            if (validVariants.length) {
                const cheapestValid = validVariants.reduce((prev, curr) => prev.cost > curr.cost ? curr : prev);
                setSelectedVariant(cheapestValid);
                if (cheapestValid.option_values)
                    setSelectedOptionValues(cheapestValid.option_values);
                // return cheapestValid;
            }
            else
                setSelectedVariant(variants[0]);
        }
    }, [product]);
    const handleSelectedVariant = (newValue) => {
        if (variants[0].option_values?.length) {
            const newOptionValues = selectedOptionValues.map((value) => {
                if (value.option.id === newValue.option.id)
                    return newValue;
                else
                    return value;
            });
            if (newOptionValues && !!newOptionValues.length)
                setSelectedOptionValues(newOptionValues);
            const newVariant = variants.find((variant) => {
                const isNewVariant = variant.option_values?.every((value) => newOptionValues.some((opt) => opt.id === value.id));
                if (isNewVariant)
                    return variant;
            });
            if (newVariant)
                setSelectedVariant(newVariant);
            else
                setSelectedVariant(null);
        }
    };
    const handleOptionValueIsSelected = (id) => selectedOptionValues.some((value) => value?.id === id);
    return {
        options: uniqueOptions,
        variants,
        selectedVariant,
        handleSelectedVariant,
        handleOptionValueIsSelected,
    };
};

const useImages = (product) => {
    const images = React.useMemo(() => {
        const allImages = [];
        if (product?.chosen_image)
            allImages.push(product?.chosen_image);
        if (product?.images?.length) {
            product?.images.forEach((image) => {
                if (product?.chosen_image) {
                    if (image.id !== product?.chosen_image.id)
                        allImages.push(image);
                }
                else {
                    allImages.push(image);
                }
            });
        }
        product?.variants.forEach((variant) => {
            if (variant?.images.length)
                allImages.push(variant?.images[0]);
        });
        return allImages;
    }, [product]);
    return {
        images,
    };
};

// import { DocumentNode, gql, OperationVariables, TypedDocumentNode } from '@apollo/client';
const GET_COOKIE = graphql(/* GraphQL */ `
    mutation GetCookie($content: TokenContent!) {
        user {
            getCookie(content: $content) {
                access
                refresh
            }
        }
    }
`);
const GET_TOKEN = graphql(/* GraphQL */ `
    mutation GetToken($content: TokenContent!) {
        user {
            getToken(content: $content) {
                access
                refresh
            }
        }
    }
`);
const GET_REFRESH_TOKEN = graphql(/* GraphQL */ `
    mutation GetRefreshToken($content: RefreshTokenContent!) {
        user {
            getRefreshToken(content: $content) {
                access
            }
        }
    }
`);
const CREATE_PROFILE = graphql(/* GraphQL */ `
    mutation CreateProfile($content: ProfileContent) {
        customer {
            createProfile(content: $content) {
                first_name
                last_name
            }
        }
    }
`);
const OTP_SEND = graphql(/* GraphQL */ `
    mutation OtpSend($content: OTPSendContent) {
        customer {
            otpSend(content: $content)
        }
    }
`);
const OTP_SEND_V2 = graphql(/* GraphQL */ `
    mutation OtpSendV2($content: OTPSendContent) {
        customer {
            otpSendV2(content: $content) {
                is_forget_password
                is_register
            }
        }
    }
`);
const OTP_SEND_SIGNUP = graphql(/* GraphQL */ `
    mutation otpSendSignup($content: GetTokenByOTPSingUpContent) {
        customer {
            otpSendSignup(content: $content) {
                refresh
                access
            }
        }
    }
`);
const GET_CHANGE_AUTH_PASSWORD = graphql(/* GraphQL */ `
    mutation GetChangePasswordAuth($content: GetTokenByOTPContent) {
        customer {
            getChangePasswordAuth(content: $content) {
                auth
            }
        }
    }
`);
const FORGET_PASSWORD = graphql(/* GraphQL */ `
    mutation ForgetPassword($content: ForgetPasswordContent) {
        customer {
            forgetPassword(content: $content)
        }
    }
`);
const CHANGE_PASSWORD_WITHOUT_OTP = graphql(/* GraphQL */ `
    mutation ChangePasswordWithoutOtp($content: ChangePasswordWithoutOtpContent) {
        customer {
            changePasswordWithoutOtp(content: $content)
        }
    }
`);
const UPDATE_NOTIFICATION_SETTINGS = graphql(/* GraphQL */ `
    mutation UpdateNotificationSetting($content: NotificationSettingContent) {
        customer {
            updateNotificationSetting(content: $content) {
                hot_offer_available_email_notify
                id
                product_available_sms_notify
                product_available_email_notify
                product_available_internal_notify
                hot_offer_available_sms_notify
                hot_offer_available_internal_notify
                receive_order_sms_notify
                receive_order_email_notify
                receive_order_internal_notify
                order_invoice_sms_notify
                order_invoice_email_notify
                order_invoice_internal_notify
                return_invoice_sms_notify
                return_invoice_email_notify
                return_invoice_internal_notify
                survey_sms_notify
                survey_email_notify
                survey_internal_notify
            }
        }
    }
`);
const UPDATE_PROFILE = graphql(/* GraphQL */ `
    mutation UpdateProfile($content: ProfileContent) {
        customer {
            updateProfile(content: $content) {
                id
                phone_number
                national_code
                telephone_number
                sheba_number
                card_number
                birthday
                gender
                marriage_date
                first_name
                last_name
                email
                gender_display
            }
        }
    }
`);
const PAYMENT_CARD = graphql(/* GraphQL */ `
    mutation PaymentCard($orderId: ID!, $image: Upload!) {
        customer {
            paymentCard(orderId: $orderId, image: $image)
        }
    }
`);
const UPDATE_BASKET = graphql(/* GraphQL */ `
    mutation UpdateBasket($uuid: String, $content: UpdateBasketContent) {
        customer {
            updateBasket(content: $content, uuid: $uuid) {
                id
                temp_id
                basket_items {
                    product_id
                    amount
                    cost
                    cost_change
                    discount_amount
                    has_loyalty
                    id
                    image {
                        id
                        image
                    }
                    is_unlimited
                    loyalty_gift
                    max_quantity
                    online_cost
                    online_primary_cost
                    option_values {
                        id
                        value
                        option {
                            id
                            name
                            is_color
                        }
                        color_code
                    }
                    primary_cost
                    product_label
                    stock
                    orderable_count
                    variant_name
                    variant_id
                    tax
                    single_tax
                    bonus_value
                }
            }
        }
    }
`);
const VOUCHER_CHECK = graphql(/* GraphQL */ `
    mutation VoucherCheck($content: VoucherCheckContent!) {
        customer: promotion {
            voucherCheck(content: $content) {
                amount
                code
                expire_date
                id
                limit
                start_date
                voucher_type
                voucher_type_display
            }
        }
    }
`);
const REMOVE_FAVORITES = graphql(/* GraphQL */ `
    mutation RemoveFavorite($id: ID!) {
        customer {
            removeFavorite(id: $id)
        }
    }
`);
const ADD_FAVORITES = graphql(/* GraphQL */ `
    mutation AddFavorite($id: ID!) {
        customer {
            addFavorite(id: $id)
        }
    }
`);
const CREATE_ORDER = graphql(/* GraphQL */ `
    mutation CreateOrder($content: CreateOrderContent) {
        customer {
            createOrder(content: $content) {
                id
                gateway_link
                transaction_type
                registration_type
            }
        }
    }
`);
const DELETE_ADDRESS = graphql(/* GraphQL */ `
    mutation DeleteAddress($id: ID!) {
        customer {
            deleteAddress(id: $id)
        }
    }
`);
const CREATE_ADDRESS = graphql(/* GraphQL */ `
    mutation CreateAddress($content: AddressContent) {
        customer {
            createAddress(content: $content) {
                city
                province
                address
                no
                postal_code
                id
                unit_number
                description
                receiver_name
                receiver_lastname
                receiver_number
                name
                longitude
                latitude
            }
        }
    }
`);
const UPDATE_ADDRESS = graphql(/* GraphQL */ `
    mutation PartialUpdateAddress($id: ID!, $content: AddressContent) {
        customer {
            partialUpdateAddress(id: $id, content: $content) {
                city
                province
                address
                no
                postal_code
                id
                unit_number
                description
                receiver_name
                receiver_lastname
                receiver_number
                name
                longitude
                latitude
            }
        }
    }
`);
const GET_GATEWAY = graphql(/* GraphQL */ `
    mutation GetGateway($id: ID, $content: GatewayLinkUrlContent!) {
        customer {
            getGateway(id: $id, content: $content) {
                gateway_link
            }
        }
    }
`);
const CLEAR_COOKIE = graphql(/* GraphQL */ `
    mutation ClearCookie {
        user {
            clearCookie
        }
    }
`);
const CANCEL_ORDER = graphql(/* GraphQL */ `
    mutation CancelOrder($id: ID!) {
        customer {
            cancelOrder(id: $id)
        }
    }
`);
const UPDATE_RECIEVE_STATUS = graphql(/* GraphQL */ `
    mutation UpdateReceiveStatus($orderId: ID!, $content: UpdateReceiveStatusContent!) {
        customer {
            updateReceiveStatus(id: $orderId, content: $content)
        }
    }
`);
const RETURN_ORDER = graphql(/* GraphQL */ `
    mutation ReturnOrder($content: ReturnOrderContent) {
        customer {
            returnOrder(content: $content) {
                id
                status
                reference_code
                order_reference_code
                created_at
                items {
                    id
                    status_display
                    reason
                    returned_cost
                    count
                    description
                    reply_reason
                    reply_description
                    relative_voucher_amount
                }
                status_display
                order_created_at
                first_name
                last_name
                phone_number
                card_number
                total_returned_cost
            }
        }
    }
`);
const UPDATE_THEME_CUSTOMIZATION = graphql(/* GraphQL */ `
    mutation UpdateThemeCustomization($themeName: String, $data: JSON) {
        customer {
            updateThemeCustomization(themeName: $themeName, data: $data) {
                id
                data
            }
        }
    }
`);
const CREATE_THEME_CUSTOMIZATION = graphql(/* GraphQL */ `
    mutation CreateThemeCustomization($themeName: String, $data: JSON) {
        customer {
            createThemeCustomization(themeName: $themeName, data: $data) {
                id
                data
            }
        }
    }
`);
const CREATE_STORE_OPENING_STORE_NOTIFIER = graphql(/* GraphQL */ `
    mutation CreateStoreOpeningNotifier($content: CreateStoreOpeningNotifierContent) {
        customer {
            createStoreOpeningNotifier(content: $content)
        }
    }
`);
const UPLOAD_IMAGE = graphql(/* GraphQL */ `
    mutation UploadImage($file: Upload!) {
        item {
            uploadImage(file: $file) {
                id
                uuid
                image
            }
        }
    }
`);
const LIKE_BLOG_ARTICLE = graphql(/* GraphQL */ `
    mutation LikeBlogArticle($id: ID!) {
        customer {
            likeBlogArticle(id: $id) {
                article {
                    id
                    title
                    content
                    published_at
                    view_count
                    tags {
                        id
                        title
                    }
                    category {
                        id
                        title
                        parent
                    }
                    image
                    is_active
                    is_liked
                    like_count
                    is_highlight
                    slug
                }
            }
        }
    }
`);
const updateProfileMutatuin = () => {
    const [updateProfile, { loading: updateProfileLoading }] = client.useMutation(UPDATE_PROFILE);
    return {
        updateProfile,
        updateProfileLoading,
    };
};

const isUserLoggedIn = () => {
    const data = exports.apolloLocalState.readQuery({ query: GET_PROFILE });
    return !!data?.customer?.getProfile;
};

const useProduct = () => {
    const { query } = Router.useRouter();
    const { basket } = useStore();
    const { data: d, loading, error, } = client.useQuery(GET_PRODUCT, {
        variables: {
            id: query.product?.length ? query.product[0] : '0',
        },
        skip: !query.product || !query.product?.length,
    });
    const product = d?.customer.getProduct;
    const data = React.useMemo(() => {
        return product || {};
    }, [product]);
    const [addToFavorites, { loading: addFavoriteLoading }] = client.useMutation(ADD_FAVORITES);
    const [removeFromFavorites, { loading: removeFavoriteLoading }] = client.useMutation(REMOVE_FAVORITES);
    const { options, selectedVariant, handleSelectedVariant, variants, handleOptionValueIsSelected } = useVariants(product);
    const { images } = useImages(product);
    const { label, voter_number, average_score, profit_percent, productId, category, tax, has_loyalty_gift, feedback_count, single_tax, } = React.useMemo(() => {
        return {
            productId: data?.id,
            category: data?.category,
            tax: data?.tax,
            label: data?.label,
            voter_number: data?.voter_number,
            average_score: Math.round((data?.average_score || 0) * 10) / 10,
            profit_percent: data?.profit_percent,
            feedback_count: data?.feedback_count,
            has_loyalty_gift: data?.has_loyalty_gift,
            single_tax: data?.tax,
        };
    }, [data]);
    // const { data: favoriteData } = useQuery(queries.IS_FAVORITE, {
    //     skip: !isUserLoggedIn() || !productId,
    //     variables: { id: productId },
    // });
    const handleAddToBasket = (onCompleted) => {
        if (selectedVariant && !!Object.keys(selectedVariant)?.length) {
            basket.handleAddToBasket({
                image: selectedVariant?.images?.length ? selectedVariant?.images[0] : images[0],
                amount: 1,
                product_label: label,
                bonus_value: 0,
                has_loyalty_gift: has_loyalty_gift,
                tax: tax ? tax : 0,
                product_id: productId,
                option_values: handleCreateOptionValue(selectedVariant?.option_values || []),
                online_cost: selectedVariant?.cost,
                online_primary_cost: selectedVariant?.primary_cost,
                variant_id: +selectedVariant?.id,
                variant_name: label,
                orderable_count: selectedVariant?.orderable_count,
                single_tax: single_tax,
            });
            onCompleted?.();
        }
    };
    const addOrRemoveToFavorites = async () => {
        if (productId && isUserLoggedIn()) {
            if (data?.is_favorite)
                await removeFromFavorites({
                    variables: { id: productId },
                    refetchQueries: [GET_PRODUCT, 'Product'],
                });
            else
                await addToFavorites({
                    variables: { id: productId },
                    refetchQueries: [GET_PRODUCT, 'Product'],
                });
        }
    };
    const stockUpdatedSelectedVariant = React.useMemo(() => {
        if (!selectedVariant)
            return null;
        const itemInBasket = basket.data.items.find((item) => item?.variant_id == selectedVariant?.id);
        if (itemInBasket)
            return { ...selectedVariant, orderable_count: itemInBasket?.orderable_count };
        return selectedVariant;
    }, [selectedVariant, basket.data.items]);
    return {
        data: {
            images,
            category,
            options,
            selectedVariant: stockUpdatedSelectedVariant,
            variants,
            label,
            voter_number,
            feedback_count,
            average_score,
            profit_percent,
            description: data?.description,
            features: data?.features,
            is_favorite: !!data?.is_favorite,
        },
        handleSelectedVariant,
        handleOptionValueIsSelected,
        handleAddToBasket,
        updateBasketLoading: basket.updateBasketLoading,
        addOrRemoveToFavorites,
        favoriteLoading: addFavoriteLoading || removeFavoriteLoading,
        loading,
        error: apolloError(error),
    };
};

const useSuggestionProducts = () => {
    const { query } = Router.useRouter();
    const { data, loading, error } = client.useQuery(GET_SUGGESTION_PRODUCTS, {
        variables: {
            productId: query.product?.length ? query.product[0] : '0',
        },
        skip: !query.product || !query.product?.length,
    });
    const products = React.useMemo(() => data?.customer.getSuggestionProducts?.results.map((product) => useMiniProduct(product)) || [], [data]);
    return {
        data: products,
        loading,
        error: apolloError(error),
    };
};

const useUser = () => {
    const { error: fetchError, loading: fetchLoading, data, refetch, networkStatus, } = client.useQuery(GET_PROFILE, {
        fetchPolicy: 'cache-only',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
    });
    const { data: loyaltyCreditQueryData } = client.useQuery(GET_LOYALTY_CREDIT, {
        skip: !isUserLoggedIn(),
    });
    const { data: userTypeData } = client.useQuery(GET_USER_TYPE, {
        skip: !isUserLoggedIn(),
    });
    const [updateProfile, { loading: updateLoading }] = client.useMutation(UPDATE_PROFILE);
    const [changePass, { loading: changePassLoading }] = client.useMutation(CHANGE_PASSWORD_WITHOUT_OTP);
    const [error, setError] = React.useState({});
    const [user, setUser] = React.useState({
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
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [loyaltyCreditStateData, setLoyaltyCreditStateData] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    React.useEffect(() => {
        if (fetchError) {
            setError(apolloError(fetchError));
            return;
        }
        if (data) {
            setIsLoggedIn(true);
            const info = { ...data.customer.getProfile };
            delete info['__typename'];
            delete info['id'];
            setUser(info);
        }
    }, [fetchError, data]);
    React.useEffect(() => {
        if (loyaltyCreditQueryData)
            setLoyaltyCreditStateData(+loyaltyCreditQueryData.customer.getLoyaltyCreditV2.loyalty_credit);
    }, [loyaltyCreditQueryData]);
    const handleChange = (name, value) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFetchUser = async () => {
        await refetch();
    };
    const handleSubmit = async (onCompleted) => {
        if (updateLoading)
            return;
        const { card_number, phone_number, telephone_number, first_name, last_name, national_code, marriage_date, birthday, email, } = user;
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
    const info = React.useMemo(() => user, [user]);
    const loyaltyCredit = React.useMemo(() => loyaltyCreditStateData, [loyaltyCreditStateData]);
    const handleCancel = () => {
        if (data) {
            const info = { ...data.customer.getProfile };
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
            userRole: isUserLoggedIn() ? userTypeData?.customer.getUserType.type : 'guest',
            loyaltyCredit,
        },
        loadings: {
            fetchLoading: fetchLoading || networkStatus === client.NetworkStatus.refetch,
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

const useLogin = (autoRedirectOnLogin = true) => {
    const { query, push } = Router.useRouter();
    const [loading, setLoading] = React.useState(false);
    const { basket } = useStore();
    const [getToken] = client.useMutation(GET_TOKEN);
    const [getBasket] = client.useLazyQuery(GET_BASKET);
    const [error, setError] = React.useState({});
    const user = useUser();
    const handleSubmit = async (username, password) => {
        setError({});
        return new Promise((resolve, reject) => {
            basket.setInitialSync(false);
            setLoading(true);
            getToken({
                variables: {
                    content: {
                        username,
                        password,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError: (error) => {
                    setError(apolloError(error));
                    setLoading(false);
                    reject(error);
                },
                onCompleted: async (data) => {
                    if (data?.user?.getToken?.access) {
                        localStorage.setItem('token', data.user.getToken.access);
                        if (data?.user?.getToken?.refresh)
                            localStorage.setItem('refresh_token', data.user.getToken.refresh);
                        await setNextCookie(data?.user?.getToken?.access);
                        await user.fetchUserInfo();
                        await getBasket({
                            variables: {
                                uuid: typeof window !== 'undefined' ? localStorage.getItem('basketUUID') : '',
                            },
                            fetchPolicy: 'network-only',
                            onCompleted: (data) => {
                                typeof window !== 'undefined' && data.customer.getBasket.temp_id
                                    ? localStorage.setItem('basketUUID', data.customer.getBasket.temp_id)
                                    : () => {
                                        return;
                                    };
                            },
                        });
                        setLoading(false);
                        const { _back_to, ...q } = query;
                        if (autoRedirectOnLogin) {
                            await push({
                                pathname: _back_to ? query._back_to : '/',
                                query: q,
                            });
                        }
                        resolve();
                    }
                    setLoading(false);
                },
            });
        });
    };
    return { handleSubmit, loading, error };
};

const useForgetPassword = () => {
    const [getChangeAuthPassword, { loading: getChangeAuthPasswordLoading }] = client.useMutation(GET_CHANGE_AUTH_PASSWORD);
    const [forgetPassword, { loading: forgetPasswordPasswordLoading }] = client.useMutation(FORGET_PASSWORD);
    const [step, setStep] = React.useState('verifyPhoneNumber');
    const [error, setError] = React.useState({});
    const [auth, setAuth] = React.useState('');
    const handleVerifyPhoneNumber = async (otp, phoneNumber, onCompletedMethod) => {
        setError({});
        return new Promise((resolve, reject) => {
            getChangeAuthPassword({
                variables: {
                    content: {
                        token: +otp,
                        phone_number: phoneNumber,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(e) {
                    setError(apolloError(e));
                    reject();
                },
                onCompleted(data) {
                    setStep('changePassword');
                    setAuth(data.customer.getChangePasswordAuth.auth);
                    onCompletedMethod?.();
                    resolve();
                },
            });
        });
    };
    const handleChangePassword = async (newPassword, phoneNumber, onCompletedMethod) => {
        return new Promise((resolve, reject) => {
            forgetPassword({
                variables: {
                    content: {
                        password: newPassword,
                        phone_number: phoneNumber,
                        token: auth,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(e) {
                    setError(apolloError(e));
                    reject();
                },
                onCompleted() {
                    onCompletedMethod?.();
                    resolve();
                },
            });
        });
    };
    return {
        step,
        loading: getChangeAuthPasswordLoading || forgetPasswordPasswordLoading || false,
        handleVerifyPhoneNumber,
        handleChangePassword,
        error,
    };
};

const useLogout = () => {
    const router = Router.useRouter();
    const { basket } = useStore();
    const [loading, setLoading] = React.useState(false);
    const storeId = exports.apolloLocalState.readQuery({ query: GET_STORE_INFO })?.customer.getStoreInfo.id;
    const handleLogout = async () => {
        setLoading(true);
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            await clearNextCookie();
            basket.handleLogoutBasket();
            // apolloLocalState.modify({
            //     fields: {
            //         customer(_, { INVALIDATE }) {
            //             return INVALIDATE;
            //         },
            //     },
            // });
            exports.apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getUserType' });
            exports.apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getProfile' });
            exports.apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getLoyaltyCreditV2' });
            exports.apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getAddresses' });
            exports.apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getTransactionTypes' });
            exports.apolloLocalState.evict({ id: `CustomerQuery:${storeId}`, fieldName: 'getBasket' });
            exports.apolloLocalState.gc();
            router.push({
                pathname: '/',
            });
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log('logout error: ', e);
        }
        finally {
            setLoading(false);
        }
    };
    return React.useMemo(() => ({
        handleLogout,
        loading,
    }), [loading]);
};

const useRegister = (autoRedirectOnLogin) => {
    const [getBasket] = client.useLazyQuery(GET_BASKET);
    const { query, push } = Router.useRouter();
    const user = useUser();
    const [otpSendSingup] = client.useMutation(OTP_SEND_SIGNUP);
    const [loading, setLoading] = React.useState(false);
    const handleSubmitSingUp = async (phone_number, otp, onCompletedMethod, onError) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            otpSendSingup({
                variables: {
                    content: {
                        phone_number: phone_number,
                        token: otp,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(error) {
                    onError(apolloError(error));
                    reject();
                    setLoading(false);
                },
                onCompleted: async (data) => {
                    if (data?.customer?.otpSendSignup?.access) {
                        localStorage.setItem('token', data.customer.otpSendSignup.access);
                        if (data?.customer?.otpSendSignup?.refresh)
                            localStorage.setItem('refresh_token', data.customer.otpSendSignup.refresh);
                        setNextCookie(data?.customer?.otpSendSignup?.access);
                    }
                    await user.fetchUserInfo();
                    await getBasket({
                        variables: {
                            uuid: typeof window !== 'undefined' ? localStorage.getItem('basketUUID') : '',
                        },
                        fetchPolicy: 'network-only',
                        onCompleted: (data) => {
                            typeof window !== 'undefined' && data.customer.getBasket.temp_id
                                ? localStorage.setItem('basketUUID', data.customer.getBasket.temp_id)
                                : () => {
                                    return;
                                };
                        },
                    });
                    onCompletedMethod?.();
                    const { _back_to, ...q } = query;
                    if (autoRedirectOnLogin) {
                        await push({
                            pathname: _back_to ? query._back_to : '/',
                            query: q,
                        });
                    }
                    setLoading(false);
                    resolve();
                },
            });
        });
    };
    return {
        handleSubmitSingUp,
        loading,
    };
};

const useAuth = (autoRedirectOnLogin = true) => {
    const [error, setError] = React.useState({});
    const [loginStep, setLoginStep] = React.useState('otp');
    const [step, setStep] = React.useState('fristPage');
    const { handleSubmit: handleLoginSubmit, loading: loginLoading } = useLogin();
    const { handleVerifyPhoneNumber, handleChangePassword, step: forgetPasswordStep, loading: forgetPassLoading, } = useForgetPassword();
    const { handleSubmitSingUp, loading } = useRegister(autoRedirectOnLogin);
    const [otpSendV2, { loading: otpSendLoading }] = client.useMutation(OTP_SEND_V2);
    const changeLoginStep = (data) => {
        setLoginStep(data);
    };
    const changePageStep = (data) => {
        setStep(data);
        changeLoginStep('otp');
    };
    const handleSubmitVerifyphone = async (phone_number, is_forget_password, onCompletedMethod) => {
        setError({});
        return new Promise((resolve, reject) => {
            otpSendV2({
                variables: {
                    content: {
                        phone_number: phone_number,
                        is_forget_password: is_forget_password,
                    },
                },
                context: {
                    headers: {
                        'accept-language': 'fa-IR',
                    },
                },
                onError(error) {
                    setError(apolloError(error));
                    reject();
                },
                onCompleted: async (data) => {
                    const setp = data?.customer?.otpSendV2?.is_register ? 'isRegister' : 'login';
                    await setStep((prevStep) => (prevStep === setp ? prevStep : setp));
                    onCompletedMethod?.();
                    resolve();
                },
            });
        });
    };
    const handleSubmit = (data, onCompleted) => {
        switch (step) {
            case 'fristPage':
                handleSubmitVerifyphone(data.phone_number, false, onCompleted);
                break;
            case 'isRegister':
                handleSubmitSingUp(data.phone_number, data.otp, onCompleted, (error) => {
                    setError(error);
                });
                break;
            case 'login':
                if (loginStep == 'otp') {
                    handleLoginSubmit(data.phone_number, data.otp).catch((err) => setError(apolloError(err)));
                }
                else if (loginStep == 'password') {
                    handleLoginSubmit(data.phone_number, data.password).catch((err) => setError(apolloError(err)));
                }
                break;
            case 'forgetPassword':
                if (forgetPasswordStep == 'verifyPhoneNumber') {
                    handleVerifyPhoneNumber(parseInt(data.otp), data.phone_number, onCompleted);
                }
                else if (forgetPasswordStep == 'changePassword') {
                    if (data.password == data.confirmPassword) {
                        handleChangePassword(data.password, data.phone_number, () => {
                            setStep('fristPage');
                            onCompleted();
                        });
                    }
                    else {
                        setError({ forgotpassword: ['passwords not match'] });
                    }
                }
                break;
            default:
                return 0;
        }
    };
    const handlerOtpAutomatic = (data, onCompleted) => {
        switch (step) {
            case 'isRegister':
                handleSubmitSingUp(data.phone_number, data.otp, onCompleted, (error) => {
                    setError(error);
                });
                break;
            case 'login':
                if (loginStep == 'otp') {
                    handleLoginSubmit(data.phone_number, data.otp).catch((err) => setError(apolloError(err)));
                }
                break;
            case 'forgetPassword':
                if (forgetPasswordStep == 'verifyPhoneNumber') {
                    handleVerifyPhoneNumber(parseInt(data.otp), data.phone_number, onCompleted);
                }
                break;
            default:
                return 0;
        }
    };
    return {
        handleSubmit,
        handleSubmitVerifyphone,
        handlerOtpAutomatic,
        loading: otpSendLoading || loginLoading || forgetPassLoading || loading,
        error,
        loginStep,
        step,
        forgetPasswordStep,
        changeLoginStep,
        changePageStep,
        logout: useLogout(),
    };
};

const getProducts = (customQuery) => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const params = useProductsSearchParams(customQuery ? { ...ctx.query, ...customQuery } : ctx.query);
    return await apolloClient.query({
        query: GET_PRODUCTS,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

const getProductsFiltering = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const params = ctx.query.categoryNames[0] ? { category: ctx.query.categoryNames[0] } : {};
    return await apolloClient.query({
        query: GET_PRODUCT_FILTER_PARAMS,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

const getSuggestionProducts = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    if (!ctx.query.product || !ctx.query.product?.length)
        throw new Error('ProductId is required!');
    const params = {
        offset: 0,
        limit: 20,
        productId: ctx.query?.product[0],
    };
    const data = await apolloClient.query({
        query: GET_SUGGESTION_PRODUCTS,
        variables: { ...params },
        errorPolicy: 'ignore',
    });
    return data;
};

const getProduct = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const res = await apolloClient.query({
        query: GET_PRODUCT,
        variables: { id: ctx.query?.product[0] },
        errorPolicy: 'ignore',
    });
    return res;
};

const getAppearance = () => (apolloClient) => {
    return apolloClient.query({
        errorPolicy: 'ignore',
        query: GET_APPEARANCE,
    });
};

const getStoreInfo = () => (apolloClient) => {
    return apolloClient.query({
        errorPolicy: 'ignore',
        query: GET_STORE_INFO,
    });
};

const getProfile = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const { req } = ctx;
    if (req) {
        const { n_access } = req.cookies;
        if (n_access) {
            return apolloClient.query({
                errorPolicy: 'ignore',
                query: GET_PROFILE,
                context: {
                    headers: {
                        authorization: `Bearer ${n_access}`,
                    },
                },
            });
        }
    }
};

const getBreadcrumb = ({ id, type } = {}) => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    let _id = id;
    let _type = type;
    if (!_id || !_type) {
        if (ctx.query.categoryNames && ctx.query.categoryNames?.length) {
            _id = ctx.query.categoryNames[0];
            _type = 'CATEGORY';
        }
        else if (ctx.query.product && ctx.query.product?.length) {
            _id = ctx.query.product[0];
            _type = 'PRODUCT';
        }
    }
    if (!_id || !_type)
        return undefined;
    // if (!_id || !_type) throw new Error('[Server]: Breadcrumb params ( id and type ) is required!');
    const data = await apolloClient.query({
        query: GET_BREADCRUMB,
        variables: {
            params: {
                id: _id,
                type: _type,
            },
        },
        errorPolicy: 'ignore',
    });
    return data;
};

const getProductFeedback = ({ limit = 10, offset = 0 }) => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const res = await apolloClient.query({
        query: GET_PRODUCTS_FEEDBACK,
        variables: { productId: ctx.query?.product[0], params: { limit, offset } },
        errorPolicy: 'ignore',
    });
    return res;
};

const getCategories = () => (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const params = {
        has_product: true,
        all: true,
    };
    return apolloClient.query({
        query: GET_CATEGORIES,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

const extractSchemaValue = (schema) => {
    let data = {};
    for (const model in schema) {
        for (const filed in schema[model]) {
            data = {
                ...data,
                [model]: {
                    ...data[model],
                    [filed]: {
                        value: schema[model][filed].value ?? schema[model][filed].defaultValue,
                    },
                },
            };
        }
    }
    return data;
};

const getThemeCustomization = (customization) => async (apolloClient) => {
    if (!customization)
        throw new Error('getThemeCustomization: customization is required!');
    const localDataSchema = extractSchemaValue(customization.schema);
    let queryDataSchema;
    try {
        const { data } = await apolloClient.query({
            variables: {
                themeName: customization?.config.themeName,
            },
            query: GET_THEME_CUSTOMIZATION,
        });
        if (data) {
            queryDataSchema = data?.customer?.getThemeCustomization?.data;
        }
    }
    catch (e) {
        if (e.message.includes('404')) {
            const { data } = await apolloClient.mutate({
                variables: {
                    themeName: customization?.config.themeName,
                    data: localDataSchema,
                },
                mutation: CREATE_THEME_CUSTOMIZATION,
            });
            if (data) {
                queryDataSchema = data?.customer?.createThemeCustomization?.data;
            }
        }
    }
    if (!queryDataSchema)
        throw new Error('Customization Schema was not fetched from server!');
};

const getUserType = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const { req } = ctx;
    if (req) {
        const { n_access } = req.cookies;
        if (n_access)
            return apolloClient.query({
                errorPolicy: 'ignore',
                query: GET_USER_TYPE,
                context: {
                    headers: {
                        authorization: `Bearer ${n_access}`,
                    },
                },
            });
    }
};

const getBlogArticles = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const params = {
        offset: +ctx.query?.page ? +ctx.query?.page * 10 - 10 : 0,
        limit: 10,
        search: ctx.query?.search,
    };
    return await apolloClient.query({
        query: GET_BLOG_ARTICLES,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

const getBlogHighlights = () => (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const params = {
        offset: 0,
        limit: 10,
    };
    return apolloClient.query({
        query: GET_BLOG_HIGHLIGHTS,
        variables: { params },
        errorPolicy: 'ignore',
    });
};

const getBlogArticle = () => async (apolloClient, ctx) => {
    if (typeof ctx === 'undefined')
        throw new Error('Context is required!');
    const res = await apolloClient.query({
        query: GET_BLOG_ARTICLE,
        variables: { id: ctx.query?.article[0] },
        errorPolicy: 'ignore',
    });
    return res;
};

var ssrQueries = {
    getProducts,
    getProductsFiltering,
    getAppearance,
    getStoreInfo,
    getProfile,
    getProduct,
    getSuggestionProducts,
    getBreadcrumb,
    getProductFeedback,
    getCategories,
    getThemeCustomization,
    getUserType,
    getBlogArticles,
    getBlogHighlights,
    getBlogArticle,
};

const aboutUs = {
    name: 'درباره ما',
    href: {
        pathname: '/information/about-us',
    },
};
const contactUs = {
    name: 'ارتباط با ما',
    href: {
        pathname: '/information/contact-us',
    },
};
const digify = {
    name: 'دیجی‌فای',
    href: {
        pathname: 'https://digify.shop/',
    },
};
const joinDigify = {
    name: 'یپوستن به دیجی‌غای',
    href: {
        pathname: 'https://register.digify.shop/',
    },
};
const buyHelp = {
    name: 'راهنمای خرید',
    href: {
        pathname: '/information/buy-help',
    },
};
const returnConditions = {
    name: 'شرایط مرجوعی',
    href: {
        pathname: '/information/return-conditions',
    },
};
const support = {
    name: 'پشتیبانی',
    href: {
        pathname: '/information/support',
    },
};
const home = {
    name: 'خانه',
    href: {
        pathname: '/',
    },
};
const cart = {
    name: 'سبد خرید',
    href: {
        pathname: '/profile/cart/[[...step]]',
        query: {
            step: 'items',
        },
    },
};
const favorites = {
    name: 'علاقه مندی ها',
    href: {
        pathname: '/profile/favorites',
    },
};
const login = {
    name: 'ورود به حساب کاربری',
    href: {
        pathname: '/auth/login',
    },
};
const register = {
    name: 'ثبت نام',
    href: {
        pathname: '/auth/register',
    },
};
const profile = {
    name: 'حساب کاربری',
    href: {
        pathname: '/profile',
    },
};
const orders = {
    name: 'سفارشات',
    href: {
        pathname: '/profile/orders',
    },
};
const notifications = {
    name: 'اطلاع رسانی ها',
    href: {
        pathname: '/profile/notifications',
    },
};
const staticLinks = {
    aboutUs,
    contactUs,
    digify,
    joinDigify,
    buyHelp,
    returnConditions,
    support,
    home,
    cart,
    favorites,
    login,
    register,
    profile,
    orders,
    notifications,
};

const useProductFeedback = (options) => {
    const [page, setPage] = React.useState(1);
    const initOptions = (options) => {
        const defaults = {
            offset: 0,
            limit: 10,
        };
        return {
            ...defaults,
            ...options,
        };
    };
    const { query } = Router.useRouter();
    const { limit, offset } = initOptions(options);
    const { data, loading, error, fetchMore, refetch } = client.useQuery(GET_PRODUCTS_FEEDBACK, {
        notifyOnNetworkStatusChange: true,
        variables: {
            productId: query.product?.length ? query.product[0] : '0',
            params: {
                offset,
                limit,
            },
        },
        skip: !query.product || !query.product?.length,
    });
    const pageHandlerDesktop = async (page) => {
        await refetch({
            productId: query.product?.length ? query.product[0] : '0',
            params: {
                offset: (page - 1) * 10,
                limit: 10,
            },
        });
    };
    const paginationHandler = async (page) => {
        const newOffset = (page - 1) * limit;
        setPage(page);
        const pagesNumberFetchBefore = (data?.customer.getProductFeedback?.results?.length || 0) / limit;
        if (page > pagesNumberFetchBefore) {
            await fetchMore({
                variables: {
                    params: {
                        offset: newOffset,
                        limit,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult)
                        return prev;
                    const newData = {
                        ...prev,
                        customer: {
                            ...prev.customer,
                            getProductFeedback: {
                                ...prev.customer.getProductFeedback,
                                results: [
                                    ...prev.customer.getProductFeedback.results,
                                    ...fetchMoreResult.customer.getProductFeedback.results,
                                ],
                            },
                        },
                    };
                    return Object.assign({}, prev, newData);
                },
            });
        }
    };
    return {
        data: {
            pages: Array.from({
                length: +(data?.customer.getProductFeedback.count || 0) / limit || 1,
            }, (_, i) => i + 1),
            page,
            resultsPerPage: data?.customer.getProductFeedback?.results.slice((page - 1) * limit, (page - 1) * limit + limit) || [],
            results: data?.customer.getProductFeedback?.results ?? [],
            count: data?.customer.getProductFeedback?.count ?? 0,
        },
        loading: loading,
        pageHandlerDesktop,
        error: apolloError(error),
        paginationHandler,
    };
};

const useBreadcrumb = ({ id, type } = {}) => {
    const { query } = Router.useRouter();
    let _id = id;
    let _type = type;
    if (!_id || !_type) {
        if (query.categoryNames && query.categoryNames?.length) {
            _id = query.categoryNames[0];
            _type = 'CATEGORY';
        }
        else if (query.product && query.product?.length) {
            _id = query.product[0];
            _type = 'PRODUCT';
        }
    }
    const { data, error, loading } = client.useQuery(GET_BREADCRUMB, {
        skip: !_id || !_type,
        variables: {
            params: {
                id: _id ?? '0',
                type: _type ?? 'PRODUCT',
            },
        },
    });
    const category = React.useMemo(() => {
        if (!data?.customer?.getBreadcrumb)
            return null;
        const cloneCategory = { ...data?.customer?.getBreadcrumb };
        return {
            ...cloneCategory,
            child: cloneCategory.child && cloneCategory.child?.id
                ? {
                    ...cloneCategory.child,
                    child: cloneCategory.child.child && cloneCategory.child.child?.id
                        ? {
                            ...cloneCategory.child.child,
                            link: {
                                href: {
                                    pathname: '/products/[[...categoryNames]]',
                                    query: {
                                        categoryNames: [
                                            `${cloneCategory.child.child.id}`,
                                            cloneCategory.child.child.title?.replace(/ /gi, '-'),
                                        ],
                                    },
                                },
                            },
                        }
                        : null,
                    link: {
                        href: {
                            pathname: '/products/[[...categoryNames]]',
                            query: {
                                categoryNames: [
                                    `${cloneCategory.child.id}`,
                                    cloneCategory.child.title?.replace(/ /gi, '-'),
                                ],
                            },
                        },
                    },
                }
                : null,
            link: {
                href: {
                    pathname: '/products/[[...categoryNames]]',
                    query: {
                        categoryNames: [`${cloneCategory.id}`, cloneCategory.title?.replace(/ /gi, '-')],
                    },
                },
            },
        };
    }, [data]);
    return {
        data: category,
        loading,
        error: apolloError(error),
    };
};

const useCategories = () => {
    const { data, loading, error } = client.useQuery(GET_CATEGORIES, {
        variables: {
            params: {
                has_product: true,
                all: true,
            },
        },
    });
    const categories = React.useMemo(() => {
        if (!data?.customer.getCategories?.results)
            return [];
        const newCategories = JSON.parse(JSON.stringify(data.customer.getCategories?.results));
        return newCategories.map((category) => ({
            ...category,
            children: category.children.map((child) => ({
                ...child,
                link: {
                    href: {
                        pathname: '/products/[[...categoryNames]]',
                        query: {
                            categoryNames: [child.id, child.title?.replace(/ /gi, '-')],
                        },
                    },
                },
            })),
            link: {
                href: {
                    pathname: '/products/[[...categoryNames]]',
                    query: {
                        categoryNames: [category.id, category.title?.replace(/ /gi, '-')],
                    },
                },
            },
        }));
    }, [data]);
    return {
        data: { categories },
        count: data?.customer.getCategories?.count || 0,
        loading,
        error: apolloError(error),
        link: {
            href: {
                pathname: '/products/[[...categoryNames]]',
                query: {
                    categoryNames: [],
                },
            },
        },
    };
};

const useTheme = () => {
    const { data, loading, error } = client.useQuery(GET_APPEARANCE);
    return { data: data?.customer.getAppearance?.theme, loading, error: apolloError(error) };
};

const useStoreInfo = () => {
    const { data } = client.useQuery(GET_STORE_INFO);
    const [createStoreOpeningNotifier, { loading: storeOpeningNotifierLoading }] = client.useMutation(CREATE_STORE_OPENING_STORE_NOTIFIER);
    const [storeOpeningNotifierError, setStoreOpeningNotifierError] = React.useState({});
    const handleCreateStoreOpeningNotifier = (data) => {
        return new Promise((resolve, reject) => {
            return createStoreOpeningNotifier({
                variables: {
                    content: {
                        phone_number: data.phoneNumber,
                        email: data.email,
                    },
                },
                onError(e) {
                    setStoreOpeningNotifierError(apolloError(e));
                    reject();
                },
                onCompleted() {
                    resolve();
                },
            });
        });
    };
    return React.useMemo(() => {
        let storeInfo = {};
        if (data?.customer?.getStoreInfo) {
            const { customer: { getStoreInfo: d }, } = data;
            storeInfo = {
                id: d.id,
                hotjar_token: d.hotjar_token,
                google_analytics_token: d.google_analytics_token,
                name: d.name,
                about_us: d.ecommerce?.about_us,
                about_returns: d.ecommerce?.about_returns,
                shipping_guide: d.ecommerce?.shipping_guide,
                telephone_number: d.telephone_number,
                is_open: d.ecommerce?.is_open,
                show_digify_logo: d.ecommerce?.show_digify_logo,
                domain: d.ecommerce.domain,
                store_address: {
                    address: d.store_address?.address,
                    city: d.store_address?.city,
                    latitude: d.store_address?.latitude,
                    longitude: d.store_address?.longitude,
                    postal_code: d.store_address?.postal_code,
                    province: d.store_address?.province,
                },
                enamad: {
                    e_namad_img_id: d.ecommerce?.e_namad_img_id,
                    e_namad_img_src: d.ecommerce?.e_namad_img_src
                        ? d.ecommerce?.e_namad_img_src.replace('amp;', '')
                        : '',
                    e_namad_meta_content: d.ecommerce?.e_namad_meta_content,
                    e_namad_reference_link: d.ecommerce?.e_namad_reference_link
                        ? d.ecommerce?.e_namad_reference_link.replace('amp;', '')
                        : '',
                },
                email: d.email,
                manager: {
                    first_name: d.first_name,
                    last_name: d.last_name,
                },
                guild: d.guild,
                logo: d.logo?.image ?? '',
                ray_chat: {
                    ray_chat_enabled: d.ray_chat_enabled,
                    ray_chat_token: d.ray_chat_token,
                },
                social_media: {
                    facebook: d.social_media?.facebook ?? '',
                    instagram: d.social_media?.instagram ?? '',
                    linkedin: d.social_media?.linkedin ?? '',
                    telegram: d.social_media?.telegram ?? '',
                    twitter: d.social_media?.twitter ?? '',
                    whatsapp: d.social_media?.whatsapp ?? '',
                },
                handleCreateStoreOpeningNotifier,
                storeOpeningNotifierError,
                storeOpeningNotifierLoading,
            };
        }
        return storeInfo;
    }, [data]);
};

const isSearchEngine = (ctx) => {
    const searchEngineUserAgent = [
        'googlebot',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'sogou',
        'exabot',
        'facebot',
        'ia_archiver',
    ];
    const userAgent = ctx.req?.headers['user-agent'] ?? '';
    for (const i of searchEngineUserAgent) {
        if (userAgent.toLowerCase().includes(i))
            return true;
    }
    return false;
};

const withApollo = (C) => (...queries) => {
    const Component = (props) => jsxRuntime.jsx(C, { ...props });
    Component.getInitialProps = async (ctx) => {
        if (!Array.isArray(queries)) {
            throw new Error('Queries must be array !');
        }
        if (!queries.length) {
            throw new Error('Queries cannot be empty !');
        }
        if (C.setPageConfig?.private || C.setPageConfig?.guestOnly) {
            throw new Error('SSR pages cannot be authenticated !');
        }
        const pageConfig = {
            dynamicRendering: false,
            ...(C.setPageConfig && { ...C.setPageConfig }),
        };
        const isServer = typeof window === 'undefined';
        const canFetchDataInServerSide = pageConfig.dynamicRendering
            ? isServer && isSearchEngine(ctx)
            : isServer;
        if (canFetchDataInServerSide) {
            for (const query of queries) {
                const results = await Promise.all(query.map((q) => q(ctx.apolloClient, ctx)));
                if (queries.length >= 2) {
                    ctx.previousData = results
                        .filter(({ data }) => !!data?.customer)
                        .map(({ data: { customer } }) => customer);
                }
            }
            ctx.previousData = [];
        }
        return { ...addApolloState(ctx.apolloClient), csrOnly: !canFetchDataInServerSide };
    };
    return Component;
};

const privatePathHandler = async (appContext, isAuthenticated) => {
    const { ctx: { req, res, pathname, query }, } = appContext;
    const isServer = typeof window === 'undefined' && !!req;
    const redirectToLogin = async () => {
        if (isServer) {
            res.statusCode = 302;
            res.setHeader('Location', `/auth/login?_back_to=${pathname}&${qs__default["default"].stringify(query)}`);
            res.end();
        }
        else {
            await Router__default["default"].push({
                pathname: '/auth/login',
                query: {
                    ...query,
                    _back_to: pathname,
                },
            });
        }
    };
    if (!isAuthenticated)
        await redirectToLogin();
};

const guestOnlyPathHandler = async (appContext, isAuthenticated) => {
    const { ctx: { req, res }, } = appContext;
    const isServer = typeof window === 'undefined' && !!req;
    const redirectToRequestedPath = async () => {
        if (isServer) {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        }
        else {
            await Router__default["default"].back();
        }
    };
    if (isAuthenticated) {
        await redirectToRequestedPath();
    }
};

const authenticationHandler = async (appContext) => {
    const configs = {
        private: false,
        guestOnly: false,
        ...(appContext.Component.setPageConfig ?? appContext.ctx.setPageConfig ?? {}),
    };
    const canCheckAuthentication = (config) => {
        if (config === true)
            return true;
        if (typeof config === 'object' && !Array.isArray(config)) {
            const { query } = appContext.ctx;
            if (!Object.keys(query).length)
                return false;
            for (const queryConfigKey in config) {
                if (!query[queryConfigKey])
                    return false;
                for (const queryConfigValue of config[queryConfigKey]) {
                    if (!Array.isArray(query[queryConfigKey]) && Array.isArray(queryConfigValue))
                        throw new Error('Dynamic query config format cannot match query type');
                    if (Array.isArray(query[queryConfigKey]) && !Array.isArray(queryConfigValue)) {
                        throw new Error('Dynamic route format cannot match query config type' +
                            '\nRead more about dynamic routes:\n' +
                            '\nhttps://nextjs.org/docs/routing/dynamic-routes#catch-all-routes');
                    }
                    if (Array.isArray(queryConfigValue)) {
                        return queryConfigValue.every((q) => query[queryConfigKey]?.includes(q));
                    }
                    else {
                        return configs[queryConfigKey].includes(query[queryConfigKey]);
                    }
                }
            }
            return false;
        }
        return false;
    };
    const authenticated = isUserLoggedIn();
    if (configs.private && configs.guestOnly) {
        throw new Error('A page cannot be both guestOnly and private at the same time.');
    }
    if (configs.private && canCheckAuthentication(configs.private)) {
        await privatePathHandler(appContext, authenticated);
    }
    if (configs.guestOnly && canCheckAuthentication(configs.guestOnly)) {
        await guestOnlyPathHandler(appContext, authenticated);
    }
};

const useBasket$1 = () => {
    const { query, push, pathname } = Router.useRouter();
    const storeInfoData = exports.apolloLocalState.readQuery({ query: GET_STORE_INFO });
    // const {customer: {getStoreInfo: { id: storeId },},} = apolloLocalState.readQuery({ query: GET_STORE_INFO });
    const basketKey = `Basket:${storeInfoData?.customer?.getStoreInfo?.id}`;
    const initialLocalBasket = {
        items: [],
        address: '0',
        shipping: '0',
        transaction: '0',
        description: '',
        packing: '',
        discount: '',
        useLoyalty: false,
        receiverInfo: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
    };
    const newUUID = uuid__default["default"]();
    const { data: queryData } = client.useQuery(GET_BASKET, {
        skip: !storeInfoData?.customer?.getStoreInfo?.id,
        variables: {
            uuid: typeof window !== 'undefined' ? localStorage.getItem('basketUUID') || newUUID : '',
        },
        onCompleted: (data) => {
            typeof window !== 'undefined' && data.customer.getBasket.temp_id
                ? localStorage.setItem('basketUUID', data.customer.getBasket.temp_id)
                : () => {
                    return;
                };
        },
    });
    const [updateBasket] = client.useMutation(UPDATE_BASKET, { fetchPolicy: 'no-cache' });
    const [addFavorites] = client.useMutation(ADD_FAVORITES);
    const getLocalStorageBasket = () => {
        if (typeof window === 'undefined')
            return initialLocalBasket;
        const rawData = localStorage.getItem(basketKey);
        if (rawData)
            return JSON.parse(rawData);
        if (storeInfoData?.customer?.getStoreInfo?.id)
            localStorage.setItem(basketKey, JSON.stringify(initialLocalBasket));
        return initialLocalBasket;
    };
    const localStorageBasket = getLocalStorageBasket();
    const [initialSync, setInitialSync] = React.useState(false);
    const [updateBasketLoading, setUpdateBasketLoading] = React.useState(false);
    const [items, setItems] = React.useState(localStorageBasket.items);
    const [address, setAddress] = React.useState(localStorageBasket.address);
    const [receiverInfo, setReceiverInfo] = React.useState(localStorageBasket.receiverInfo);
    const [shipping, setShipping] = React.useState(localStorageBasket.shipping);
    const [transaction, setTransaction] = React.useState(localStorageBasket.transaction);
    const [packing, setPacking] = React.useState(localStorageBasket.packing);
    const [discount, setDiscount] = React.useState(localStorageBasket.discount);
    const [useLoyalty, setUseLoyalty] = React.useState(localStorageBasket.useLoyalty);
    const [description, setDescription] = React.useState(localStorageBasket.description);
    React.useEffect(() => {
        const timeout = setTimeout(async () => {
            if (queryData?.customer) {
                if (needSync()) {
                    await handleSyncItems();
                }
                else {
                    setInitialSync(true);
                }
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [queryData, items]);
    const needSync = () => {
        const queryItems = queryData?.customer.getBasket.basket_items;
        const sortedQueryItems = queryItems ? [...queryItems] : [];
        sortedQueryItems.sort((a, b) => a.product_id - b.product_id);
        const soretdItems = [...items];
        soretdItems.sort((a, b) => a.product_id - b.product_id);
        if (queryItems?.length !== items.length) {
            return true;
        }
        if (!sortedQueryItems.length && !soretdItems.length)
            return false;
        for (let i = 0; i < soretdItems.length; i++)
            if (!isEqual__default["default"](soretdItems[i], sortedQueryItems[i])) {
                return true;
            }
        return false;
    };
    const handleUpdateLocalBasket = (newData) => {
        if (Object.keys(newData).length) {
            for (const key of Object.keys(newData)) {
                if (!isEqual__default["default"](newData[key], data[key]) || key === 'packing') {
                    switch (key) {
                        case 'items':
                            setItems(newData[key]);
                            break;
                        case 'address':
                            setAddress(newData[key]);
                            break;
                        case 'shipping':
                            setShipping(newData[key]);
                            break;
                        case 'transaction':
                            setTransaction(newData[key]);
                            break;
                        case 'packing': {
                            if (packing === newData[key])
                                setPacking(initialLocalBasket.packing);
                            else
                                setPacking(newData[key]);
                            break;
                        }
                        case 'discount':
                            setDiscount(newData[key]);
                            break;
                        case 'useLoyalty':
                            setUseLoyalty(newData[key]);
                            break;
                        case 'receiverInfo':
                            setReceiverInfo(newData[key]);
                            break;
                        case 'description':
                            setDescription(newData[key]);
                    }
                    if (storeInfoData?.customer?.getStoreInfo?.id)
                        localStorage.setItem(basketKey, JSON.stringify({
                            ...getLocalStorageBasket(),
                            [key]: key === 'packing' && packing === newData[key]
                                ? initialLocalBasket.packing
                                : newData[key],
                        }));
                }
            }
        }
    };
    const handleUpdateItems = async (mergedItems) => {
        const basketItems = mergedItems.map(({ amount, id, online_cost, online_primary_cost, variant_id, orderable_count, discount_amount }) => ({
            amount,
            id,
            online_cost,
            online_primary_cost,
            variant: variant_id,
            orderable_count,
            discount_amount,
        }));
        setUpdateBasketLoading(true);
        await updateBasket({
            variables: {
                content: {
                    basket_items: basketItems,
                },
                uuid: localStorage.getItem('basketUUID'),
            },
            onCompleted: (data) => {
                setInitialSync(true);
                handleUpdateLocalBasket({
                    items: updateBasketOrderableCounts(data.customer?.updateBasket?.basket_items),
                });
                typeof window !== 'undefined' && data.customer.updateBasket.temp_id
                    ? localStorage.setItem('basketUUID', data.customer.updateBasket.temp_id)
                    : () => {
                        return;
                    };
            },
        });
        setUpdateBasketLoading(false);
    };
    const handleSyncItems = async () => {
        const arr = [...items, ...(initialSync ? [] : queryData?.customer.getBasket.basket_items || [])];
        // const arr = [
        //     ...items,
        //     ...(queryData?.customer?.getBasket?.basket_items ? queryData.customer.getBasket.basket_items : []),
        // ];
        const mergedBasket = arr.reduce((previousValue, currentValue) => {
            return previousValue.map((item) => +item.variant_id).includes(+currentValue.variant_id)
                ? previousValue
                : [...previousValue, currentValue];
        }, []);
        // if (isUserLoggedIn()) {
        await handleUpdateItems(mergedBasket);
        // } else {
        //     handleUpdateLocalBasket({ items: mergedBasket });
        //     setInitialSync(true);
        // }
    };
    const handleAddToBasket = (item, onCompleted) => {
        const _items = JSON.parse(JSON.stringify(items));
        const index = _items.map((i) => +i.variant_id).indexOf(+item.variant_id);
        if (index === -1 && (item.orderable_count > 0 || item.orderable_count === -1)) {
            if (item.orderable_count > 0) {
                item.orderable_count -= 1;
            }
            _items.push(item);
            onCompleted?.();
        }
        else {
            if (_items[index]?.orderable_count > 0 || _items[index]?.orderable_count === -1)
                _items[index].amount += 1;
            if (_items[index]?.orderable_count > 0)
                _items[index].orderable_count -= 1;
            onCompleted?.();
        }
        handleUpdateLocalBasket({ items: _items });
    };
    const handleItemsAmount = (variantId, type, onCompleted) => {
        const _items = JSON.parse(JSON.stringify(items))
            .map((i) => {
            if (i.variant_id === variantId) {
                if (type === 'increment' && i?.orderable_count !== 0) {
                    i.amount += 1;
                    if (i?.orderable_count > 0)
                        i.orderable_count -= 1;
                }
                else if (type === 'decrement') {
                    i.amount -= 1;
                    if (i?.orderable_count >= 0)
                        i.orderable_count += 1;
                }
                else if (type === 'remove') {
                    if (i?.orderable_count >= 0)
                        i.orderable_count += i.amount;
                    i.amount = 0;
                }
            }
            return i;
        })
            .filter((i) => i.amount > 0);
        if (!_items.length)
            handleClearBasket(() => {
                return;
            });
        else
            handleUpdateLocalBasket({ items: _items });
        onCompleted?.();
    };
    const handleAddToFavorites = async (id, variant_id, onCompleted) => {
        if (isUserLoggedIn())
            await addFavorites({
                variables: { id },
                onCompleted() {
                    onCompleted?.();
                },
            });
        else
            await push({
                pathname: '/auth/login',
                query: {
                    ...query,
                    _back_to: pathname,
                },
            });
    };
    const handleClearBasket = (onCompleted) => {
        handleUpdateLocalBasket(initialLocalBasket);
        onCompleted?.();
    };
    const handleLogoutBasket = (onCompleted) => {
        handleUpdateLocalBasket(initialLocalBasket);
        setInitialSync(false);
        setItems([]);
        onCompleted?.();
    };
    const updateBasketOrderableCounts = (items) => {
        return items.map((item) => ({
            ...item,
            orderable_count: item?.orderable_count === 0
                ? 0
                : item?.orderable_count > 0
                    ? item?.orderable_count - item.amount
                    : item?.orderable_count,
            discount_amount: item.discount_amount,
            amount: item.amount,
        }));
    };
    const data = {
        items: React.useMemo(() => (items ? items : []), [items]),
        address: React.useMemo(() => address, [address]),
        packing: React.useMemo(() => packing, [packing]),
        discount: React.useMemo(() => discount, [discount]),
        useLoyalty: React.useMemo(() => useLoyalty, [useLoyalty]),
        shipping: React.useMemo(() => shipping, [shipping]),
        receiverInfo: React.useMemo(() => receiverInfo, [receiverInfo]),
        transaction: React.useMemo(() => transaction, [transaction]),
        description: React.useMemo(() => description, [description]),
    };
    return {
        data,
        initialSync,
        handleAddToBasket,
        handleItemsAmount,
        handleClearBasket,
        handleLogoutBasket,
        handleUpdateLocalBasket,
        handleAddToFavorites,
        updateBasketLoading: updateBasketLoading,
        setInitialSync,
    };
};

const useCustomization$1 = (customization) => {
    const { data: d } = client.useQuery(GET_THEME_CUSTOMIZATION, {
        variables: {
            themeName: customization?.config?.themeName,
        },
    });
    const lastChanges = React.useRef({});
    const [updateThemeCustomization, { loading: publishLoading }] = client.useMutation(UPDATE_THEME_CUSTOMIZATION);
    const initialCustomizationSchema = React.useMemo(() => {
        const queryData = d?.customer?.getThemeCustomization?.data || {};
        let schema = {};
        const localData = customization.schema;
        for (const model in localData) {
            for (const field in localData[model]) {
                if (!Object.keys(localData[model][field]).length) {
                    throw new Error(`"localData.${model}.${field}": Schema is not valid!\n ${JSON.stringify(queryData[model], null, 2)}`);
                }
                const value = queryData?.current?.[model]
                    ? queryData?.current?.[model]?.[field]
                        ? queryData?.current[model]?.[field]?.value
                        : localData?.[model]?.[field]?.defaultValue
                    : localData?.[model]?.[field]?.defaultValue;
                schema = {
                    ...schema,
                    [model]: {
                        ...schema[model],
                        [field]: {
                            handleLoadDefault: () => handleLoadDefault([model, field], localData[model][field]?.defaultValue),
                            type: localData[model][field]?.type,
                            value,
                            ...(localData[model][field]?.type === 'string' && {
                                handleChangeString: (value) => handleChangeString([model, field], value),
                            }),
                            ...(localData[model][field]?.type === 'boolean' && {
                                handleChangeBoolean: () => handleChangeBoolean([model, field]),
                            }),
                            ...(localData[model][field]?.type === 'number' && {
                                handleChangeNumber: (value) => handleChangeNumber([model, field], value),
                            }),
                            ...(localData[model][field]?.options?.length && {
                                options: localData[model][field]?.type === 'checkbox'
                                    ? localData[model][field]?.options?.map((option) => ({
                                        ...option,
                                        handleChange: () => handleChangeCheckbox([model, field], option.value),
                                    }))
                                    : localData[model][field]?.options,
                            }),
                            ...(localData[model][field]?.options?.length &&
                                localData[model][field]?.type === 'object[]' && {
                                handleAddNewItem: () => addNewItem([model, field]),
                                handleDeleteItem: (id) => deleteArrayItem([model, field], id),
                                handleChange: (id, key, value) => handleChangeObjItem([model, field], id, key, value),
                            }),
                            ...(localData[model][field]?.type === 'string[]' && {
                                handleAddToArray: (id) => addItemToArray([model, field], id),
                                handleRemoveFromArray: (id) => removeItemFromArray([model, field], id),
                            }),
                        },
                    },
                };
            }
        }
        return schema;
    }, [d]);
    const [publishError, setPublishError] = React.useState({});
    const [customizeData, setCustomizeData] = React.useState(initialCustomizationSchema);
    const handleChangeString = ([model, field], value) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value,
                },
            },
        }));
    };
    const handleChangeNumber = ([model, field], value) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value,
                },
            },
        }));
    };
    const handleChangeBoolean = ([model, filed]) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [filed]: {
                    ...prev[model][filed],
                    value: !prev[model][filed].value,
                },
            },
        }));
    };
    const handleChangeCheckbox = ([model, filed], value) => {
        setCustomizeData((prev) => {
            const checkboxValue = JSON.parse(JSON.stringify(prev[model][filed].value));
            const foundIndex = checkboxValue.indexOf(value);
            if (foundIndex === -1) {
                checkboxValue.push(value);
            }
            else {
                checkboxValue.splice(foundIndex, 1);
            }
            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [filed]: {
                        ...prev[model][filed],
                        value: checkboxValue,
                    },
                },
            };
        });
    };
    const addNewItem = ([model, field]) => {
        setCustomizeData((prev) => {
            const newDefaultItem = {
                id: Math.floor(Math.random() * 10000),
            };
            prev[model][field].options.forEach((option) => (newDefaultItem[option.key] = option.value));
            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [field]: {
                        ...prev[model][field],
                        value: [...prev[model][field].value, newDefaultItem].filter((item) => item?.id),
                    },
                },
            };
        });
    };
    const deleteArrayItem = ([model, field], id) => {
        setCustomizeData((prev) => {
            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [field]: {
                        ...prev[model][field],
                        value: [...prev[model][field].value.filter((item) => item.id !== id)],
                    },
                },
            };
        });
    };
    const handleChangeObjItem = ([model, field], id, key, value) => {
        setCustomizeData((prev) => {
            return {
                ...prev,
                [model]: {
                    ...prev[model],
                    [field]: {
                        ...prev[model][field],
                        value: [
                            ...prev[model][field].value.map((item) => {
                                const newItem = { ...item };
                                if (newItem.id === id && key in newItem) {
                                    newItem[key] = value;
                                }
                                return newItem;
                            }),
                        ],
                    },
                },
            };
        });
    };
    const handleLoadDefault = ([model, filed], value) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [filed]: {
                    ...prev[model][filed],
                    value,
                },
            },
        }));
    };
    const handlePublishCustomization = async (onCompleted) => {
        await updateThemeCustomization({
            variables: {
                themeName: customization?.config.themeName,
                data: cacheIntegration(lastChanges, extractSchemaValue(customization)),
            },
            onError(e) {
                setPublishError(apolloError(e));
            },
            onCompleted: () => onCompleted?.(),
        });
    };
    const handleRemoveAllChanges = () => {
        setCustomizeData(initialCustomizationSchema);
        setPublishError({});
    };
    const addItemToArray = ([model, field], newValue) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value: [...prev[model][field].value, newValue],
                },
            },
        }));
    };
    const removeItemFromArray = ([model, field], value) => {
        setCustomizeData((prev) => ({
            ...prev,
            [model]: {
                ...prev[model],
                [field]: {
                    ...prev[model][field],
                    value: prev[model][field].value.filter((item) => item !== value),
                },
            },
        }));
    };
    React.useEffect(() => {
        lastChanges.current = extractSchemaValue(customizeData);
    }, [customizeData]);
    const data = React.useMemo(() => customizeData, [customizeData]);
    return { data, handlePublishCustomization, publishError, publishLoading, handleRemoveAllChanges };
};

const shpingVar = client.makeVar([]);
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const setShpingData = (data) => {
    if (!isEmpty(data)) {
        shpingVar(data);
    }
};

const useSokect = () => {
    const { data } = client.useQuery(GET_WEBSOCKET_NOTIF, {
        pollInterval: 3000000,
        skip: !isUserLoggedIn(),
    });
    const ws = React.useRef(null);
    React.useEffect(() => {
        if (data?.notification?.getToken?.token) {
            const WebSocketUrl = window.location.hostname.includes('.apps.') || window.location.hostname.includes('localhost')
                ? (token) => `wss://backend.apps.digify.shop/ws/notif/?token=${token}`
                : (token) => `wss://backend.digify.shop/ws/notif/?token=${token}`;
            ws.current = new WebSocket(WebSocketUrl(data?.notification?.getToken?.token));
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ws.current.onopen = () => { };
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ws.current.onclose = () => { };
        }
    }, [data?.notification?.getToken?.token]);
    React.useEffect(() => {
        if (!ws.current)
            return;
        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message.action_id == 216) {
                setShpingData(message.shipping_list);
            }
        };
    }, [ws.current]);
    return {
        soket: {
            token: data?.notification?.getToken?.token ?? '',
        },
    };
};

const StoreProvider = (props) => {
    const basket = useBasket$1();
    const customization = useCustomization$1(props.customization);
    useSokect();
    const value = React.useMemo(() => ({ basket, customization }), [basket, customization]);
    return jsxRuntime.jsx(StoreContext.Provider, { value: value, children: props.children });
};

const ThemeProvider = (props) => {
    return (jsxRuntime.jsx(client.ApolloProvider, { client: props.apolloClient, children: jsxRuntime.jsx(StoreProvider, { customization: props.customization, children: props.children }) }));
};

const setCookie = (cName, cValue, exDays = 0) => {
    if (!exDays)
        document.cookie = cName + '=' + cValue + ';path=/';
    else {
        const d = new Date();
        d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
    }
};
const getCookie = (cName) => {
    const name = cName + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

const initializeApp = (Component, themeConfig, queries = [
    ssrQueries.getAppearance(),
    ssrQueries.getStoreInfo(),
    ssrQueries.getProfile(),
    ssrQueries.getCategories(),
    ssrQueries.getUserType(),
    themeConfig.customization?.schema && ssrQueries.getThemeCustomization(themeConfig.customization),
].filter(Boolean)) => {
    const MyApp = (props) => {
        const client = useApollo(props.pageProps, themeConfig.apollo, props.storeId);
        return (jsxRuntime.jsx(ThemeProvider, { customization: themeConfig.customization, apolloClient: client, children: jsxRuntime.jsx(Component, { ...props }) }));
    };
    MyApp.getInitialProps = async (appContext) => {
        const { ctx } = appContext;
        const isServer = !!ctx.req;
        const routes = ctx.asPath.split('/');
        const firstRoute = routes[1];
        if (+firstRoute) {
            let _asPath = ctx.asPath.replace('/', '');
            _asPath = _asPath.replace(firstRoute, '');
            _asPath = _asPath || '/';
            if (isServer) {
                ctx.res.writeHead(307, { Location: _asPath });
                ctx.res.end();
            }
            else
                Router__default["default"].replace(_asPath);
            return;
        }
        let _storeId = '';
        if (process.env.STORE_ID)
            _storeId = process.env.STORE_ID;
        else {
            if (isServer) {
                if (ctx?.req?.headers?.['store-id'])
                    _storeId = ctx?.req?.headers?.['store-id'];
                else {
                    const cookies = new Cookies__default["default"](ctx.req, ctx.res);
                    const cookieStoreId = cookies.get('storeId');
                    if (cookieStoreId)
                        _storeId = cookieStoreId;
                }
            }
            else {
                const clientCookieStoreId = getCookie('storeId');
                if (clientCookieStoreId)
                    _storeId = `${clientCookieStoreId}`;
            }
        }
        if (!themeConfig?.apollo) {
            throw new Error('You must configure apollo in themeConfig file.');
        }
        if (!themeConfig?.customization?.config?.themeName) {
            throw new Error('You must set themeName in themeConfig file.');
        }
        if (_storeId) {
            const apolloClient = initializeApollo(+_storeId, null, themeConfig.apollo);
            ctx.apolloClient = apolloClient;
            if (isServer) {
                const cookies = new Cookies__default["default"](ctx.req, ctx.res);
                cookies.set('storeId', _storeId, { httpOnly: false });
            }
            else
                setCookie('storeId', _storeId);
            await Promise.all(queries.map((query) => query(apolloClient, ctx)));
            await authenticationHandler(appContext);
            const initialThemeData = addApolloState(apolloClient);
            const appProps = await App__default["default"].getInitialProps(appContext);
            return {
                pageProps: cacheIntegration(initialThemeData, appProps.pageProps ?? {}),
                storeId: +_storeId,
            };
        }
        else {
            return {
                pageProps: {
                    statusCode: 404,
                },
            };
        }
    };
    return MyApp;
};

const status = (query) => {
    switch (query.status) {
        case 'inProgress':
            return 'PROCESSING';
        case 'received':
            return 'RECEIVED';
        case 'returned':
            return 'RETURNED';
        case 'canceled':
            return 'CANCELED';
        default:
            return 'WAITING_FOR_PAYMENT';
    }
};
const useOrdersSearchParams = () => {
    const { query } = Router.useRouter();
    const searchParams = {
        status: status(query),
        offset: ((query.page ? +query.page : 1) - 1) * 10,
    };
    for (const i in searchParams)
        if (!searchParams[i])
            delete searchParams[i];
    return searchParams;
};

const useOrdersStatusCount = () => {
    const { query, push, pathname } = Router.useRouter();
    const { data, loading, error, networkStatus } = client.useQuery(GET_ORDERS_STATUS_COUNT, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
    });
    const searchParams = useOrdersSearchParams();
    //Don't change these variables
    const waitingForPaymentsIds = [15, 14, 1];
    const receivedIds = [5];
    const inProgressIds = [2, 3, 16, 4, 17];
    const canceledIds = [6, 11, 12, 10, 13, 8];
    //***
    const handleChangeTab = async (status) => {
        let _query = { ...query };
        delete _query.page;
        status === 'waitingForPayment'
            ? delete _query.status
            : (_query = {
                ..._query,
                status,
            });
        await push({
            pathname,
            query: _query,
        });
    };
    const statuses = React.useMemo(() => {
        const _statuses = {
            waitingForPayment: {
                count: 0,
                selected: searchParams.status === 'WAITING_FOR_PAYMENT',
            },
            inProgress: {
                count: 0,
                selected: searchParams.status === 'PROCESSING',
            },
            received: {
                count: 0,
                selected: searchParams.status === 'RECEIVED',
            },
            returned: {
                count: 0,
                selected: searchParams.status === 'RETURNED',
            },
            canceled: {
                count: 0,
                selected: searchParams.status === 'CANCELED',
            },
        };
        if (!error && !loading && data) {
            const { customer: { getOrderStatusCount: { returns_count, status_count }, }, } = data;
            for (const i of status_count) {
                if (waitingForPaymentsIds.includes(i.status)) {
                    _statuses.waitingForPayment.count += i.total;
                }
                if (receivedIds.includes(i.status)) {
                    _statuses.received.count += i.total;
                }
                if (inProgressIds.includes(i.status)) {
                    _statuses.inProgress.count += i.total;
                }
                if (canceledIds.includes(i.status)) {
                    _statuses.canceled.count += i.total;
                }
            }
            _statuses.returned.count = returns_count;
        }
        return _statuses;
    }, [data, loading, error, searchParams]);
    return {
        statuses,
        handleChangeTab,
        loading: networkStatus === client.NetworkStatus.refetch || networkStatus === client.NetworkStatus.loading,
        error: apolloError(error),
    };
};

const orderStatusName = (orderId, prevOrderId) => {
    switch (orderId) {
        case 14:
            return 'WAITING_FOR_APPROVAL';
        case 15:
            return 'WAITING_FOR_PAYMENT';
        case 16:
            return 'WAITING_FOR_PAYMENT_APPROVAL';
        case 1:
            return 'UNPAID';
        case 2:
            return 'PAID';
        case 3:
            return 'IN_PREPARING';
        case 4:
            return 'SENT';
        case 5:
            return 'RECEIVED';
        case 8:
            return 'EXPIRED';
        case 10:
            return 'OVERTIME_ORDER_BY_MERCHANT';
        case 11:
            return 'CANCELED_ORDER_BY_MERCHANT';
        case 12:
            switch (prevOrderId) {
                case 11:
                    return 'CANCELED_ORDER_BY_MERCHANT_SETTLED';
                case 14:
                    return 'CANCELED_REQUEST_BY_MERCHANT';
            }
            break;
        case 13:
            switch (prevOrderId) {
                case 10:
                    return 'OVERTIME_ORDER_BY_MERCHANT_SETTLED';
                case 14:
                    return 'OVERTIME_REQUEST_BY_MERCHANT';
                case 15:
                    return 'OVERTIME_PAYMENT_BY_CUSTOMER';
            }
            break;
        case 17:
            return 'UNRECEIVED';
    }
    return 'UNPAID';
};

const refetchQueries = [GET_ORDERS_STATUS_COUNT, GET_ORDERS];
const allowedReceiveStatuses = {
    5: 'RECEIVED',
    17: 'UNRECEIVED',
};
const useOrderActions = (onCompletedAction) => {
    const [paymentCard, { loading: paymentCardLoading }] = client.useMutation(PAYMENT_CARD, {
        refetchQueries,
    });
    const [cancelOrder, { loading: removeLoading }] = client.useMutation(CANCEL_ORDER, {
        refetchQueries,
    });
    const [unrecivedOrder, { loading: unrecivedOrderLoading }] = client.useMutation(UPDATE_RECIEVE_STATUS, {
        refetchQueries,
    });
    const [getGateway] = client.useMutation(GET_GATEWAY, {
        refetchQueries,
    });
    const [getGatewayLoading, setGetGatewayLoading] = React.useState(false);
    const [error, setError] = React.useState({});
    const handleRePayOrder = React.useCallback(async (orderId) => {
        setGetGatewayLoading(true);
        await getGateway({
            variables: {
                id: orderId,
                content: {
                    redirect_url: window.origin,
                    canceled_url: window.origin,
                },
            },
            onError(err) {
                setError(apolloError(err));
                setGetGatewayLoading(false);
            },
            onCompleted(data) {
                if (data.customer.getGateway.gateway_link)
                    window.location.replace(data.customer.getGateway.gateway_link);
            },
        });
    }, []);
    const handleRemoveOrder = React.useCallback(async (orderId) => {
        setError({});
        return new Promise((resolve, reject) => {
            cancelOrder({
                variables: { id: orderId },
                onError(e) {
                    reject();
                    setError(apolloError(e));
                },
                onCompleted() {
                    onCompletedAction?.('REMOVE_ORDER');
                    resolve();
                },
            });
        });
    }, []);
    const handleSubmitCardToCardPayment = React.useCallback(async (orderId, image) => {
        setError({});
        return new Promise((resolve, reject) => {
            paymentCard({
                variables: { orderId, image },
                onCompleted: async () => {
                    resolve();
                    onCompletedAction?.('CARD_TO_CARD_PAYMENT');
                },
                onError(err) {
                    reject();
                    setError(apolloError(err));
                },
            });
        });
    }, []);
    const handleUnreceivedOrder = React.useCallback(async (orderId, receivedStatus) => {
        setError({});
        return new Promise((resolve, reject) => {
            unrecivedOrder({
                variables: {
                    orderId,
                    content: {
                        status: allowedReceiveStatuses[receivedStatus],
                    },
                },
                onCompleted: async () => {
                    resolve();
                    onCompletedAction?.(receivedStatus === 17 ? 'UNRECEIVED_ORDER' : 'RECEIVED_ORDER');
                },
                onError(err) {
                    reject();
                    setError(apolloError(err));
                },
            });
        });
    }, []);
    return {
        handleSubmitCardToCardPayment,
        handleRePayOrder,
        handleRemoveOrder,
        handleUnreceivedOrder: handleUnreceivedOrder,
        loading: paymentCardLoading || getGatewayLoading || removeLoading || unrecivedOrderLoading,
        error,
    };
};

const persianFullDate = (date) => `${Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' }).format(date)}`
    .replace(',', '')
    .split(' ')
    .reverse()
    .join(' ');

const orderDescription = (order, statusName, type = 'FULL') => {
    const start = order?.approximate_sending_date?.start ? new Date(order.approximate_sending_date.start) : new Date(), end = order?.approximate_sending_date?.end ? new Date(order.approximate_sending_date.end) : new Date(), receivedAt = order?.received_at ? new Date(order?.received_at) : new Date(), expiredAt = order?.expired_at ? new Date(order?.expired_at) : new Date();
    const now = new Date().getTime();
    const expireIn = expiredAt.getTime();
    const remainedSecond = (expireIn - now) / 1000;
    const remainedObject = {
        h: Math.floor(remainedSecond / (60 * 60)) || undefined,
        m: Math.floor((remainedSecond % (60 * 60)) / 60) || undefined,
    };
    const diff = `${remainedObject.h ? `${remainedObject.h} ساعت ${remainedObject.m ? 'و' : ''} ` : ''} ${remainedObject.m ? `${remainedObject.m} دقیقه ` : ''}`;
    const fullDescription = {
        WAITING_FOR_APPROVAL: 'درخواست شما ثبت شد برای پرداخت و ثبت نهایی سفارش لازم است فروشگاه درخواست شما را تایید کند.',
        WAITING_FOR_PAYMENT: 'فروشگاه سفارش شما را تایید کرد، برای ثبت سفارش 4 ساعت فرصت دارید مبلغ را کارت به کارت و تصویر آن را ارسال کنید.',
        WAITING_FOR_PAYMENT_APPROVAL: 'اطلاعات پرداخت شما ارسال شد برای ثبت نهایی سفارش لازم است فروشگاه صحت پرداخت شما را تایید کند.',
        IN_PREPARING: `سفارشات شما در حال آماده سازی است و در بازه ${persianFullDate(start)} الی ${persianFullDate(end)} به دستتان میرسد`,
        SENT: `سفارشات شما ارسال شد و در بازه ${persianFullDate(start)} الی ${persianFullDate(end)} به دستتان میرسد`,
        RECEIVED: `سفارش شما در روز ${persianFullDate(receivedAt)} تحویل داده شده است. در صورتی که سفارش به دست شما نرسیده به ما اطلاع دهید.`,
        UNRECEIVED: 'ما در حال بررسی مشکل هستیم. اگر سفارش را دریافت کردید به ما اطلاع دهید، در غیر اینصورت میتوانید برای پیگیری بیشتر با فروشگاه تماس بگیرید.',
        OVERTIME_REQUEST_BY_MERCHANT: 'سفارش شما به دلیل عدم تایید فروشگاه در زمان تعیین شده، منقضی شد.',
        OVERTIME_PAYMENT_BY_CUSTOMER: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        OVERTIME_ORDER_BY_MERCHANT: 'پرداخت شما به علت عدم تایید فروشگاه در مدت مشخص منقضی شده و مبلغ پرداختی به حساب شما بازگردانده می‌شود. برای اطلاعات بیشتر میتوانید با فروشگاه تماس بگیرید.',
        OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'پرداخت شما به علت عدم تایید فروشنده در مدت مشخص منقضی شده و مبلغ پرداختی به حساب شما بازگردانده می‌شود.',
        CANCELED_REQUEST_BY_MERCHANT: 'سفارش شما به دلیل عدم تایید پذیرنده در زمان تعیین شده، منقضی شد.',
        CANCELED_ORDER_BY_MERCHANT: 'پرداخت شما به علت عدم تایید فروشنده رد شده و مبلغ پرداختی به حساب شما بازگردانده می‌شود. ',
        CANCELED_ORDER_BY_MERCHANT_SETTLED: 'پرداخت شما توسط فروشنده رد شد. برای اطلاعات بیشتر میتوانید با فروشنده تماس بگیرید.',
        UNPAID: 'این سفارش پس از 70 دقیقه به صورت خودکار حذف می‌شود، برای ثبت آن قبل از پایان زمان هزینه سفارش را پرداخت کنید.',
        EXPIRED: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        PAID: '',
    };
    const summeryDescription = {
        WAITING_FOR_APPROVAL: 'درخواست شما ثبت شد برای پرداخت و ثبت نهایی سفارش لازم است فروشنده درخواست شما را تایید کند.',
        WAITING_FOR_PAYMENT: `برای ثبت سفارش ${diff} فرصت دارید مبلغ را کارت به کارت و تصویر آن را ارسال کنید.`,
        WAITING_FOR_PAYMENT_APPROVAL: 'اطلاعات پرداخت شما ارسال شد برای ثبت نهایی سفارش لازم است فروشنده صحت پرداخت شما را تایید کند.',
        IN_PREPARING: 'سفارش شما در حال آماده سازی برای ارسال است.',
        SENT: `سفارش شما برای ارسال،${order?.shipping?.name ? ` به ${order.shipping.name}` : ''} تحویل داده شد.`,
        RECEIVED: 'سفارش شما تحویل داده شده است.',
        UNRECEIVED: 'ما در حال بررسی مشکل هستیم.',
        OVERTIME_REQUEST_BY_MERCHANT: 'سفارش شما به دلیل عدم تایید فروشگاه در زمان تعیین شده، منقضی شد.',
        OVERTIME_PAYMENT_BY_CUSTOMER: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        OVERTIME_ORDER_BY_MERCHANT: 'سفارش شما تایید نشد.',
        OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'سفارش شما تایید نشد.',
        CANCELED_REQUEST_BY_MERCHANT: 'سفارش شما تایید نشد.',
        CANCELED_ORDER_BY_MERCHANT: 'سفارش شما تایید نشد.',
        CANCELED_ORDER_BY_MERCHANT_SETTLED: 'سفارش شما تایید نشد.',
        UNPAID: `شما برای ثبت این سفارش تنها ${diff} دقیقه فرصت دارید ﻣﺒﻠﻎ آن را ﭘﺮداﺧﺖ ﮐﻨﯿﺪ.`,
        EXPIRED: 'سفارش شما به دلیل عدم پرداخت در زمان تعیین شده، منقضی شد.',
        PAID: '',
    };
    return type === 'FULL' ? fullDescription[statusName] : summeryDescription[statusName];
};

const returnedOrderDescription = (status, type = 'SUMMERY') => (type === 'SUMMERY'
    ? [
        'درخواست مرجوعی شما ﺛﺒﺖ شد.',
        'درخواست مرجوعی شما در حال بررسی است.',
        'درخواست مرجوعی شما بررسی شده، از قسمت مشاهده مرجوعی میتوانید نتیجه را مشاهده کنید.',
    ]
    : [
        'در ﺧﻮاﺳﺖ ﻣﺮﺟﻮﻋﯽ ﺷﻤﺎ ﺛﺒﺖ شد، نتیجه را پس از بررسی از همین قسمت اطلاع رسانی می‌کنیم.',
        'درﺧﻮاﺳﺖ ﻣﺮﺟﻮﻋﯽ ﺷﻤﺎ دیده شد و در ﺣﺎل ﺑﺮرﺳﯽ اﺳﺖ. ﻧﺘﯿﺠﻪ را ﺑﻪ زودی ﺑﻪ ﺷﻤﺎ اﻃﻠﺎع ﻣﯽ دﻫﯿﻢ.',
        'درﺧﻮاﺳﺖ ﻣﺮﺟﻮﻋﯽ ﺷﻤﺎ ﺑﺎ دﻗﺖ ﺑﺮرﺳﯽ ﺷﺪه اﺳﺖ. نتیجه روی هر محصول بصورت مجزا مشخص شده است. ﺑﺮای اﻃﻠﺎﻋﺎت ﺑﯿﺸﺘﺮ ﻣﯽ ﺗﻮاﻧﯿﺪ ﺑﺎ ﻣﺎ ﺗﻤﺎس ﺑﯿﮕﺮﯾﺪ. ',
    ])[status - 1];

const useOrdersList = () => {
    const limit = 10;
    const searchParams = useOrdersSearchParams();
    const { data: d, error, fetchMore, loading, } = client.useQuery(GET_ORDERS, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: {
            params: searchParams,
        },
    });
    const data = React.useMemo(() => {
        if (d)
            return d;
    }, [d]);
    const [offset, setOffset] = React.useState({
        PROCESSING: 0,
        RECEIVED: 0,
        RETURNED: 0,
        CANCELED: 0,
        WAITING_FOR_PAYMENT: 0,
    });
    const orderActions = useOrderActions();
    const handleLoadMore = async () => {
        if (loading)
            return;
        await fetchMore({
            variables: {
                params: {
                    ...searchParams,
                    offset: offset[searchParams.status] + limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => ({
                    ...prev,
                    [searchParams.status]: prev[searchParams.status] + limit,
                }));
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getOrdersV3: {
                            ...previousResult.customer.getOrdersV3,
                            count: fetchMoreResult.customer.getOrdersV3.count,
                            next: fetchMoreResult.customer.getOrdersV3.next,
                            results: [
                                ...previousResult.customer.getOrdersV3.results,
                                ...fetchMoreResult.customer.getOrdersV3.results,
                            ],
                        },
                    },
                };
            },
        });
    };
    const orders = React.useMemo(() => {
        const _orders = [];
        if (data) {
            const { customer: { getOrdersV3: { results }, }, } = data;
            for (const order of results) {
                const { id, status, previous_status, items, reference_code: referenceCode, created_at: createdAt, cost, owner_card_name, owner_card_number, is_finished, received_by_customer, returns, } = order;
                // const isReturn =  searchParams.status === 'RETURNED';
                const statusName = orderStatusName(+status, +(previous_status ?? 0));
                const stepDescription = orderDescription(order, statusName, 'SUMMERY');
                _orders.push({
                    link: {
                        href: {
                            pathname: '/profile/orders/[orderId]',
                            query: {
                                orderId: id,
                            },
                        },
                    },
                    id: id,
                    referenceCode: referenceCode,
                    createdAt: moment__default["default"](createdAt).format('jYYYY/jMM/jDD'),
                    cost,
                    products: items.map((item) => {
                        const { details: { variant: { product_serialized }, }, } = item;
                        const { label: name, images, id: productId } = product_serialized || {};
                        return {
                            image: images?.at(0)?.image || '',
                            name: name || '',
                            link: {
                                href: {
                                    pathname: '/product/[...product]',
                                    query: {
                                        product: [String(productId), String(name?.replace(/ /gi, '-'))],
                                    },
                                },
                            },
                        };
                    }),
                    statusName,
                    stepDescription,
                    ...(statusName === 'RECEIVED' &&
                        !is_finished &&
                        !received_by_customer && {
                        handleUnrecivedOrder: () => orderActions.handleUnreceivedOrder(id, 17),
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                    ...(statusName === 'UNRECEIVED' && {
                        handleRecivedOrder: () => orderActions.handleUnreceivedOrder(id, 5),
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                    ...(statusName === 'UNPAID' && {
                        handleRemoveOrder: orderActions.handleRemoveOrder,
                        handleRePayOrder: orderActions.handleRePayOrder,
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                    ...(statusName === 'WAITING_FOR_PAYMENT' && {
                        handleSubmitCardToCardPayment: orderActions.handleSubmitCardToCardPayment,
                        paymentInformation: {
                            orderId: order.id,
                            cardNumber: owner_card_number,
                            cost,
                            cardOwnerName: owner_card_name,
                        },
                        loading: orderActions.loading,
                        error: orderActions.error,
                    }),
                });
            }
        }
        return _orders;
    }, [data]);
    return {
        orders,
        error: apolloError(error),
        loading,
        handleLoadMore,
        hasMore: !!data?.customer.getOrdersV3.next,
        count: data?.customer.getOrdersV3.count ?? 0,
    };
};

const useOrders = () => {
    const statusCount = useOrdersStatusCount();
    const ordersList = useOrdersList();
    const searchParams = useOrdersSearchParams();
    const { loading, error, networkStatus } = client.useQuery(GET_ORDERS, {
        notifyOnNetworkStatusChange: true,
        variables: {
            params: searchParams,
        },
    });
    return {
        data: {
            statusCount,
            ordersList,
        },
        loading: loading || networkStatus === client.NetworkStatus.refetch,
        error: apolloError(error),
    };
};

const useOrderInvoice = () => {
    const { query } = Router.useRouter();
    const { data: d } = client.useQuery(GET_ORDER, {
        variables: {
            orderId: query.orderId,
        },
    });
    const order = d?.customer.getOrderV3;
    const data = React.useMemo(() => {
        return order || {};
    }, [order]);
    return React.useMemo(() => {
        const { reference_code, created_at, cost, address, received_at, status, pocket, registration_type, shipping_time_count, receiver_name, receiver_last_name, receiver_number, shipping, post_tracking_number, order_description, } = data;
        return {
            reference_code: reference_code,
            created_at: created_at ? new Intl.DateTimeFormat('fa-IR').format(new Date(created_at)) : '',
            cost,
            address: address?.address,
            received_at: received_at ? new Intl.DateTimeFormat('fa-IR').format(new Date(received_at)) : '',
            status: status,
            packingMethod: pocket?.name ?? '',
            paymentMethod: registration_type === 3 ? 'کارت به کارت' : 'پرداخت آنلاین',
            shipping_time_count: shipping_time_count,
            receiver_name: `${receiver_name || ''} ${receiver_last_name || ''}`,
            receiver_number: receiver_number && String(receiver_number).replace(/\+98/, '0'),
            shippingMethod: shipping?.name,
            post_tracking_number: post_tracking_number,
            order_description: order_description,
        };
    }, [data]);
};

const useOrderItems = () => {
    const { query } = Router.useRouter();
    const { data: d } = client.useQuery(GET_ORDER, {
        variables: {
            orderId: query.orderId,
        },
    });
    const order = d?.customer.getOrderV3;
    const data = React.useMemo(() => {
        return order || {};
    }, [order]);
    return React.useMemo(() => {
        return {
            items: data?.items?.map((item) => useMiniProduct(item)) || [],
            productsCount: (data?.items || []).reduce((prev, current) => prev + current.unit_amount, 0),
            pocket_cost: data?.pocket_cost ?? 0,
            customer_shipping_cost: data.customer_shipping_cost ?? 0,
            tax: data?.tax ?? 0,
            cost: data?.cost ?? 0,
            total_discount_cost: data?.total_discount_cost ?? 0,
            totalProductsCost: data?.items?.reduce((prev, current) => prev + current.details.variant.cost * current.unit_amount, 0),
            loyalty_amount: data.loyalty_amount,
        };
    }, [data]);
};

const useOrderStatus = () => {
    const { query, push } = Router.useRouter();
    const { data: d, refetch } = client.useQuery(GET_ORDER, {
        variables: {
            orderId: query.orderId,
        },
    });
    const order = d?.customer.getOrderV3;
    const data = React.useMemo(() => {
        return order || {};
    }, [order]);
    const statusName = React.useMemo(() => {
        if (order)
            return orderStatusName(+order?.status, +(order?.previous_status ?? 0));
    }, [order]);
    const stepDescription = React.useMemo(() => {
        if (statusName)
            return orderDescription(data, statusName, 'FULL');
    }, [statusName, data]);
    const orderActions = useOrderActions(async (actionType) => {
        switch (actionType) {
            case 'CARD_TO_CARD_PAYMENT':
                refetch();
                exports.apolloLocalState.modify({
                    fields: {
                        getOrdersV3(cachedName) {
                            return cachedName.toUpperCase();
                        },
                    },
                });
                break;
            case 'UNRECEIVED_ORDER':
                refetch();
                break;
            case 'RECEIVED_ORDER':
                refetch();
                break;
            case 'REMOVE_ORDER':
                push({
                    pathname: '/profile/orders',
                });
                break;
            default:
                throw new Error('Action does not exist!');
        }
    });
    const paymentMethod = () => {
        return data?.registration_type === 3 ? 'CARD_TO_CARD' : 'GATEWAY';
    };
    const progressStep = () => {
        const payMethod = paymentMethod();
        const steps = {
            CARD_TO_CARD: {
                WAITING_FOR_APPROVAL: 1,
                WAITING_FOR_PAYMENT: 1,
                WAITING_FOR_PAYMENT_APPROVAL: 2,
                IN_PREPARING: 3,
                SENT: 4,
                UNRECEIVED: 4,
                RECEIVED: 5,
                OVERTIME_REQUEST_BY_MERCHANT: 1,
                OVERTIME_PAYMENT_BY_CUSTOMER: 1,
                OVERTIME_ORDER_BY_MERCHANT: 2,
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 2,
                CANCELED_REQUEST_BY_MERCHANT: 1,
                CANCELED_ORDER_BY_MERCHANT: 2,
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 2,
            },
            GATEWAY: {
                UNPAID: 1,
                EXPIRED: 1,
                PAID: 1,
                IN_PREPARING: 2,
                SENT: 3,
                UNRECEIVED: 3,
                RECEIVED: 4,
                OVERTIME_ORDER_BY_MERCHANT: 1,
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 1,
                CANCELED_ORDER_BY_MERCHANT: 1,
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 1,
            },
        };
        if (statusName && steps[payMethod][statusName]) {
            return steps[payMethod][statusName];
        }
        return 1;
    };
    const orderState = () => {
        const payMethod = paymentMethod();
        const state = {
            CARD_TO_CARD: {
                WAITING_FOR_APPROVAL: 'SUCCESS',
                WAITING_FOR_PAYMENT: 'SUCCESS',
                WAITING_FOR_PAYMENT_APPROVAL: 'SUCCESS',
                IN_PREPARING: 'SUCCESS',
                SENT: 'SUCCESS',
                RECEIVED: 'SUCCESS',
                UNRECEIVED: 'ERROR',
                OVERTIME_REQUEST_BY_MERCHANT: 'ERROR',
                OVERTIME_PAYMENT_BY_CUSTOMER: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
                CANCELED_REQUEST_BY_MERCHANT: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
                EXPIRED: 'ERROR',
                UNPAID: 'ERROR',
            },
            GATEWAY: {
                PAID: 'SUCCESS',
                IN_PREPARING: 'SUCCESS',
                SENT: 'SUCCESS',
                RECEIVED: 'SUCCESS',
                EXPIRED: 'ERROR',
                UNRECEIVED: 'ERROR',
                UNPAID: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT: 'ERROR',
                OVERTIME_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT: 'ERROR',
                CANCELED_ORDER_BY_MERCHANT_SETTLED: 'ERROR',
            },
        };
        if (statusName && state[payMethod][statusName]) {
            return state[payMethod][statusName];
        }
        return 'SUCCESS';
    };
    //Todo: Mohsen
    const stepTitle = () => {
        const payMethod = paymentMethod();
        const step = progressStep();
        const title = {
            CARD_TO_CARD: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
            },
            GATEWAY: {
                1: '',
                2: '',
                3: '',
                4: '',
            },
        };
        if (title[payMethod][step]) {
            return title[payMethod][step];
        }
        return '';
    };
    // const handleRefund: HandleRefundOrder = (orderId: string) => {
    //     push({
    //         pathname: '/profile/orders/refund/[orderId]',
    //         query: {
    //             orderId,
    //         },
    //     });
    // };
    return React.useMemo(() => {
        const { expired_at } = data;
        const hasStepExpireTime = [
            'WAITING_FOR_PAYMENT',
            'WAITING_FOR_APPROVAL',
            'WAITING_FOR_PAYMENT_APPROVAL',
            'PAID',
            'UNPAID',
        ];
        return {
            paymentMethod: paymentMethod(),
            progressStep: progressStep(),
            stepDescription,
            stepTitle: stepTitle(),
            statusName,
            orderState: orderState(),
            can_return_request: data.can_return_request,
            ...(hasStepExpireTime.includes(statusName) && {
                expired_at: new Date(expired_at),
            }),
            // ...(statusName === 'RECEIVED' &&
            //     data.can_return_request && {
            //         handleRefundOrder: () => handleRefund(data?.id),
            //     }),
            ...(statusName === 'RECEIVED' &&
                !data.is_finished &&
                !data.received_by_customer && {
                handleUnrecivedOrder: () => orderActions.handleUnreceivedOrder(data?.id, 17),
                loading: orderActions.loading,
                error: orderActions.error,
            }),
            ...(statusName === 'UNRECEIVED' && {
                handleRecivedOrder: () => orderActions.handleUnreceivedOrder(data?.id, 5),
                loading: orderActions.loading,
                error: orderActions.error,
            }),
            ...(statusName === 'UNPAID' &&
                paymentMethod() == 'GATEWAY' && {
                handleRemoveOrder: orderActions.handleRemoveOrder,
                handleRePayOrder: orderActions.handleRePayOrder,
                loading: orderActions.loading,
                error: orderActions.error,
            }),
            ...(statusName === 'WAITING_FOR_PAYMENT' && {
                handleSubmitCardToCardPayment: orderActions.handleSubmitCardToCardPayment,
                paymentInformation: {
                    id: data?.id,
                    owner_card_number: data?.owner_card_number,
                    cost: data?.cost,
                    owner_card_name: data?.owner_card_name,
                },
                loading: orderActions.loading,
                error: orderActions.error,
            }),
        };
    }, [data, statusName, stepDescription, orderActions.loading]);
};
//Todo: Currently, this part is commented because it cannot be updated after the expiration date.
// useEffect(() => {
//     let interval;
//     if (Object.keys(data).length) {
//         const { status } = data;
//         if (orderStatuses[status] === 'WAITING_FOR_APPROVE' || orderStatuses[status] === 'WAITING_FOR_PAYMENT') {
//             const { expired_at } = data;
//             const expire = new Date(expired_at).getTime();
//             interval = setInterval(async () => {
//                 if (expire - new Date().getTime() <= 0) {
//                     clearInterval(interval);
//                     await refetch({
//                         orderId: query.orderId,
//                     });
//                 }
//             }, 1000);
//         }
//     }
//     return () => clearInterval(interval);
// }, [data]);

const useOrderDetail = () => {
    const { query, push } = Router.useRouter();
    const orderId = React.useMemo(() => {
        return query.orderId;
    }, [query.orderId]);
    const { loading, error } = client.useQuery(GET_ORDER, {
        variables: {
            orderId: orderId,
        },
    });
    const invoice = useOrderInvoice();
    const items = useOrderItems();
    const status = useOrderStatus();
    const navigateToOrdersPage = React.useCallback(() => {
        push({
            pathname: '/profile/orders',
        });
    }, []);
    return {
        loading,
        error: apolloError(error),
        data: {
            invoice,
            items,
            status,
            orderId,
        },
        navigateToOrdersPage,
    };
};

// MAJOR
const useReturnedOrderStatus = () => {
    const { query: { orderId }, } = Router.useRouter();
    const { data: d } = client.useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId,
        },
    });
    const order = d?.customer.getReturnedOrder;
    const data = React.useMemo(() => {
        return order || {};
    }, [order]);
    const { status, status_display } = data;
    return React.useMemo(() => ({
        step: status || 0,
        status_display: status_display || '',
        step_description: returnedOrderDescription(status, 'FULL') || '',
    }), [data]);
};

// MAJOR
const useReturnedOrderInvoice = () => {
    const { query: { orderId }, } = Router.useRouter();
    const { data: d } = client.useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId,
        },
    });
    const order = d?.customer.getReturnedOrder;
    const data = React.useMemo(() => {
        return order || {};
    }, [order]);
    const { reference_code, order_reference_code, created_at, order_created_at, first_name, last_name, phone_number, card_number, } = data;
    return React.useMemo(() => ({
        reference_code,
        order_reference_code,
        created_at: moment__default["default"](created_at).format('jYYYY/jMM/jDD'),
        order_created_at: moment__default["default"](order_created_at).format('jYYYY/jMM/jDD'),
        first_name,
        last_name,
        phone_number,
        card_number,
    }), [data]);
};

// MAJOR
const useReturnedOrderItems = () => {
    const { query: { orderId }, } = Router.useRouter();
    const { data: d } = client.useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId,
        },
    });
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        if (d)
            setItems(d.customer.getReturnedOrder.items);
    }, [d]);
    return React.useMemo(() => items.map((item) => {
        const { id, status_display, reason, returned_cost, status, count, description, reply_reason, reply_description, relative_voucher_amount, order_item, images, } = item;
        const { single_cost, single_primary_cost, single_profit, single_tax } = order_item;
        return {
            id,
            reason,
            description,
            images,
            reply_reason,
            reply_description,
            status,
            status_display,
            returned_cost,
            count,
            single_cost,
            single_primary_cost,
            relative_voucher_amount,
            single_profit,
            single_tax,
            order_item: useMiniProduct(order_item),
        };
    }), [items]);
};

// MAJOR
const useReturnedOrderDetail = () => {
    const { push } = Router.useRouter();
    const { query: { orderId }, } = Router.useRouter();
    const { loading, error } = client.useQuery(GET_RETURNED_ORDER, {
        variables: {
            orderId: orderId,
        },
    });
    const status = useReturnedOrderStatus();
    const invoice = useReturnedOrderInvoice();
    const items = useReturnedOrderItems();
    const factor = React.useMemo(() => ({
        items,
        approvedProductsCount: items.reduce((acc, currentValue) => acc + currentValue.count, 0),
        allReturnedCost: items.reduce((acc, currentValue) => acc + currentValue.returned_cost, 0),
    }), [items]);
    const navigateToFactor = () => {
        push({
            pathname: '/profile/orders/returned/factor/[orderId]',
            query: {
                orderId,
            },
        });
    };
    return {
        data: {
            status,
            invoice,
            items,
            ...(status.step === 3 && { navigateToFactor, factor }),
        },
        error: apolloError(error),
        loading,
    };
};

const useSelectableOrder = () => {
    const { error, loading, data } = useOrderDetail();
    const { items: { items: products }, orderId, status, } = data;
    const [selectableItems, setSelectableItems] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const handleSelectItem = (selectedID) => {
        setSelectableItems((prev) => prev.map((prevItem) => prevItem.selectedID === selectedID ? { ...prevItem, selected: !prevItem.selected } : prevItem));
    };
    React.useEffect(() => {
        setSelectableItems(products
            .map((product) => {
            const unflattenProducts = [];
            for (let index = 0; index < product.amount; index++) {
                unflattenProducts.push({
                    product,
                    selected: false,
                    selectedID: `${product.id}${index}`,
                    handleSelectItem: () => {
                        handleSelectItem(`${product.id}${index}`);
                    },
                });
            }
            return unflattenProducts;
        })
            .flat());
    }, [products]);
    const createSelectedItems = React.useCallback(() => {
        setSelectedItems(selectableItems.filter((item) => item.selected).map((item) => item.product));
    }, [selectableItems]);
    return React.useMemo(() => ({
        error,
        data,
        loading,
        orderId,
        status,
        selectableItems,
        selectedItems,
        createSelectedItems,
    }), [selectableItems, selectedItems]);
};

const reasonItems = ['کالا ایراد فنی دارد', 'کالا آسیب دیده است', 'کالا غیر اصل میباشد', 'گارانتی معتبر نمیباشد'];
const useRefundOrder = () => {
    const { push } = Router.useRouter();
    const { data: userData } = useUser();
    const { info: { last_name, first_name, phone_number }, } = userData;
    const { selectableItems, createSelectedItems, selectedItems, error: orderError, loading, data, } = useSelectableOrder();
    const { status, orderId } = data;
    const [error, setError] = React.useState(orderError);
    const [card_number, setCardNumber] = React.useState('');
    const [step, setStep] = React.useState(1);
    const [reasons, setReasons] = React.useState([]);
    const [createReturnOrder, { loading: retrunLoading }] = client.useMutation(RETURN_ORDER);
    React.useEffect(() => {
        setError(apolloError(orderError));
    }, [orderError]);
    const handleNextStep = (reasonValues) => {
        [
            () => {
                const isSelected = selectableItems.some((item) => item.selected);
                if (isSelected) {
                    createSelectedItems();
                    setStep(2);
                }
            },
            () => {
                const notEmptyReasons = Array.isArray(reasonValues) &&
                    reasonValues.length &&
                    reasonValues.every((item) => item.description && item.orderItemId && item.reason);
                if (notEmptyReasons) {
                    setReasons(reasonValues);
                    setStep(3);
                }
            },
            async () => {
                if (card_number && status.can_return_request) {
                    await createReturnOrder({
                        variables: {
                            content: {
                                order: +orderId,
                                items: reasons.map((item) => ({
                                    images: item?.images || [],
                                    description: item.description,
                                    reason: item.reason,
                                    order_item: +item.orderItemId,
                                })),
                                first_name,
                                last_name,
                                phone_number,
                                card_number,
                            },
                        },
                        onCompleted: () => {
                            push({
                                pathname: '/profile/orders/refund/success/[orderId]',
                                query: {
                                    orderId,
                                },
                            });
                        },
                        onError: (e) => {
                            setError(apolloError(e));
                        },
                    });
                }
            },
        ][step - 1]?.();
    };
    const navigateBack = React.useCallback(() => {
        step > 1
            ? setStep((prev) => prev - 1)
            : push({
                pathname: '/profile/orders/[orderId]',
                query: {
                    orderId,
                },
            });
    }, [step]);
    const userInfo = {
        last_name,
        first_name,
        phone_number,
        card_number,
    };
    return React.useMemo(() => ({
        selectableItems,
        error: error,
        loading: loading || retrunLoading,
        status,
        data,
        selectedItems,
        step,
        handleNextStep,
        reasonItems,
        info: {
            ...userInfo,
            handleChangeCardNumber: setCardNumber,
        },
        navigateBack,
        navigateToOrdersPage: () => {
            push({
                pathname: '/profile/orders',
            });
        },
        navigateToReturnedOrderPage: () => {
            push({
                pathname: '/profile/orders',
                query: {
                    status: 'returned',
                },
            });
        },
    }), [step, selectedItems, selectableItems, userInfo, retrunLoading]);
};

const useAddress = () => {
    const { data: queryData, loading: fetchLoading, error: fetchError, } = client.useQuery(GET_ADDRESSES, {
        skip: !isUserLoggedIn(),
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [deleteAddress, { loading: removeLoading }] = client.useMutation(DELETE_ADDRESS);
    const [updateAddress, { loading: updateLoading }] = client.useMutation(UPDATE_ADDRESS);
    const [createAddress, { loading: createLoading }] = client.useMutation(CREATE_ADDRESS);
    const [stateData, setStateData] = React.useState([]);
    const [removeError, setRemoveError] = React.useState({});
    const [updateError, setUpdateError] = React.useState({});
    const [createError, setCreateError] = React.useState({});
    React.useEffect(() => {
        if (queryData)
            setStateData(queryData.customer.getAddresses);
    }, [queryData]);
    const handleUpdateAddress = async (id, address, onCompleted) => {
        setUpdateError({});
        await updateAddress({
            variables: {
                id,
                content: address,
            },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            onCompleted() {
                onCompleted?.();
            },
            onError(e) {
                setUpdateError(apolloError(e));
            },
        });
    };
    const handleRemoveAddress = async (id, onCompleted) => {
        setRemoveError({});
        await deleteAddress({
            variables: { id },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            update(cache) {
                const data = JSON.parse(JSON.stringify(cache.readQuery({
                    query: GET_ADDRESSES,
                })));
                data.customer.getAddresses = data.customer.getAddresses.filter((i) => i.id !== id);
                cache.writeQuery({
                    query: GET_ADDRESSES,
                    data,
                });
                onCompleted?.();
            },
            onError(e) {
                setRemoveError(apolloError(e));
            },
        });
    };
    const handleCreateAddress = async (address, onCompleted) => {
        setCreateError({});
        await createAddress({
            variables: { content: address },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            update(cache, { data: mutateData }) {
                const createAddress = mutateData?.customer.createAddress;
                const data = JSON.parse(JSON.stringify(cache.readQuery({
                    query: GET_ADDRESSES,
                })));
                data.customer.getAddresses = data.customer.getAddresses.unshift(createAddress);
                cache.writeQuery({
                    query: GET_ADDRESSES,
                    data,
                });
                onCompleted?.();
            },
            onError(e) {
                setCreateError(apolloError(e));
            },
        });
    };
    const addresses = React.useMemo(() => {
        return stateData.map((item) => {
            const address = {
                ...item,
                handleRemoveAddress: (onCompleted) => handleRemoveAddress(item.id, onCompleted),
            };
            delete address.__typename;
            return address;
        });
    }, [stateData]);
    return {
        data: { addresses },
        loadings: {
            fetchLoading,
            removeLoading,
            updateLoading,
            createLoading,
        },
        errors: {
            removeError,
            updateError,
            createError,
            fetchError: apolloError(fetchError),
        },
        handleCreateAddress,
        handleUpdateAddress,
    };
};

const useFavoritesSearchParams = (query) => {
    const searchParams = {
        offset: ((query.page ? +query.page : 1) - 1) * 10,
    };
    for (const i in searchParams)
        if (!searchParams[i])
            delete searchParams[i];
    return searchParams;
};

const useFavorites = () => {
    const limit = 10;
    const { query } = Router.useRouter();
    const searchParams = useFavoritesSearchParams(query);
    const { data: dataFavorites, error: fetchError, loading: fetchLoading, fetchMore, refetch, } = client.useQuery(GET_FAVORITES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            params: searchParams,
        },
    });
    const [removeFavorite] = client.useMutation(REMOVE_FAVORITES);
    const [addFavorites, { loading: addLoading }] = client.useMutation(ADD_FAVORITES);
    const [stateData, setStateData] = React.useState(undefined);
    const [offset, setOffset] = React.useState(0);
    const [addError, setAddError] = React.useState({});
    const [removeFromFavorites] = client.useMutation(REMOVE_FAVORITES);
    React.useEffect(() => {
        if (dataFavorites)
            setStateData(dataFavorites);
    }, [dataFavorites]);
    const handleAddToFavorites = async (id, onCompleted, onError) => {
        setAddError({});
        await addFavorites({
            variables: { id },
            onCompleted() {
                refetch({ params: searchParams });
                onCompleted?.();
            },
            onError(e) {
                setAddError(apolloError(e));
                onError(apolloError(e));
            },
        });
    };
    const handleRemoveFavorite = async (id, onCompleted, onError) => {
        await removeFavorite({
            variables: { id },
            update(cache) {
                const data = JSON.parse(JSON.stringify(cache.readQuery({
                    query: GET_FAVORITES,
                    variables: {
                        params: searchParams,
                    },
                })));
                data.customer.getFavoritesV2.results = data.customer.getFavoritesV2.results.filter((i) => i.id !== id);
                cache.writeQuery({
                    query: GET_FAVORITES,
                    variables: {
                        params: searchParams,
                    },
                    data,
                });
                onCompleted?.();
            },
            onError(e) {
                onError(apolloError(e));
            },
            onCompleted() {
                removeFromFavorites({
                    variables: { id: id },
                    refetchQueries: [GET_PRODUCT, 'Product'],
                });
            },
        });
    };
    const handleLoadMore = async () => {
        if (fetchError)
            return;
        await fetchMore({
            variables: {
                params: {
                    ...searchParams,
                    offset: offset + limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getFavoritesV2: {
                            ...previousResult.customer.getFavoritesV2,
                            count: fetchMoreResult.customer.getFavoritesV2.count,
                            next: fetchMoreResult.customer.getFavoritesV2.next,
                            results: [
                                ...previousResult.customer.getFavoritesV2.results,
                                ...fetchMoreResult.customer.getFavoritesV2.results,
                            ],
                        },
                    },
                };
            },
        });
    };
    const data = React.useMemo(() => {
        if (stateData?.customer) {
            return stateData.customer.getFavoritesV2.results.map((item) => ({
                ...useMiniProduct(item),
                handleRemoveFavorite: (onCompleted, onError) => handleRemoveFavorite(item.id, onCompleted, onError),
            }));
        }
        return [];
    }, [stateData]);
    return {
        errors: {
            addError,
            fetchError: apolloError(fetchError),
        },
        loadings: {
            fetchLoading,
            addLoading,
        },
        data,
        handleLoadMore,
        hasMore: !!stateData?.customer.getFavoritesV2.next,
        count: stateData?.customer.getFavoritesV2.count ?? 0,
        handleAddToFavorites,
    };
};

const excludeSelect = ['survey_sms_notify', 'return_invoice_sms_notify'];
const useNotificationSettings = () => {
    const { loading: fetchLoading, data, error: fetchError } = client.useQuery(GET_NOTIFICATION_SETTING);
    const [updateNotificationSettings, { loading: updateLoading }] = client.useMutation(UPDATE_NOTIFICATION_SETTINGS);
    const [notificationSetting, setNotificationSetting] = React.useState({});
    const [updateError, setUpdateError] = React.useState({});
    const loading = updateLoading || fetchLoading;
    React.useEffect(() => {
        if (data) {
            const { customer: { getNotificationSetting }, } = data;
            const clone = { ...getNotificationSetting };
            delete clone['__typename'];
            delete clone['id'];
            setNotificationSetting(clone);
        }
    }, [data]);
    const handleChange = (key) => {
        if (excludeSelect.includes(key))
            return;
        setNotificationSetting((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    const handleSaveSettings = async (onCompleted) => {
        if (loading || !data)
            return;
        setUpdateError({});
        await updateNotificationSettings({
            variables: {
                content: notificationSetting,
            },
            onError(e) {
                setUpdateError(apolloError(e));
            },
            onCompleted,
        });
    };
    const handleAggregateSelect = (settingField, type = 'SELECT') => {
        const newNotificationSetting = { ...notificationSetting };
        for (const i in newNotificationSetting) {
            if (!excludeSelect.includes(i) && i.includes(settingField)) {
                newNotificationSetting[i] = type === 'SELECT';
            }
        }
        setNotificationSetting(newNotificationSetting);
    };
    const settings = React.useMemo(() => {
        const _settings = {
            hot_offer_available: {},
            order_invoice: {},
            product_available: {},
            receive_order: {},
            return_invoice: {},
            survey: {},
        };
        for (const i in notificationSetting) {
            if (i.includes('hot_offer_available_')) {
                _settings.hot_offer_available = {
                    ..._settings.hot_offer_available,
                    [i.replace('hot_offer_available_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('order_invoice_')) {
                _settings.order_invoice = {
                    ..._settings.order_invoice,
                    [i.replace('order_invoice_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('product_available_')) {
                _settings.product_available = {
                    ..._settings.product_available,
                    [i.replace('product_available_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('receive_order_')) {
                _settings.receive_order = {
                    ..._settings.receive_order,
                    [i.replace('receive_order_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('return_invoice_')) {
                _settings.return_invoice = {
                    ..._settings.return_invoice,
                    [i.replace('return_invoice_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
            if (i.includes('survey_')) {
                _settings.survey = {
                    ..._settings.survey,
                    [i.replace('survey_', '').replace('_notify', '')]: {
                        value: notificationSetting[i],
                        handleChange: () => handleChange(i),
                    },
                };
            }
        }
        return _settings;
    }, [notificationSetting]);
    return {
        loadings: {
            fetchLoading,
            updateLoading,
        },
        errors: {
            updateError,
            fetchError: apolloError(fetchError),
        },
        data: { settings },
        handleSaveSettings,
        handleAggregateSelect,
    };
};

const useBasketItems = () => {
    const { basket } = useStore();
    const basketItems = React.useMemo(() => {
        const _items = [];
        for (const item of basket.data.items) {
            const { id, amount, product_id, online_cost, has_loyalty, online_primary_cost, variant_name, image, variant_id, bonus_value, product_label, option_values, orderable_count, single_tax, } = item;
            _items.push({
                id,
                image: image?.image ?? '',
                product_label,
                product_id,
                amount,
                single_tax,
                online_cost,
                online_primary_cost,
                has_loyalty,
                tax: single_tax * amount,
                bonus_value,
                link: {
                    href: {
                        pathname: '/product/[...product]',
                        query: {
                            product: [product_id, product_label?.replace(/ /gi, '-')],
                        },
                    },
                },
                optionValue: option_values
                    ? option_values?.some((item) => item.option)
                        ? handleCreateOptionValue(option_values)
                        : option_values
                    : [],
                variant: {
                    variant_name,
                    variant_id,
                    orderable_count,
                },
                handleIncrementAmount: () => basket.handleItemsAmount(variant_id, 'increment'),
                handleDecrementAmount: () => basket.handleItemsAmount(variant_id, 'decrement'),
                handleRemove: () => basket.handleItemsAmount(variant_id, 'remove'),
                handleAddToFavorites: (onCompleted) => basket.handleAddToFavorites(product_id, variant_id, onCompleted),
            });
        }
        return _items;
    }, [basket.data.items]);
    return {
        loading: !basket.initialSync,
        error: apolloError({}),
        products: basketItems,
    };
};

const useFactor = ({ basketItems, shippingMethod, packing, discountCode, loyaltyCredit, loyaltyGift, }) => {
    const { tax: storeTax } = exports.apolloLocalState.readQuery({ query: GET_STORE_INFO })?.customer?.getStoreInfo || {};
    return React.useMemo(() => {
        const shippingCost = shippingMethod.shippingList.find((i) => i.selected)?.cost || 0, packingCost = packing.packs.find((i) => i.selected)?.cost || 0, isSetDiscountCode = !!discountCode.discount.code, productsCount = basketItems.products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.amount;
        }, 0), discountInProduct = basketItems.products.reduce((previousValue, currentValue) => {
            return (previousValue + (currentValue.online_primary_cost - currentValue.online_cost) * currentValue.amount);
        }, 0), tax = basketItems.products.reduce((previousValue, currentValue) => {
            return previousValue + (!storeTax ? 0 : Math.round(currentValue.tax));
        }, 0), totalCost = Math.round(tax) +
            basketItems.products.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.online_cost * currentValue.amount;
            }, 0), discountByCodeCost = isSetDiscountCode
            ? discountCode.discount.type === 'percent'
                ? totalCost * discountCode.discount.amount > discountCode.discount.limit
                    ? discountCode.discount.limit
                    : Math.round(Math.floor(totalCost * discountCode.discount.amount))
                : discountCode.discount.amount
            : 0, totalCostAfterDiscount = totalCost - discountByCodeCost < 0 ? 0 : totalCost - discountByCodeCost + (shippingCost + packingCost), totalProductsCost = basketItems.products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.online_primary_cost * currentValue.amount;
        }, 0), totalCostAfterLoyalty = totalCostAfterDiscount - (loyaltyCredit.selected ? loyaltyCredit.credit : 0);
        let loyaltyGiftCost;
        if (loyaltyGift.active) {
            switch (loyaltyGift.strategy) {
                case 'A':
                    if (totalCost >= loyaltyGift.limit)
                        loyaltyGiftCost = loyaltyGift.value;
                    break;
                case 'B':
                    if (totalCost * loyaltyGift.value < loyaltyGift.limit)
                        loyaltyGiftCost = totalCost * loyaltyGift.value;
                    else
                        loyaltyGiftCost = loyaltyGift.limit;
                    break;
                case 'C':
                    loyaltyGiftCost = basketItems.products
                        .map((i) => (i.has_loyalty ? i.bonus_value * i.amount : 0))
                        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                    break;
                case 'D':
                    loyaltyGiftCost = Math.round(Math.floor(basketItems.products
                        .map((i) => (i.has_loyalty ? i.tax + i.online_cost * i.amount : 0))
                        .reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
                        loyaltyGift.value));
                    break;
                default:
                    loyaltyGiftCost = 0;
                    break;
            }
        }
        return {
            discount: discountInProduct + discountByCodeCost,
            totalProductsCost,
            totalCost: totalCostAfterLoyalty < 0 ? 0 : totalCostAfterLoyalty,
            productsCount,
            shippingCost,
            packingCost,
            tax,
            loyalty: totalCostAfterLoyalty < 0 ? totalCostAfterDiscount : loyaltyCredit.credit,
            loyaltyGift: loyaltyGiftCost,
        };
    }, [
        basketItems.products,
        shippingMethod.shippingList,
        packing.packs,
        discountCode.discount,
        loyaltyCredit.selected,
        loyaltyGift.strategy,
    ]);
};

const useBasketAddress = () => {
    const { pathname, push, query } = Router.useRouter();
    const address = useAddress();
    const { basket } = useStore();
    const user = useUser();
    React.useEffect(() => {
        const { data: { receiverInfo }, } = basket;
        const info = {
            phoneNumber: receiverInfo?.phoneNumber?.length ? receiverInfo?.phoneNumber : user?.data?.info?.phone_number,
            firstName: receiverInfo?.firstName?.length ? receiverInfo?.firstName : user?.data?.info?.first_name,
            lastName: receiverInfo?.lastName?.length ? receiverInfo?.lastName : user?.data?.info?.last_name,
        };
        handleChangeReceiverInfo(info);
    }, [user?.data?.info]);
    React.useEffect(() => {
        (async () => {
            if (query.step?.at(0) === 'address') {
                if (!basket.data.items.length) {
                    const q = { ...query };
                    delete q.step;
                    await push({
                        pathname,
                        query: q,
                    });
                }
            }
        })();
    }, [query.step]);
    const handleSelectAddress = (id) => {
        basket.handleUpdateLocalBasket({ address: id });
    };
    const handleChangeReceiverInfo = (info) => {
        basket.handleUpdateLocalBasket({ receiverInfo: { ...basket.data.receiverInfo, ...info } });
    };
    const basketAddresses = React.useMemo(() => {
        return address.data.addresses.map((address) => ({
            ...address,
            selected: basket.data.address === address.id,
            handleSelectAddress: () => handleSelectAddress(address.id),
        }));
    }, [address.data.addresses, basket.data.address]);
    return {
        ...address,
        addresses: basketAddresses,
        receiverInfo: basket.data.receiverInfo,
        handleChangeReceiverInfo,
    };
};

const useShippingMethod = () => {
    const [getShippingMethod, { error, loading }] = client.useLazyQuery(GET_SHIPPING_ADDRESS_SOCKET, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
    });
    const { pathname, push, query } = Router.useRouter();
    const { basket } = useStore();
    const sokectShpingList = client.useReactiveVar(shpingVar);
    const [stateData, setStateData] = React.useState([]);
    const [approximateSendingDate, setApproximateSendingDate] = React.useState('');
    React.useEffect(() => {
        if (sokectShpingList)
            setStateData(sokectShpingList ?? []);
    }, [sokectShpingList]);
    React.useEffect(() => {
        if (stateData && basket.data.shipping !== '0') {
            const t = stateData.find((ele) => ele.id == basket.data.shipping)?.approximate_sending_date;
            const start = t?.start ? new Date(t.start) : null;
            const end = t?.end ? new Date(t.end) : null;
            if (start && end) {
                setApproximateSendingDate(`سفارش شما در بازه ${persianFullDate(start)} تا ${persianFullDate(end)} به دستتان می‌رسد.`);
            }
            else {
                setApproximateSendingDate('ابتدا روش ارسال را انتخاب کنید');
            }
        }
    }, [basket.data.shipping, stateData]);
    const fetchShippingMethod = async () => {
        if (parseInt(basket.data.address)) {
            await getShippingMethod({
                variables: {
                    addressId: basket.data.address,
                },
            });
        }
        else {
            await push({
                pathname,
                query: {
                    ...query,
                    step: ['address'],
                },
            });
        }
    };
    const handleSelectShipping = (id) => {
        basket.handleUpdateLocalBasket({ shipping: id });
    };
    const shippingList = React.useMemo(() => {
        return stateData
            .filter((i) => i.cost != -2)
            .map((item) => {
            return {
                id: item.id,
                name: item.name,
                timeSendingDays: item.time_sending,
                cost: item.cost,
                selected: basket.data.shipping === item.id,
                loading: item.cost == -3 ? true : false,
                handleSelectShipping: () => handleSelectShipping(item.id),
            };
        });
    }, [stateData, basket.data.shipping, sokectShpingList]);
    return {
        fetchShippingMethod,
        approximateSendingDate,
        shippingList,
        error: apolloError(error),
        loading,
    };
};

const useTransactionType = ( /*{ totalCost }: { totalCost: number }*/) => {
    const { pathname, push, query } = Router.useRouter();
    const { data: queryData, loading, error, } = client.useQuery(GET_TRANSACTION_TYPES, {
        skip: !isUserLoggedIn(),
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [stateData, setStateData] = React.useState([]);
    const { basket } = useStore();
    React.useEffect(() => {
        if (queryData)
            setStateData(queryData.customer.getTransactionTypes);
    }, [queryData]);
    // useEffect(() => { //Todo: Fix re render
    //     if (totalCost <= 0) {
    //         basket.handleUpdateLocalBasket({ transaction: '1' });
    //         setStateData(stateData.filter((i) => i.gateway_type === '1'));
    //     } else if (queryData) {
    //         basket.handleUpdateLocalBasket({ transaction: '' });
    //         setStateData(queryData?.customer?.getTransactionTypes || []);
    //     }
    // }, [stateData, totalCost]);
    React.useEffect(() => {
        (async () => {
            if (query.step?.at(0) === 'payment') {
                if (basket.data.shipping === '0') {
                    await push({
                        pathname,
                        query: {
                            ...query,
                            step: ['shipping'],
                        },
                    });
                }
            }
        })();
    }, [query.step]);
    const transactions = React.useMemo(() => {
        return stateData.map((item) => ({
            name: item.persian_gateway_type,
            selected: +basket.data.transaction === item.gateway_type,
            gatewayType: item.gateway_type,
            handleSelectTransactionType: () => basket.handleUpdateLocalBasket({ transaction: item.gateway_type + '' }),
        }));
    }, [stateData, basket.data.transaction]);
    return { transactions, error: apolloError(error), loading };
};

const usePacking = () => {
    const { asPath } = Router.useRouter();
    const { data: queryData, error, loading, } = client.useQuery(GET_POCKET, {
        skip: asPath !== '/profile/cart/shipping',
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [stateData, setStateData] = React.useState([]);
    const { basket } = useStore();
    React.useEffect(() => {
        if (queryData)
            setStateData(queryData.customer.getPocket);
    }, [queryData]);
    const handleSelectPack = (packing) => {
        basket.handleUpdateLocalBasket({ packing });
    };
    const packs = React.useMemo(() => {
        return stateData.map((item) => ({
            cost: item.cost,
            name: item.name,
            id: item.name,
            selected: basket.data.packing === item.id,
            handleSelectPack: () => handleSelectPack(item.id),
        }));
    }, [stateData, basket.data.packing]);
    return {
        packs,
        error: apolloError(error),
        loading,
    };
};

const useDiscountCode = () => {
    const [checkDiscountCode, { loading }] = client.useMutation(VOUCHER_CHECK);
    const [error, setError] = React.useState({});
    const [discount, setDiscount] = React.useState({
        amount: 0,
        code: '',
        id: '',
        limit: 0,
        type: 'percent',
        totalCost: 0,
    });
    const [code, setCode] = React.useState('');
    const { basket } = useStore();
    React.useEffect(() => {
        basket.handleUpdateLocalBasket({ discount: '' });
    }, []);
    const handleSubmitDiscountCode = async () => {
        if (!code.length || loading)
            return;
        setError({});
        await checkDiscountCode({
            variables: {
                content: { code },
            },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            onError(e) {
                setError(apolloError(e));
                setDiscount({
                    ...discount,
                    amount: 0,
                    id: '',
                    limit: 0,
                    type: 'percent',
                });
            },
            onCompleted(d) {
                const voucherCheck = d.customer?.voucherCheck;
                const totalCost = basket.data.items.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.cost * currentValue.amount;
                }, 0);
                const amount = voucherCheck?.voucher_type_display === 'percent'
                    ? (voucherCheck.amount ?? 0) / 100
                    : voucherCheck?.amount ?? 0;
                const discount = {
                    limit: voucherCheck?.limit ?? 0,
                    amount: amount,
                    type: voucherCheck?.voucher_type_display,
                    code: voucherCheck?.code ?? '',
                    id: voucherCheck?.id ?? '',
                    totalCost: voucherCheck?.voucher_type_display === 'percent'
                        ? totalCost * amount > (voucherCheck?.limit ?? 0)
                            ? voucherCheck.limit ?? 0
                            : Math.round(Math.floor(totalCost * amount))
                        : amount,
                };
                if (discount.type === 'cash' && discount.limit > totalCost) {
                    setError({ detail: 'limit greater than total cost' });
                    setDiscount({
                        ...discount,
                        amount: 0,
                        id: '',
                        limit: 0,
                        type: 'percent',
                    });
                }
                else {
                    setDiscount(discount);
                    if (d.customer?.voucherCheck?.id)
                        basket.handleUpdateLocalBasket({ discount: d.customer?.voucherCheck.id });
                }
            },
        });
    };
    const handleChangeDiscountCode = (value) => {
        setCode(value);
    };
    const handleRemoveDiscountCode = () => {
        setCode('');
        setDiscount({
            amount: 0,
            code: '',
            id: '',
            limit: 0,
            type: 'percent',
            totalCost: 0,
        });
        setError({});
        basket.handleUpdateLocalBasket({ discount: '' });
    };
    return {
        error,
        loading,
        handleSubmitDiscountCode,
        handleRemoveDiscountCode,
        handleChangeDiscountCode,
        discount,
        code,
    };
};

const useLoyaltyCredit = () => {
    const { error, loading, data: queryData, } = client.useQuery(GET_LOYALTY_CREDIT, {
        skip: !isUserLoggedIn(),
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [stateData, setStateData] = React.useState(0);
    const { basket } = useStore();
    React.useEffect(() => {
        if (queryData)
            setStateData(queryData.customer.getLoyaltyCreditV2.loyalty_credit);
    }, [queryData]);
    const handleSelectLoyaltyCredit = () => {
        basket.handleUpdateLocalBasket({ useLoyalty: !basket.data.useLoyalty });
    };
    return {
        handleSelectLoyaltyCredit,
        loading,
        error: apolloError(error),
        credit: stateData,
        selected: basket.data.useLoyalty,
    };
};

const useLoyaltyGift = () => {
    const { earning, is_earning_loyalty_active } = client.useQuery(GET_STORE_INFO, { context: { headers: { 'accept-language': 'fa-IR' } } }).data?.customer
        .getStoreInfo || {};
    return React.useMemo(() => {
        return {
            active: is_earning_loyalty_active,
            strategy: earning?.game_type_display.toUpperCase(),
            value: earning?.game_type_display === 'a' ? earning?.value : earning?.value / 100,
            limit: earning?.limit,
        };
    }, [earning, is_earning_loyalty_active]);
};

const useDescription = () => {
    const { basket } = useStore();
    const handleChangeDescription = (value) => {
        basket.handleUpdateLocalBasket({ description: value });
    };
    return React.useMemo(() => {
        return {
            description: basket.data.description,
            handleChangeDescription,
        };
    }, [basket.data.description]);
};

const useBasket = () => {
    const { query, pathname, push } = Router.useRouter();
    const { basket } = useStore();
    const basketItems = useBasketItems();
    const basketAddress = useBasketAddress();
    const shippingMethod = useShippingMethod();
    const discountCode = useDiscountCode();
    const packing = usePacking();
    const loyaltyCredit = useLoyaltyCredit();
    const loyaltyGift = useLoyaltyGift();
    const description = useDescription();
    const factor = useFactor({ basketItems, shippingMethod, packing, discountCode, loyaltyCredit, loyaltyGift });
    const transactionType = useTransactionType( /*{ totalCost: factor.totalCost }*/);
    const [createOrder] = client.useMutation(CREATE_ORDER);
    const { data } = client.useQuery(GET_VARIANTS_STOCK, {
        skip: query.step?.at(0) !== 'items' || !basketItems.products.length,
        fetchPolicy: 'no-cache',
        variables: {
            ids: basketItems.products.map((item) => item.variant.variant_id).filter(Boolean),
        },
        context: {
            headers: {
                'accept-language': 'fa-IR',
            },
        },
    });
    const [paymentError, setPaymentError] = React.useState({});
    const [paymentLoading, setPaymentLoading] = React.useState(false);
    const [outOfStockItems, setOutOfStockItems] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            if (query.step?.at(0) === 'shipping') {
                await shippingMethod.fetchShippingMethod();
            }
        })();
    }, [query.step]);
    const payOrder = async () => {
        const { data } = basket;
        setPaymentError({});
        setPaymentLoading(true);
        await createOrder({
            variables: {
                content: {
                    address: data.address,
                    canceled_url: `${window.origin}/cart/payment/redirect`,
                    items: data.items.map((item) => ({
                        unit_amount: item.amount,
                        variant: item.variant_id,
                    })),
                    ...(data.packing && { pocket: data.packing }),
                    receiver_last_name: data.receiverInfo.lastName,
                    receiver_name: data.receiverInfo.firstName,
                    receiver_number: data.receiverInfo.phoneNumber,
                    redirect_url: `${window.origin}/cart/payment/redirect`,
                    shipping: data.shipping,
                    gateway_type: +data.transaction,
                    use_loyalty: data.useLoyalty,
                    voucher: data.discount,
                    ...(data.description.length && { customer_description: data.description }),
                },
            },
            context: {
                headers: {
                    'accept-language': 'fa-IR',
                },
            },
            onError(e) {
                setPaymentError(apolloError(e));
                setPaymentLoading(false);
            },
            onCompleted(data) {
                basket.handleClearBasket();
                if (data.customer.createOrder.registration_type == 3) {
                    push({
                        pathname: '/cart/payment/success',
                        query: {
                            order: data.customer.createOrder.id,
                        },
                    });
                }
                else if (data.customer.createOrder.gateway_link) {
                    window.location.replace(data.customer.createOrder.gateway_link);
                }
                else {
                    push({
                        pathname: '/profile/orders/[orderId]',
                        query: {
                            orderId: data.customer.createOrder.id,
                        },
                    });
                }
            },
        });
    };
    const handleChangStep = (step) => {
        const _nextStep = step;
        const currentStep = query.step?.at(0) || 'items';
        if (currentStep != step) {
            const q = { ...query };
            q.step = _nextStep;
            push({
                pathname,
                query: q,
            });
        }
    };
    const handleNextStep = async () => {
        const currentStep = query.step?.at(0) || 'items';
        let _nextStep = 'items';
        switch (currentStep) {
            case 'items':
                if (!basket.data.items.length)
                    return;
                _nextStep = 'address';
                break;
            case 'address':
                if (basket.data.address === '0')
                    return;
                _nextStep = 'shipping';
                break;
            case 'shipping':
                if (basket.data.shipping === '0')
                    return;
                _nextStep = 'payment';
                break;
            case 'payment':
                _nextStep = 'pay-order';
                break;
            default:
                _nextStep = 'items';
        }
        if (_nextStep === 'pay-order') {
            if (paymentLoading)
                return;
            await payOrder();
            return;
        }
        const q = { ...query };
        if (_nextStep === 'items')
            delete q.step;
        else
            q.step = _nextStep;
        await push({
            pathname,
            query: q,
        });
    };
    const products = React.useMemo(() => {
        if (data?.customer?.getVariantsStock && data?.customer?.getVariantsStock?.length) {
            const stocks = [...data.customer.getVariantsStock];
            const withStock = [];
            basketItems.products.forEach((item) => {
                const findedStock = stocks.find((stockItem) => stockItem?.id == item.variant.variant_id);
                if (findedStock) {
                    if (findedStock?.orderable_count === 0) {
                        if (!outOfStockItems.some((outItem) => outItem.variant.variant_id == findedStock.id)) {
                            const cloneItem = { ...item };
                            delete cloneItem.handleDecrementAmount;
                            delete cloneItem.handleIncrementAmount;
                            delete cloneItem.handleRemove;
                            setOutOfStockItems((prevItems) => [...prevItems, cloneItem]);
                        }
                        item.handleRemove();
                    }
                    else
                        withStock.push(item);
                }
                else
                    withStock.push(item);
            });
            return withStock;
        }
        else
            return basketItems.products;
    }, [basketItems]);
    return {
        factor,
        paymentLoading,
        paymentError,
        description,
        steps: {
            items: {
                ...basketItems,
                products,
                outOfStockItems,
            },
            addresses: basketAddress,
            shipping: {
                shippingMethod,
                packing,
            },
            payment: {
                transaction: transactionType,
                discount: discountCode,
                loyaltyCredit,
                loyaltyGift,
            },
        },
        activeStep: query.step?.at(0) || 'items',
        handleNextStep,
        handleChangStep,
    };
};

const useLoyaltyLogs = () => {
    const limit = 10;
    const { data, error, loading, fetchMore } = client.useQuery(GET_LOYALTY_LOGS);
    const [stateData, setStateData] = React.useState(undefined);
    const [offset, setOffset] = React.useState(0);
    React.useEffect(() => {
        if (data)
            setStateData(data);
    }, [data]);
    const handleLoadMore = async () => {
        if (loading)
            return;
        await fetchMore({
            variables: {
                params: {
                    offset: offset + limit,
                    limit,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getLoyaltyLogs: {
                            ...previousResult.customer.getLoyaltyLogs,
                            count: fetchMoreResult.customer.getLoyaltyLogs.count,
                            next: fetchMoreResult.customer.getLoyaltyLogs.next,
                            results: [
                                ...previousResult.customer.getLoyaltyLogs.results,
                                ...fetchMoreResult.customer.getLoyaltyLogs.results,
                            ],
                        },
                    },
                };
            },
        });
    };
    const logs = React.useMemo(() => {
        if (stateData) {
            const idToDisplayName = {
                1: 'A',
                2: 'B',
                3: 'C',
                4: 'D',
            };
            return stateData.customer.getLoyaltyLogs.results.map((item) => {
                return {
                    id: item.id,
                    strategy: idToDisplayName[item?.data?.game] ?? '',
                    reason: item.reason,
                    date: new Intl.DateTimeFormat('fa-IR').format(new Date(item.created_at)),
                    time: new Intl.DateTimeFormat('fa-IR', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(item.created_at)),
                    account_credit: item.account_credit,
                    amount: item.amount,
                };
            });
        }
        return [];
    }, [stateData]);
    return {
        loading,
        error: apolloError(error),
        data: { logs },
        handleLoadMore,
        hasMore: !!stateData?.customer.getLoyaltyLogs.next,
        count: stateData?.customer.getLoyaltyLogs.count ?? 0,
    };
};

const useCustomization = (modelName) => {
    const didMountRef = React.useRef(false);
    const { customization: { data: customization, handlePublishCustomization, handleRemoveAllChanges, publishLoading, publishError, }, } = useStore();
    const initialData = React.useMemo(() => customization[modelName], []);
    const [tempState, setTempState] = React.useState(initialData);
    React.useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
        }
        return () => {
            didMountRef.current = false;
        };
    }, []);
    React.useEffect(() => {
        if (didMountRef.current) {
            setTempState(customization[modelName]);
        }
    }, [customization[modelName]]);
    return React.useMemo(() => {
        return {
            data: { [modelName]: tempState },
            handlePublishCustomization,
            handleRemoveAllChanges,
            publishLoading,
            publishError,
        };
    }, [tempState, publishLoading, publishError]);
};

const DynamicComponentsContainer = (props) => {
    if (props.schema.type !== 'component[]')
        throw new Error('The schema type must be component[]');
    if (!props.schema)
        throw new Error('Schema prop is required!');
    return props.schema.value.map(({ key }, i) => {
        const C = props.schema.options.find((i) => i.key === key)?.value;
        if (!C)
            throw new Error(`Component with "${key}" key is not define.`);
        const Component = React__default["default"].memo(C);
        return jsxRuntime.jsx(Component, {}, i);
    });
};

const initData = {
    item: {
        uploadImage: {
            image: '',
            id: '',
            uuid: '',
        },
    },
};
const useImageUpload = () => {
    const [uploadImage, { loading, error }] = client.useMutation(UPLOAD_IMAGE);
    const [uploadError, setUploadError] = React.useState({});
    const [uploadData, setUploadData] = React.useState(initData);
    const handleUploadImage = async (image) => {
        setUploadError({});
        await uploadImage({
            variables: { file: image },
            onError(e) {
                setUploadError(e);
            },
            onCompleted: (data) => {
                if (data?.item?.uploadImage) {
                    setUploadData(data);
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

const useBlogArticles = ({ offset = 0, limit = 10 } = {}) => {
    const { query, pathname, replace } = Router.useRouter();
    const [_search, setSearch] = React.useState('');
    const [_offset, setOffset] = React.useState(offset);
    const _limit = limit;
    const { data, loading, error, fetchMore, networkStatus } = client.useQuery(GET_BLOG_ARTICLES, {
        notifyOnNetworkStatusChange: true,
        variables: {
            params: {
                offset: query.page ? (+query.page - 1) * _limit : offset,
                limit: _limit,
                search: query.search ? decodeURIComponent(query.search) : undefined,
            },
        },
    });
    useDidUpdateEffect(() => {
        const timeout = setTimeout(async () => {
            if (_search) {
                await replace({
                    pathname,
                    query: {
                        ...query,
                        page: 1,
                        search: encodeURIComponent(_search),
                    },
                }, undefined, { shallow: true });
            }
            else {
                delete query.search;
                await replace({
                    pathname,
                    query: {
                        ...query,
                        page: 1,
                    },
                }, undefined, { shallow: true });
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [_search]);
    const pagination = usePagination(data?.customer?.getBlogArticles, undefined, _limit);
    const handleLoadMore = async () => {
        if (error || loading)
            return;
        await fetchMore({
            variables: {
                params: {
                    offset: _offset + _limit,
                    limit: _limit,
                    search: query.search ? decodeURIComponent(query.search) : undefined,
                },
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                setOffset((prev) => prev + _limit);
                return {
                    ...previousResult,
                    customer: {
                        ...previousResult.customer,
                        getBlogArticles: {
                            ...previousResult.customer.getBlogArticles,
                            count: fetchMoreResult.customer.getBlogArticles.count,
                            next: fetchMoreResult.customer.getBlogArticles.next,
                            results: [
                                ...previousResult.customer.getBlogArticles.results,
                                ...fetchMoreResult.customer.getBlogArticles.results,
                            ],
                        },
                    },
                };
            },
        });
    };
    const articles = React.useMemo(() => {
        if (!data?.customer?.getBlogArticles)
            return [];
        return data.customer.getBlogArticles.results.map((article) => ({
            ...article,
            published_at: article.published_at ? moment__default["default"](article.published_at).format('jYYYY/jMM/jDD HH:mm:ss') : '',
            link: {
                href: {
                    pathname: '/blog/[...article]',
                    query: {
                        article: [article.id, article.slug],
                    },
                },
            },
        }));
    }, [data]);
    const search = React.useMemo(() => {
        return {
            value: _search,
            handleChange: (value) => setSearch(value),
            handleClear: () => setSearch(''),
        };
    }, [_search]);
    return {
        data: articles,
        search,
        loading: loading || networkStatus === client.NetworkStatus.fetchMore,
        error: apolloError(error),
        handleLoadMore,
        hasMore: !!data?.customer.getBlogArticles.next,
        count: data?.customer.getBlogArticles.count ?? 0,
        pagination,
        next: data?.customer.getBlogArticles.next,
    };
};

const useBlogHighlights = ({ offset = 0, limit = 10 } = {}) => {
    const { data, loading, error } = client.useQuery(GET_BLOG_HIGHLIGHTS, {
        variables: {
            params: {
                offset,
                limit,
            },
        },
    });
    const highlights = React.useMemo(() => {
        if (!data?.customer?.getBlogHighlights)
            return [];
        return data.customer.getBlogHighlights.results.map((item) => ({
            ...item,
            article: {
                ...item.article,
                link: {
                    href: {
                        pathname: '/blog/[...article]',
                        query: {
                            article: [item.article.id, item.article.slug],
                        },
                    },
                },
            },
        }));
    }, [data]);
    return {
        data: highlights,
        loading,
        error: apolloError(error),
    };
};

const useBlogArticle = () => {
    const { query, pathname, push } = Router.useRouter();
    const [likeError, setLikeError] = React.useState({});
    const { data, loading, error } = client.useQuery(GET_BLOG_ARTICLE, {
        variables: {
            id: query.article?.length ? query.article[0] : '0',
        },
        skip: !query.article || !query.article?.length,
    });
    const [likeArticle, { loading: likeLoading }] = client.useMutation(LIKE_BLOG_ARTICLE);
    const handleLikeArticle = async (onCompleted) => {
        if (isUserLoggedIn()) {
            await likeArticle({
                variables: { id: query.article?.length ? query.article[0] : '0' },
                onCompleted() {
                    onCompleted?.();
                },
                onError(e) {
                    setLikeError(apolloError(e));
                },
            });
        }
        else {
            await push({
                pathname: '/auth/login',
                query: {
                    ...query,
                    _back_to: pathname,
                },
            });
        }
    };
    const article = React.useMemo(() => {
        if (!data?.customer?.getBlogArticle)
            return undefined;
        return {
            ...data.customer.getBlogArticle,
            published_at: data.customer.getBlogArticle?.published_at
                ? moment__default["default"](data.customer.getBlogArticle.published_at).format('jYYYY/jMM/jDD HH:mm:ss')
                : '',
        };
    }, [data]);
    return {
        data: article,
        like: {
            loading: likeLoading,
            handleClick: async (onCompleted) => await handleLikeArticle(onCompleted),
            error: apolloError(likeError),
        },
        error: apolloError(error),
        loading,
    };
};

const siteMap = async (storeId, themeConfig) => {
    const apolloClient = initializeApollo(storeId, null, themeConfig.apollo);
    const { data: { customer }, } = await apolloClient.query({
        query: GET_SITE_MAP,
    });
    return customer?.getSitemap;
};

exports.ADD_FAVORITES = ADD_FAVORITES;
exports.CANCEL_ORDER = CANCEL_ORDER;
exports.CHANGE_PASSWORD_WITHOUT_OTP = CHANGE_PASSWORD_WITHOUT_OTP;
exports.CLEAR_COOKIE = CLEAR_COOKIE;
exports.CREATE_ADDRESS = CREATE_ADDRESS;
exports.CREATE_ORDER = CREATE_ORDER;
exports.CREATE_PROFILE = CREATE_PROFILE;
exports.CREATE_STORE_OPENING_STORE_NOTIFIER = CREATE_STORE_OPENING_STORE_NOTIFIER;
exports.CREATE_THEME_CUSTOMIZATION = CREATE_THEME_CUSTOMIZATION;
exports.DELETE_ADDRESS = DELETE_ADDRESS;
exports.DynamicComponentsContainer = DynamicComponentsContainer;
exports.FORGET_PASSWORD = FORGET_PASSWORD;
exports.GET_ADDRESSES = GET_ADDRESSES;
exports.GET_APPEARANCE = GET_APPEARANCE;
exports.GET_APPROXIMATE_SENDING_DATE = GET_APPROXIMATE_SENDING_DATE;
exports.GET_BASKET = GET_BASKET;
exports.GET_BLOG_ARTICLE = GET_BLOG_ARTICLE;
exports.GET_BLOG_ARTICLES = GET_BLOG_ARTICLES;
exports.GET_BLOG_HIGHLIGHTS = GET_BLOG_HIGHLIGHTS;
exports.GET_BREADCRUMB = GET_BREADCRUMB;
exports.GET_CATEGORIES = GET_CATEGORIES;
exports.GET_CHANGE_AUTH_PASSWORD = GET_CHANGE_AUTH_PASSWORD;
exports.GET_COOKIE = GET_COOKIE;
exports.GET_FAVORITES = GET_FAVORITES;
exports.GET_GATEWAY = GET_GATEWAY;
exports.GET_LOYALTY_CREDIT = GET_LOYALTY_CREDIT;
exports.GET_LOYALTY_LOGS = GET_LOYALTY_LOGS;
exports.GET_NOTIFICATION_SETTING = GET_NOTIFICATION_SETTING;
exports.GET_ORDER = GET_ORDER;
exports.GET_ORDERS = GET_ORDERS;
exports.GET_ORDERS_STATUS_COUNT = GET_ORDERS_STATUS_COUNT;
exports.GET_POCKET = GET_POCKET;
exports.GET_PRODUCT = GET_PRODUCT;
exports.GET_PRODUCTS = GET_PRODUCTS;
exports.GET_PRODUCTS_FEEDBACK = GET_PRODUCTS_FEEDBACK;
exports.GET_PRODUCT_FILTER_PARAMS = GET_PRODUCT_FILTER_PARAMS;
exports.GET_PROFILE = GET_PROFILE;
exports.GET_REFRESH_TOKEN = GET_REFRESH_TOKEN;
exports.GET_RETURNED_ORDER = GET_RETURNED_ORDER;
exports.GET_SHIPPING_ADDRESS = GET_SHIPPING_ADDRESS;
exports.GET_SHIPPING_ADDRESS_SOCKET = GET_SHIPPING_ADDRESS_SOCKET;
exports.GET_SITE_MAP = GET_SITE_MAP;
exports.GET_STORE_INFO = GET_STORE_INFO;
exports.GET_SUGGESTION_PRODUCTS = GET_SUGGESTION_PRODUCTS;
exports.GET_THEME_CUSTOMIZATION = GET_THEME_CUSTOMIZATION;
exports.GET_TOKEN = GET_TOKEN;
exports.GET_TRANSACTION_TYPES = GET_TRANSACTION_TYPES;
exports.GET_USER_TYPE = GET_USER_TYPE;
exports.GET_VARIANTS_STOCK = GET_VARIANTS_STOCK;
exports.GET_WEBSOCKET_NOTIF = GET_WEBSOCKET_NOTIF;
exports.IS_FAVORITE = IS_FAVORITE;
exports.LIKE_BLOG_ARTICLE = LIKE_BLOG_ARTICLE;
exports.OTP_SEND = OTP_SEND;
exports.OTP_SEND_SIGNUP = OTP_SEND_SIGNUP;
exports.OTP_SEND_V2 = OTP_SEND_V2;
exports.PAYMENT_CARD = PAYMENT_CARD;
exports.REMOVE_FAVORITES = REMOVE_FAVORITES;
exports.RETURN_ORDER = RETURN_ORDER;
exports.UPDATE_ADDRESS = UPDATE_ADDRESS;
exports.UPDATE_BASKET = UPDATE_BASKET;
exports.UPDATE_NOTIFICATION_SETTINGS = UPDATE_NOTIFICATION_SETTINGS;
exports.UPDATE_PROFILE = UPDATE_PROFILE;
exports.UPDATE_RECIEVE_STATUS = UPDATE_RECIEVE_STATUS;
exports.UPDATE_THEME_CUSTOMIZATION = UPDATE_THEME_CUSTOMIZATION;
exports.UPLOAD_IMAGE = UPLOAD_IMAGE;
exports.VOUCHER_CHECK = VOUCHER_CHECK;
exports.clearNextCookie = clearNextCookie;
exports.handleRefreshToken = handleRefreshToken;
exports.initializeApp = initializeApp;
exports.isUserLoggedIn = isUserLoggedIn;
exports.setNextCookie = setNextCookie;
exports.siteMap = siteMap;
exports.ssrQueries = ssrQueries;
exports.staticLinks = staticLinks;
exports.updateProfileMutatuin = updateProfileMutatuin;
exports.useAddress = useAddress;
exports.useAuth = useAuth;
exports.useBasket = useBasket;
exports.useBlogArticle = useBlogArticle;
exports.useBlogArticles = useBlogArticles;
exports.useBlogHighlights = useBlogHighlights;
exports.useBreadcrumb = useBreadcrumb;
exports.useCategories = useCategories;
exports.useCustomization = useCustomization;
exports.useFavorites = useFavorites;
exports.useImageUpload = useImageUpload;
exports.useLoyaltyLogs = useLoyaltyLogs;
exports.useNotificationSettings = useNotificationSettings;
exports.useOrderDetail = useOrderDetail;
exports.useOrders = useOrders;
exports.useProduct = useProduct;
exports.useProductFeedback = useProductFeedback;
exports.useProducts = useProducts;
exports.useRefundOrder = useRefundOrder;
exports.useReturnedOrderDetail = useReturnedOrderDetail;
exports.useReturnedOrderInvoice = useReturnedOrderInvoice;
exports.useReturnedOrderItems = useReturnedOrderItems;
exports.useReturnedOrderStatus = useReturnedOrderStatus;
exports.useSelectableItems = useSelectableOrder;
exports.useSokect = useSokect;
exports.useStore = useStore;
exports.useStoreInfo = useStoreInfo;
exports.useSuggestionProducts = useSuggestionProducts;
exports.useTheme = useTheme;
exports.useUser = useUser;
exports.withApollo = withApollo;
//# sourceMappingURL=index.js.map
