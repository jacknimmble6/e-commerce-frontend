import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { url } from '../baseUrl'
import { useNavigate, Link } from 'react-router-dom'

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [orders, setOrders] = useState([])
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const id = useSelector(state => state.user.id)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${url}/findUser/${id}`)
    .then(res => {
      setUsername(res.data.username)
      setFirstName(res.data.firstName)
      setEmail(res.data.email)
      setLastName(res.data.lastName)
    })

    axios.get(`${url}/user/orders/${id}`)
    .then(res => setOrders(res.data))

    return () => {
      setOrders([])
      setUsername('')
      setFirstName('')
      setEmail('')
      setLastName('')
    }
  }, [id])

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const changeLastName = (e) => {
    setLastName(e.target.value)
  }

  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { firstName, lastName, username, email }
    axios.patch(`${url}/update/${id}`, data)
    .then(res => dispatch({ type: 'setUser', payload: {
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      username: res.data.username,
      email: res.data.username,
      id: res.data._id
    }}))
  }

  const deleteUser = (e) => {
    e.preventDefault()
    axios.delete(`${url}/user/${id}`)
    dispatch({ type: 'clear' })
    navigate('/')
  }

  return (
    <>
      <div className="font-['Sora']">
        <p className='absolute top-[127px] left-[550px] text-[45px]'>
          Profile Page
        </p>
        <p className='absolute top-[207px] left-[150px] text-[35px]'>
          Profile Info
        </p>

        <form>
          <label>
            <p className="mt-72 ml-16 text-[25px]">First Name</p>
            <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
            border-l-transparent border-b-black text-[25px] w-[370px] h-[45px] focus:outline-none'
            value={firstName} onChange={changeFirstName}/>
          </label>

          <label>
            <p className="mt-8 ml-16 text-[25px]">Last Name</p>
            <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
            border-l-transparent border-b-black text-[25px] w-[370px] h-[45px] focus:outline-none'
            value={lastName} onChange={changeLastName}/>
          </label>

          <label>
            <p className="mt-8 ml-16 text-[25px]">Email</p>
            <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
            border-l-transparent border-b-black text-[25px] w-[370px] h-[45px] focus:outline-none'
            value={email} onChange={changeEmail} />
          </label>

          <label>
            <p className="mt-8 ml-16 text-[25px]">Username</p>
            <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
            border-l-transparent border-b-black text-[25px] w-[370px] h-[45px] focus:outline-none'
            value={username} onChange={changeUsername}/>
          </label>

          <button className='absolute mt-24 -ml-96 border-2 text-[20px] border-black 
          h-[40px] w-[150px]' onClick={handleSubmit}>
            Update Info
          </button>

          <button className='absolute mt-24 -ml-32 border-2 text-[20px] border-black 
          h-[40px] w-[150px]' onClick={deleteUser}>
            Delete User
          </button>
        </form>
      </div>

      <div className="font-['Sora'] ml-40 2xl:ml-96">
        <p className='absolute top-[207px] left-[1045px] 2xl:left-[1270px] text-[35px]'>
          Orders
        </p>

        <div className='-mt-4'>
          {orders.slice(0,1).map((order, index) => (
            <div className='w-[500px] border-2 border-black h-[430px] ml-[700px] 
            -mt-[410px]' key={index}>
              <p className='text-[25px] underline'>Order #{index + 1}</p>
              <Link to={`/order/${order._id}`}>
                <p className='text-[20px] ml-[350px] -mt-[36px]'>See Full Order</p>
              </Link>
              <p className='text-[30px] text-center underline ml-[0px]'>Full Name</p>
              <p className='text-[30px] text-center'>
                {`${order.firstName}  ${order.lastName}`}
              </p>

              <p className='text-[30px] ml-[0px] text-center mt-2 underline'>
                Shipping Address
              </p>
            
              <p className='text-center'>
                {`${order.address}, ${order.region} ${order.country}, ${order.zipCode}`}
              </p>

              <p className='text-[30px] mt-2 text-center underline'>
                Items ({order.products.length})
              </p>

              <p className='text-center'>
                {order.products.map(item => (
                  <p className='text-center'>{item.name} ({item.amount})</p>
                ))}
              </p>

              <p className='text-[30px] underline text-center mt-2'>Total</p>
              <p className='text-[30px] text-center'>${order.total}</p>
            </div>
          ))}
        </div>

        <Link to='/orders'>
          <button className='bottom-0 text-[20px] border-2 border-black w-[170px] h-[40px] 
          ml-[870px] mt-8'>
            See All Orders
          </button>
        </Link>
      </div>
    </>
  )
}

export default Profile