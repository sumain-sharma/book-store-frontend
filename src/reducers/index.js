import {combineReducers} from 'redux';
import {bookReducer} from './bookReducer';
import { customerReducer } from './customerReducer';
import { orderReducer } from './orderReducer'
import  UserDetails   from './userReducer';

export default combineReducers({
    book_detail: bookReducer,
    all_customer:customerReducer,
    all_order:orderReducer   ,
    users: UserDetails ,
})