import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import {createBrowserHistory} from 'history';
import {connectRouter} from 'connected-react-router';

import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

export const history = createBrowserHistory();

const store = createStore(connectRouter(history)(rootReducer), applyMiddleware(thunk));

const authToken = loadAuthToken();

if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;

