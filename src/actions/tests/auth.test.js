import * as actions from '../auth';
import {API_BASE_URL} from '../../config';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

describe('setAuthToken', () => {
    it('Should return the action', () => {
        const authToken = 'fakeAuthToken1234';
        const action = actions.setAuthToken(authToken);
        expect(action.type).toEqual(actions.SET_AUTH_TOKEN);
        expect(action.authToken).toEqual(authToken);
    });
});

describe('clearAuth', () => {
    it('Should return the action', () => {
        const action = actions.clearAuth();
        expect(action.type).toEqual(actions.CLEAR_AUTH);
    });
});

describe('authRequest', () => {
    it('Should return the action', () => {
        const action = actions.authRequest();
        expect(action.type).toEqual(actions.AUTH_REQUEST);
    });
});

describe('authSuccess', () => {
    it('Should return the action', () => {
        const currentUser = {
            username: 'JohnDoe'
        };
        const action = actions.authSuccess(currentUser);
        expect(action.type).toEqual(actions.AUTH_SUCCESS);
        expect(action.currentUser).toEqual(currentUser);
    });
});

describe('authError', () => {
    it('Should return the action', () => {
        const error = "error";
        const action = actions.authError(error);
        expect(action.type).toEqual(actions.AUTH_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('login', () => {
    it('Should dispatch authRequest, setAuthToken, and authSuccess', () => {
        const user = {
            username: 'fakeUser123',
            password: 'fakePassword'
        }
        const authToken = jwt.sign({
            user
        }, 'secret', {
            expiresIn: '6000ms'
        });
        const decodedToken = jwtDecode(authToken);

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json() {
                return {
                    authToken
                }
            }
        }));

        const dispatch = jest.fn();

        return actions.login(user.username, user.password)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.authRequest());
            expect(dispatch).toHaveBeenCalledWith(actions.setAuthToken(authToken));
            expect(dispatch).toHaveBeenCalledWith(actions.authSuccess(decodedToken.user));
        });
    });
});

describe('refreshAuthToken', () => {
    it('Should dispatch authRequest', () => {
        const user = {
            username: 'fakeUser'
        };
        const currentAuthToken = jwt.sign({
            user
        }, 'secret', {
            expiresIn: '6000ms'
        });

        const authToken = jwt.sign({
            user
        }, 'secret', {
            expiresIn: '6000ms'
        });
        const newDecodedToken = jwtDecode(authToken);

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return {
                        authToken
                    }
                }
            })
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: currentAuthToken
            }
        }));

        return actions.refreshAuthToken()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${currentAuthToken}`
                }
            });
            expect(dispatch).toHaveBeenCalledWith(actions.authRequest());
            expect(dispatch).toHaveBeenCalledWith(actions.setAuthToken(authToken));
            expect(dispatch).toHaveBeenCalledWith(actions.authSuccess(newDecodedToken.user));
        });
    });
});