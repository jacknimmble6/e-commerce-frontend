import { combineReducers } from 'redux'
import { cartReducer } from './cart'
import { login } from './login'
import { orderReducer } from './order'
import { search } from './search'
import { products } from './products'

export default combineReducers({
  cart: cartReducer,
  user: login,
  order: orderReducer,
  search: search,
  products: products,
})