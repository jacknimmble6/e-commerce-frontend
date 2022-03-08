import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutNav from './CheckoutNav'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

const Checkout = () => {
  const navigate = useNavigate()
  const [country, setCountry] = useState('United States')
  const [region, setRegion] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [apartment, setApartment] = useState('')
  const [zipCode, setZipCode] = useState(0)
  const dispatch = useDispatch()
  const firstName1 = useSelector(state => state.user.firstName)
  const lastName1 = useSelector(state => state.user.lastName)
  const [shipping, setShipping] = useState(5.00)

  useEffect(() => {
    setFirstName(firstName1)
    setLastName(lastName1)

    return () => {
      setFirstName('')
      setLastName('')
    }
    
  }, [firstName1, lastName1])

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const changeLastName = (e) => {
    setLastName(e.target.value)
  }

  const changeAddress = (e) => {
    setAddress(e.target.value)
  }

  const changeZipCode = (e) => {
    setZipCode(e.target.value)
  }

  const changeApartment = (e) => {
    setApartment(e.target.value)
  }

  const changePhone = (e) => {
    setPhone(e.target.value)
  }

  const changeCity = (e) => {
    setCity(e.target.value)
  }

  const selectCounty = (val) => {
    setCountry(val)
    if (val !== 'United States') {
      setShipping(15.00)
    } 
    if (val === 'United States') {
      setShipping(5.00)
    } 
  }
  
  const selectRegion = (val) => {
    setRegion(val)
  }

  const cart = useSelector(state => state.cart)

  const email = useSelector(state => state.user.email)

  const total = cart.reduce((prev, current) => {
    return prev + current.price * current.amount
  }, 0)

  const handleSubmit = () => {
    dispatch({ type: 'setOrder', payload: { 
      firstName, lastName, city, address, zipCode, country, region, 
      phone, apartment, shipping, total
    }})
    navigate('/shipping')
  }

  return (
    <>
      <div className='absolute top-[90px] left-[290px]'>
        <CheckoutNav />
      </div>
      
      <div className="grid grid-cols-2 font-['Sora']">

        <div className='absolute border-2 border-black top-48 left-[60px] h-[920px] w-[660px]'>
          <p className='absolute text-[36px] left-[94px] top-[20px]'>Contact Information</p>
          <p className='absolute text-[25px] text-center top-[80px]'>
            {firstName1} {lastName1} ({email})
          </p>
          <p className='absolute text-[36px] left-[114px] top-[180px]'>Shipping Address</p>

          <form className='absolute left-[20px] top-[250px] w-[615px]'>
            <input className='text w-[299px] h-[40px] border-2 border-black outline-black' 
            placeholder='First Name' value={firstName}  onChange={changeFirstName}/>

            <input className='text w-[299px] ml-4 h-[40px] border-2 border-black 
            outline-black placeholder:text-[16px] dot' type='text' placeholder='Last Name'
            value={lastName} onChange={changeLastName} />

            <input placeholder='Address' type='text' className='border-2 mt-8 w-full
            border-black h-[40px]' value={address} onChange={changeAddress}/>

            <input placeholder='Apartment, suite, etc.' type='text' className='border-2
            border-black mt-8 w-full h-[40px]' value={apartment} onChange={changeApartment} />

            <input placeholder='City' type='text' className='border-2 mt-8 w-full h-[40px] 
            border-black' value={city} onChange={changeCity} />

            <CountryDropdown value={country} placeholder='Country/Region' type='text' 
            className='border-2 border-black mt-8 w-[299px] h-[40px]' 
            onChange={(val) => selectCounty(val)} />

            <RegionDropdown country={country} placeholder='State' type='text' className='border-2
            border-black mt-8 w-[299px] ml-4 h-[40px]' value={region} 
            onChange={(val) => selectRegion(val)} />

            <input placeholder='Zip Code' type='number' className='border-2 border-black mt-8 w-full 
            h-[40px]' value={zipCode} onChange={changeZipCode} />

            <input placeholder='Phone' type='text' className='border-2 border-black mt-8 w-full 
            h-[40px]' value={phone} onChange={changePhone} />

            <button className='mt-24 border-2 border-black text-[16px] w-[230px] h-[45px]'
            onClick={handleSubmit}>
              Continue to Shipping
            </button>
            <Link to='/cart'>
              <button className='mt-8 text-[16px] ml-8'>
                Return to Cart
              </button>
            </Link>
          </form>
        </div>
      </div>

      <div className="absolute border-2 font-['Sora'] border-black top-48 
      left-[719px] h-[920px] w-[660px]">

        <div className='-mt-8'>
          {cart.slice(0,3).map(c => (
            <div className='mt-16' key={c._id}>
              <img src={c.images[0]} alt='' className='h-[126px] w-[130px] object-cover'/>
              <p className='ml-40 text-[25px] -mt-24 w-[170px]'>{c.name} ({c.amount})</p>
              <p className='text-[30px] ml-[490px] -mt-8'>          
                {Intl.NumberFormat('en-IN', { 
                style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
                }).format(c.amount * c.price)}
              </p>
              <p className='ml-40 text-[20px] underline mt-0'>Remove</p>
            </div>
          ))}
        </div>

        <div className='relative mt-16'>
          <p className='text-[30px] mt-8'>Subtotal</p>
          <p className='text-[35px] ml-[490px] -mt-[50px]'>
          {Intl.NumberFormat('en-IN', { 
                style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
                }).format(total)}
          </p>
          <p className='text-[30px] mt-8'>Shipping</p>
          <p className='text-[35px] ml-[490px] -mt-[50px]'>${shipping}</p>
        </div>

      </div>
    </>
  )
}

export default Checkout