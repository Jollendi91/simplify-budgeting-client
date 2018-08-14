import {
    fetchProtectedUser,
    FETCH_PROTECTED_USER_SUCCESS,
    fetchProtectedUserSuccess
} from './protected-data';
import {API_BASE_URL} from '../config';

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
        const getState = jest.fn(() => ({
            auth: {
                authToken: 1234
            }
        }));
        return fetchProtectedUser()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/dashboard`, {method: 'GET', headers: {Authorization: `Bearer ${getState().auth.authToken}`}});
            expect(dispatch).toHaveBeenCalledWith(fetchProtectedUserSuccess(user));
        });
    });
});