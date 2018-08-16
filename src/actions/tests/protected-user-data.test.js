import {
    fetchProtectedUser,
    FETCH_PROTECTED_USER_SUCCESS,
    fetchProtectedUserSuccess,
    FETCH_PROTECTED_USER_ERROR,
    fetchProtectedUserError
} from '../protected-data';
import {registerUser} from '../users';
import {API_BASE_URL} from '../../config';

describe('registerUser', () => {
    it('Should fetch a registered user', () => {
        const user = {
            firstName: 'John',
            username: 'fakeUser',
        };

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json() {
                return
            }
        }));

        const dispatch = jest.fn();

        return registerUser(user)(dispatch).then(()=> {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        });
    });
});

describe('fetchProtectedUserSuccess', () => {
    it('Should return the action', () => {
        const user = {
            user: {}
        };
        const action = fetchProtectedUserSuccess(user);
        expect(action.type).toEqual(FETCH_PROTECTED_USER_SUCCESS);
        expect(action.user).toEqual(user);
    });
});

describe('fetchProtectedUserError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = fetchProtectedUserError(error);
        expect(action.type).toEqual(FETCH_PROTECTED_USER_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('fetchProtectedUser', () => {
    it('Should dispatch fetchProtectedUserSuccess', () => {
        const user = {
            user: {}
        };

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                json() {
                    return user;
                }
            })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));
        
        return fetchProtectedUser()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/dashboard`, {method: 'GET', headers: {Authorization: `Bearer ${getState().auth.authToken}`}});
            expect(dispatch).toHaveBeenCalledWith(fetchProtectedUserSuccess(user));
        });
    });

    it('Should dispatch fetchProtectedUserError', () => {
        const error = 'error';

        global.fetch = jest.fn().mockImplementation(() => Promise.reject(error)
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return fetchProtectedUser()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/dashboard`, {method: 'GET', headers: {Authorization: `Bearer ${getState().auth.authToken}`}});
            expect(dispatch).toHaveBeenCalledWith(fetchProtectedUserError(error));
        });
    });
});