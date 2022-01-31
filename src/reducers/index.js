// A place from where all the reducers are being managed
import { combineReducers } from "redux";
import itemsReducer from './itemReducer.js';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    item: itemsReducer,
    error: errorReducer,
    auth: authReducer
})