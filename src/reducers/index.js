import {combineReducers} from 'redux';
import {simplifyReducer} from './protected-data';
import {reducer as formReducer} from 'redux-form';
import {authReducer} from './auth';

export default combineReducers({
    simplify: simplifyReducer,
    form: formReducer,
    auth: authReducer
});