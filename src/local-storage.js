import store from 'store';

export const loadAuthToken = () => {
    return store.get('authToken');
};

export const saveAuthToken = authToken => {
    try {
        store.set('authToken', authToken);
    } catch(e) {}
};

export const clearAuthToken = () => {
    try {
        store.remove('authToken');
    } catch (e) {}
};