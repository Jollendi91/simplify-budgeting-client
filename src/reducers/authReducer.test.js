import {authReducer} from './auth';
import * as actions from '../actions/auth';

describe('authReducer', () => {
    const testAuthToken = 'fakeAuthToken123';
    const testCurrentUser = {
        username: 'fakeUser'
    };
    const testError = 'test error';

    it('Should set the initial state when nothing is passed in', () => {
        const state = authReducer(undefined, {type: '__UNKOWN'});
        expect(state).toEqual({
            authToken: null,
            currentUser: null,
            loading: false,
            error: null
        });
    });

    it('Should return the current state on an unkown action', () => {
        let currentState = {};
        const state = authReducer(currentState, {type: '__UNKOWN'});
        expect(state).toEqual(currentState);
    });

    describe('setAuthToken', () => {
        it('Should set the auth token', () => {
            let state = {
                authToken: null
            };
            state = authReducer(state, actions.setAuthToken(testAuthToken));
            expect(state).toEqual({
                authToken: testAuthToken
            });
        });
    });

    describe('clearAuth', () => {
        it('Should remove the auth token', () => {
            let state = {
                authToken: testAuthToken,
                currentUser: testCurrentUser
            };
            state = authReducer(state, actions.clearAuth());
            expect(state).toEqual({
                authToken: null,
                currentUser: null
            });
        });
    });

    describe('authRequest', () => {
        it('Should set loading to true', () => {
            let state = {
                loading: false, 
                error: testError
            };
            state = authReducer(state, actions.authRequest());
            expect(state).toEqual({
                loading: true,
                error: null
            });
        });
    });

    describe('authSuccess', () => {
        it('Should set the current user', () => {
            let state = {
                loading: true, 
                currentUser: null
            };
            state = authReducer(state, actions.authSuccess(testCurrentUser));
            expect(state).toEqual({
                loading: false,
                currentUser: testCurrentUser
            });
        });
    });

    describe('authError', () => {
        it('Should set the error', () => {
            let state = {
                loading: true,
                error: null
            };
            state = authReducer(state, actions.authError(testError));
            expect(state).toEqual({
                loading: false,
                error: testError
            });
        });
    });
});