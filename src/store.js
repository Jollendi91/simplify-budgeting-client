import {createStore} from 'redux';

import rootReducer from './reducers';
import {createBrowserHistory} from 'history';
import {connectRouter} from 'connected-react-router';

export const history = createBrowserHistory();


export default createStore(connectRouter(history)(rootReducer));

