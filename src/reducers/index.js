import {combineReducers} from 'redux';
import {simplifyReducer} from './simplify-reducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    simplify: simplifyReducer,
    form: formReducer
});