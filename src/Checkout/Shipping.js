import React, { useState } from 'react'
import CheckoutNav from './CheckoutNav'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from "reactstrap";
import axios from 'axios'
import { url } from '../baseUrl'
import { useNavigate } from 'react-router-dom'
import Stripe from './Stripe'

const Shipping = () => {
  const [finishOrder, setFinishOrder] = useState('')
  const cart = useSelector(state => state.cart)
  const firstName = useSelector(state => state.order.firstName)
  const lastName = useSelector(state => state.order.lastName)
  const address = useSelector(state => state.order.address)
  const zipCode = useSelector(state => state.order.zipCode)
  const phone = useSelector(state => state.order.phone)
  const apartment = useSelector(state => state.order.apartment)
  const country = useSelector(state => state.order.country)
  const region = useSelector(state => state.order.region)
  const city = useSelector(state => state.order.city)
  const userId = useSelector(state => state.user.id)
  const cardNumber = useSelector(state => state.order.cardNumber)
  const cardType = useSelector(state => state.order.cardType)
  const cardType2 = useSelector(state => state.order.cardType2)
  const shipping = useSelector(state => state.order.shipping)
  const total = cart.reduce((prev, current) => { return prev + current.price * current.amount }, 0)  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const pay = () => {
    const data = {
      firstName, lastName, city, address, zipCode, country, region, phone, shipping,
      userId, apartment, products: cart, cardNumber, cardType, cardType2, total
    }
    axios.post(`${url}/createOrder`, data)
    .then(res => console.log(res.data, 'New Data!!'))
    navigate('/')
    dispatch({ type: 'clearCart' })
    dispatch({ type: 'clearOrder' })
  }

  const delete2 = (id) => {
    dispatch({ type: 'delete1', payload: id })
  }

  const handleFinishOrder = () => {
    setFinishOrder('You can now finish your order.')
  }

  return (
    <div>
      <div className='absolute top-[90px] left-[290px]'>
        <CheckoutNav />
      </div>

      <div className="absolute border-2 border-l-2 border-black top-56 left-[60px] font-['Sora']
      h-fit w-[1310px]">
        <p className='absolute text-[36px] left-[594px] top-[0px]'>Payment</p>
        
      </div>

        <div className='ml-24 mt-72'>
          {cart.slice(0,3).map(c => (
            <div className='mt-16'>
              <img src={c.images[0]} alt='' className='h-[266px] w-[250px] object-cover'/>
              <p className='ml-[410px] text-[30px] -mt-32 w-[350px]'>{c.name} ({c.amount})</p>
              <p className='text-[35px] ml-[1000px] -mt-8'>
                {Intl.NumberFormat('en-IN', { 
                  style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
                }).format(c.amount * c.price)}</p>
              <button className='ml-16 mt-24 text-[25px] underline' onClick={() => delete2(c.id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className='relative mt-[60px] ml-[480px]'>
          <p className='text-[40px] ml-24 mt-8'>Subtotal</p>
          <p className='text-[40px] ml-[300px] -mt-[60px]'>
            {Intl.NumberFormat('en-IN', { 
              style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
            }).format(total)}
          </p>
          <Container className='-ml-72'>     
            <Stripe handleFinishOrder={handleFinishOrder}/>
            <p className='mt-8 text-green-400 text-[25px] ml-[370px]'>{finishOrder}</p>
          </Container>
        </div>

        <button className='ml-[580px] mt-16 h-[60px] text-[30px] w-[285px] border-2 
        border-black' onClick={pay}>
          Complete Order
        </button>
    </div>
  )
}

export default Shipping