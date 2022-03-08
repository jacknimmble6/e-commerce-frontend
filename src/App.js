import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home/Home'
import Details from './Home/Details'
import Cart from './Cart/Cart'
import Checkout from './Checkout/Checkout'
import Shipping from './Checkout/Shipping'
import Profile from './Profile/Profile'
import Register from './Profile/Register'
import { useSelector, useDispatch } from 'react-redux';
import Login from './Profile/Login';
import Order from './Profile/Order'
import AllOrders from './Profile/AllOrders'
import AllProducts from './Products/AllProducts'
import Accessories from './Products/Acessories';
import Sneakers from './Products/Sneakers'
import Jackets from './Products/Jackets';
import SearchPage from './Products/SearchPage';
import { url } from './baseUrl';
import axios from 'axios'

const App = () => {
  const login = useSelector(state => state.user.username)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${url}/products`)
    .then(res => dispatch({ type: 'addProducts', payload: res.data }))

  }, [dispatch])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/detail/:id' element={<Details />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={login === '' ? <Navigate to='/register'/> : <Profile />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/orders' element={<AllOrders />} />
          <Route path='/allProducts' element={<AllProducts />} />
          <Route path='/sneakers' element={<Sneakers />} />
          <Route path='/jackets' element={<Jackets />} />
          <Route path='/accessories' element={<Accessories />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
