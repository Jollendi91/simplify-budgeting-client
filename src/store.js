import {createStore} from 'redux';
import {simplifyReducer} from './reducers';
import {createBrowserHistory} from 'history';
import {connectRouter} from 'connected-react-router';

export const history = createBrowserHistory();

export default createStore(connectRouter(history)(simplifyReducer));

