import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import cartReducer from './reducers/cartReducers';
import productReducer from "./reducers/productReducers"

const rootReducer = combineReducers({
  cart: cartReducer,
  product:productReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
