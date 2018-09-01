import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR
} from '../actions/auth';

import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../actions/users';

const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null
};

export const authReducer = (state = initialState, action) => {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null
        });
    } else if (action.type === REGISTER_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === REGISTER_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: null
        });
    } else if (action.type === REGISTER_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            currentUser: action.currentUser
        });
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    }
    return state;
}