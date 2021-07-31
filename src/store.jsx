
import {composeWithDevTools} from 'redux-devtools-extension';
import  rootReducer  from "./reducers"
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk'

const initalState = {
}
const middleware = [thunk]

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;