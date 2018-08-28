import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerError = (error) => ({
    type: REGISTER_ERROR,
    error: error
});

export const registerUser = user => dispatch => {
    console.log(user);
    dispatch(registerRequest());
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
        dispatch(registerSuccess());
        return res.json()
    })
    .catch(err => {
        const {reason, message, location} = err;
        dispatch(registerError(message));
        if (reason === 'ValidationError') {
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
    });
};