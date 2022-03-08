import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const CheckoutNav = () => {
  const [circle1, setCircle1] = useState({ circle: '#3BB6FB', text: 'white' })
  const [circle2, setCircle2] = useState({ circle: 'white', text: '#3BB6FB' })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/shipping') {
      setCircle2({ circle: '#3BB6FB', text: 'white' })
      setCircle1({ circle: 'white', text: '#3BB6FB' })
    } else if (location.pathname === '/checkout') {
      setCircle1({ circle: '#3BB6FB', text: 'white' })
      setCircle2({ circle: 'white', text: '#3BB6FB' })
    } else if (location.pathname === '/payment') {
      setCircle2({ circle: 'white', text: '#3BB6FB' })
      setCircle1({ circle: 'white', text: '#3BB6FB' })
    }
  }, [location.pathname])

  const handleCircle1 = () => {
    setCircle1({ circle: '#3BB6FB', text: 'white' })
    setCircle2({ circle: 'white', text: '#3BB6FB' })
    navigate('/checkout')
  }
  const handleCircle2 = () => {
    setCircle2({ circle: '#3BB6FB', text: 'white' })
    setCircle1({ circle: 'white', text: '#3BB6FB' })
    navigate('/shipping')
  }

  return (
    <div className='ml-32'>
      <div className='absolute left-[188px]'>
        <svg height="100" width="1000" onClick={handleCircle1}>
          <circle cx="50" cy="50" r="35" stroke="#3BB6FB" strokeWidth="3" fill={circle1.circle} />
          <text x='36' y='65' fill={circle1.text} className='text-[50px]'>1</text>
        </svg>
      </div>

      <div className='absolute top-[47px] left-[274px]'>
        <svg x='40' y='0'>
          <line x1="0" y1="0" x2="300" y2="0" stroke='#3BB6FB' strokeWidth='5' />
        </svg>
      </div>

      <div className='absolute left-[560px] top-[0px]'>
        <svg height="100" width="1000" onClick={handleCircle2}>
          <circle cx="50" cy="50" r="35" stroke="#3BB6FB" strokeWidth="3" fill={circle2.circle} />
          <text x='36' y='65' fill={circle2.text} className='text-[50px]'>2</text>
        </svg>
      </div>
    </div>
  )
}

export default CheckoutNav