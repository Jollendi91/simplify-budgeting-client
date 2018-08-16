import * as actions from '../auth';
import {API_BASE_URL} from '../../config';

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
        const username = "JohnDoe12";
        const password = "fakePassword";
        const authToken = "fakeAuthToken123";
        
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                json() {
                    return {}
                }
            })
        );

        const dispatch = jest.fn();

        return actions.login(username, password)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.authRequest());
            expect(dispatch).toHaveBeenCalledWith(actions.setAuthToken(authToken));
            expect(dispatch).toHaveBeenCalledWith(authSuccess());
        });
    });
});