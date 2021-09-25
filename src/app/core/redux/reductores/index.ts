import cart from './cart/cartReducer';
import { combineReducers } from 'redux';
import main from './main/mainReducer';
import order from './order/orderReducer';
import products from './products/productsReducer';
import ranking from './ranking/rankingReducer';

export default combineReducers({ main, products, ranking, cart, order });
