import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import orderReducer from './order_reducer';


export default combineReducers({
    item: itemReducer,
    order: orderReducer
});