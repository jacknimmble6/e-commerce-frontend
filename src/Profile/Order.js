import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { url } from '../baseUrl'

const Order = () => {
  const { id } = useParams()
  const [order, setOrder] = useState({})

  useEffect(() => {
    axios.get(`${url}/orders/${id}`)
    .then(res => setOrder(res.data))
    
    return () => {
      setOrder({})
    }
  }, [id])

  return (
    <>
      <div className="mt-40 ml-16 container mx-auto w-[1300px] h-fit border-2 
      border-black font-['Sora']">
        <p className='text-[35px] underline'>Full Name</p>
        <p className='text-[35px]'>{`${order.firstName} ${order.lastName}`}</p>
        <p className='text-[35px] ml-[850px] top-0 underline -mt-[105px]'>Shipping Address</p>
        <p className='text-[25px] ml-[500px] text-right'>
          {`${order.address}, ${order.city}, ${order.region}, ${order.zipCode}`}
        </p>
        <p className='text-[35px] underline mt-8'>Card Number</p>
        <p className='text-[25px]'>************{order.cardNumber}</p>
        <p className='text-[35px] underline ml-[1000px] -mt-24'>Card</p>
        <p className='text-[30px] first-letter:uppercase ml-[910px]'>{order.cardType}: {order.cardType2}</p>
        <p className='text-[35px] underline text-center'>
          Items({order.products === undefined ? 0 : order.products.length})
        </p>
        {order.products === undefined ? '' : order.products.map(p => (
          <div className='w-[1000px] m-auto border-2 mt-16 border-black h-fit'>
            <p className='text-[35px] text-center underline'>Title</p>
            <p className='text-[35px] text-center'>{p.name}</p>
            <img className='h-[150px] mt-8 object-cover w-[250px] m-auto' alt={p.name} src={p.images[0]}/>
            <p className='text-[35px] mt-8 text-center underline'>Price</p>
            <p className='text-[35px] text-center'>${p.price}</p>
            <p className='text-[35px] mt-8 text-center underline'>Quantity</p>
            <p className='text-[35px] text-center'>{p.amount}</p>
            <p className='text-[35px] mt-8 text-center underline'>Total</p>
            <p className='text-[35px] text-center'>
            {Intl.NumberFormat('en-IN', { 
              style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
            }).format(p.price * p.amount)}</p>
          </div>
        ))}
        <div>
          <p className='text-[35px] text-center'>
            Subtotal: 
            {Intl.NumberFormat('en-IN', { 
              style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
            }).format(order.total)}</p>
          <p className='text-[35px] mt-8 -ml-24 text-center'>Shipping: ${order.shipping}</p>
          <p className='text-[35px] mt-4 -ml-16 text-center overline'>
            Total:{Intl.NumberFormat('en-IN', { 
              style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
            }).format(order.total + order.shipping)}
          </p>
        </div>
      </div>
    </>
  )
}

export default Order