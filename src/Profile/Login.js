import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../baseUrl'

const Login = () => {
  const [role, setRole] = useState('User')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [adminCode, setAdminCode] = useState(0)
  const [showPassword, setShowPassword] = useState('password')
  const [error, setError] = useState('')
  const [flash, setFlash] = useState(false)
  const [flashStyle, setFlashStyle] = useState('')
  const dispatch = useDispatch()
  const role1 = useSelector(state => state.user.token)

  const changeRole = (e) => {
    setRole(e.target.value)
  }

  const showPassword1 = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changeAdminCode = (e) => {
    setAdminCode(e.target.value)
  }

  const handleSubmit = (e) => {
    const data = { username, password, adminNumber: adminCode, email, role }
    e.preventDefault()

    if ( username.length < 5 || password.length < 6 || email.length < 10) {
      setError('All fields need to be filled.')
      setFlash('')
    } else {
      setError('')
      axios.post(`${url}/loginUser`, data)
      .then(res => {dispatch({ type: 'setUser', payload: {
        username: res.data.oldUser.username,
        password: res.data.oldUser.password,
        id: res.data.oldUser._id,
        email: res.data.oldUser.email,
        firstName: res.data.oldUser.firstName,
        lastName: res.data.oldUser.lastName,
        role: res.data.oldUser.role,
        token: res.data.token
      }})
      })
      setTimeout(() => {
        if (role1 === '') {
          setFlash(`Your login credentials are invalid!!`)
          setFlashStyle('absolute left-[150px] text-[30px] top-[70px] text-red-400')
        } else {
          setFlash(`You logged in as ${username}!!`)
          setFlashStyle('absolute left-[150px] text-[30px] top-[70px] text-green-400')
        }
      }, 1000)
      setUsername('')
      setPassword('')
      setEmail('')
      setAdminCode('')
      setRole('User')
    }
  }

  return (
    <div className="font-['Sora'] absolute top-[150px] left-[370px] w-[700px] h-[870px] 
    border-2 border-black">
      <p className={flashStyle}>{flash}</p>
      <p className='absolute text-[45px] left-[300px]'>Login</p>
      <p className='absolute left-[200px] top-[70px] text-[25px] text-red-600'>{error}</p>

      <form>
        <label>
          <p className='mt-32 ml-16 text-[25px] dot'>Username</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px]
           focus:outline-none' onChange={changeUsername} value={username}/>
        </label>

        <label>
          <p className='mt-16 ml-16 text-[25px] dot'>Password</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px]
           focus:outline-none' type={showPassword} onChange={changePassword} value={password}/>
           <Icon icon="carbon:password" className='absolute -mt-8 ml-[600px]' 
          width='25' height='25' onClick={showPassword1}/>
        </label>

        <label>
          <p className='mt-16 ml-16 text-[25px] dot'>Email</p>
          <input className='border-2 border-t-transparent border-r-transparent mt-0 ml-16
          border-l-transparent border-b-black text-[25px] w-[570px] h-[45px]
           focus:outline-none' type='email' onChange={changeEmail} value={email}/>
        </label>

        <select className='w-48 ml-16 mt-16 text-2xl border-2 border-b-black focus:outline-none
        border-t-transparent border-r-transparent border-l-transparent' 
        onChange={changeRole} value={role} >
          <option>User</option>
          <option>Admin</option>
        </select>

        {role === 'Admin' ? (
          <label>
            <p className='mt-16 ml-16 text-[25px]'>Admin Code</p>
            <input type='number' className='absolute border-2 border-t-transparent 
            border-r-transparent mt-0 ml-16 border-l-transparent border-b-black 
            text-[25px] w-[570px] h-[45px] focus:outline-none' onChange={changeAdminCode} 
            value={adminCode} />
          </label>
          ) : ''
        }

        <div className='ml-56'>
          <button className='absolute mt-24 ml-[0px] bottom-0 text-[25px] border-2 
          border-black w-[150px]' onClick={handleSubmit}>
            Log In
          </button>

          <Link to='/register'>
            <button className='absolute mt-[99px] bottom-0 ml-[325px] text-[25px] '>
              Sign Up
            </button>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default Login