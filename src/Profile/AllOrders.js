import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../baseUrl'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const id = useSelector(state => state.user.id)

  useEffect(() => {
    axios.get(`${url}/user/orders/${id}`)
    .then(res => setOrders(res.data))

    return () => {
      setOrders([])
    }
  }, [id])


  return (
    <div className="font-['Sora']">
      <p className='text-[50px] text-center mt-32'>All Orders</p>
      <div className='mt-[50px] -ml-[550px] m-auto'>
      {orders.map((order, index) => (
        <div className='w-[1160px] border-2 border-black h-fit ml-[700px] 
        mt-[100px] m-auto' key={index}>
          <p className='text-[30px] underline'>Order #{index + 1}</p>
          <Link to={`/order/${order._id}`}>
            <p className='text-[30px] text-right -mt-[36px]'>See Full Order</p>
          </Link>
          <p className='text-[35px] text-center underline ml-[0px]'>Full Name</p>
          <p className='text-[35px] text-center'>
            {`${order.firstName}  ${order.lastName}`}
          </p>

          <p className='text-[35px] ml-[0px] text-center mt-2 underline'>
            Shipping Address
          </p>
            
            <p className='text-center text-[20px]'>
              {`${order.address}, ${order.region} ${order.country}, ${order.zipCode}`}
            </p>

            <p className='text-[35px] mt-2 text-center underline'>
              Items ({order.products.length})
            </p>

              <p className='text-center'>
                {order.products.map(item => (
                  <p className='text-center text-[20px]'>{item.name} ({item.amount})</p>
                ))}
              </p>

              <p className='text-[35px] underline text-center mt-2'>Total</p>
              <p className='text-[35px] text-center'>
                {Intl.NumberFormat('en-IN', { 
                  style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
                }).format(order.total)}
              </p>
            </div>
          ))}
          </div>
    </div>
  )
}

export default AllOrders