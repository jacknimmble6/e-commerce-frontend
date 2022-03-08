import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import { url } from '../baseUrl'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState('password')
  const [error, setError] = useState('')
  const [flash, setFlash] = useState('')
  const dispatch = useDispatch()

  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const showPassword1 = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const changeLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleSubmit = (e) => {
    const data = { username, password, firstName, lastName, email, role: 'User' }
    e.preventDefault()

    if (firstName.length < 0 || lastName.length < 0 || username.length < 5 || password.length < 6
      || email.length < 10) {
      setFlash('')
      setError('All fields need to be filled.')
    } else {
      setError('')
      axios.post(`${url}/createUser`, data)
      .then(res => {dispatch({ type: 'setUser', payload: {
        username: res.data.result.username,
        password: res.data.result.password,
        id: res.data.result._id,
        email: res.data.result.email,
        firstName: res.data.result.firstName,
        lastName: res.data.result.lastName,
        role: res.data.result.role,
        token: res.data.token
      }})
      })
      setTimeout(() => {
        setFlash(`You signed up as ${username}!!`)
      }, 1000)
      setUsername('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setEmail('')
    }
  }

  return (
    <div className="absolute top-[150px] left-[390px] w-[700px] font-['Sora']
     h-[950px] border-2 border-black">
      <p className='absolute text-[45px] left-[260px]'>Sign Up</p>
      <p className='absolute left-[150px] text-[30px] top-[70px] text-green-400'>{flash}</p>
      <p className='absolute left-[200px] top-[70px] text-[25px] text-red-600'>{error}</p>

      <form onSubmit={handleSubmit}>
        <label>
          <p className="mt-32 ml-16 text-[25px] dot">First Name</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px] focus:outline-none'
          onChange={changeFirstName} value={firstName}/>
        </label>

        <label>
          <p className="mt-16 ml-16 text-[25px] dot">Last Name</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px]
           focus:outline-none' onChange={changeLastName} value={lastName}/>
        </label>

        <label>
          <p className="mt-16 ml-16 text-[25px] dot">Username</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px]
           focus:outline-none' onChange={changeUsername} value={username}/>
          {username.length < 5 ? 
            <p className='absolute ml-16 text-red-600 text-xl'>
              Username needs to be at least 5 characters
            </p> : ''}
        </label>

        <label>
          <p className="mt-16 ml-16 text-[25px] dot">Password</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px]
          focus:outline-none' type={showPassword} onChange={changePassword} value={password} />
          <Icon icon="carbon:password" className='absolute -mt-8 ml-[600px]' 
          width='25' height='25' onClick={showPassword1}/>
          {password.length < 6 ? 
            <p className='absolute ml-16 text-red-600 text-xl'>
              Password needs to be at least 6 characters
            </p> : ''}
        </label>
        
        <label>
          <p className="mt-16 ml-16 text-[25px] dot">Email</p>
          <input type='email' className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px] peer
           focus:outline-none' onChange={changeEmail} value={email} />
          <p className="mt-0 ml-16 invisible peer-invalid:visible text-red-600 text-xl">
            Please provide a valid email address.
          </p>
        </label>
        
        <button className='mt-16 ml-[260px] text-[25px] border-2 border-black w-[150px]' 
        onClick={handleSubmit}>
          Sign Up
        </button>

      </form>
      <Link to='/login'>
        <button className='absolute mt-[-35px] ml-[600px] text-[25px] '>
          Log In
        </button>
      </Link>
    </div>
  )
}

export default Register