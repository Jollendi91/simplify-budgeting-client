import {createStore} from 'redux';
import {simplifyReducer} from './reducers';

export default createStore(simplifyReducer);