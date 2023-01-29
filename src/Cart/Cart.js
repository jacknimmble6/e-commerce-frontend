import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const [disable, setDisable] = useState(false)
  const [disableMessage, setDisableMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [disableLink, setDisableLink] = useState('')
  const user = useSelector(state => state.user.firstName)
  
  useEffect(() => {
    if (user === '' || user === null || user === undefined) {
      setDisableLink('pointer-events-none')
      setDisableMessage('You need to be signed in to check something out.')

    } else {
      setDisableLink('')
      setDisableMessage('')
    }
  }, [user, disableMessage])

  const increase = (item) => {
    dispatch({ type: 'increase', payload: item })
  }

  const decrease = (item) => {
    dispatch({ type: 'decrease', payload: item })
  }

  const delete2 = (id) => {
    dispatch({ type: 'delete1', payload: id })
  }
  
  const clear = () => {
    dispatch({ type: 'clearCart' })
  }

  const cart = useSelector(state => state.cart)

  const total = cart.reduce((prev, current) => {
    return prev + current.price * current.amount
  }, 0)

  const deny = () => {
    if (user === '') {
      alert('You need to be signed in')
    } 

    if (cart.length === 0) {
      setDisable(true)
      setDisableMessage('Your cart is empty!!!')
      navigate('/cart')
    } else {
      setDisableMessage('')
      setDisable(false)
      setDisableLink('')
    }
  }

  return (
    <div>
      <p className='absolute top-[108px] left-[609px] text-[40px] text-center'>Your Cart</p>
      <div>

        <div className='mt-56 ml-16 top-[200px] h-fit left-[59px] w-[1290px] 2xl:w-[1580px] mb-[300px]
        border-2 border-black'>
          <div className='h-[45px] flex flex-row border-2 w-full border-black'>
            <p className='absolute left-[230px] text-[30px] 2xl:left-[120px]'>Product</p>
            <p className='absolute text-[30px] left-[639px] 2xl:left-[700px]'>Price</p>
            <p className='absolute text-[30px] left-[919px] 2xl:left-[1050px]'>Quantity</p>
            <p className='absolute text-[30px] 2xl:left-[1450px] left-[1200px]'>Total</p>
          </div>

          <div className='-mt-32'>
            {cart.length === 0 ? 
              <p className='text-[30px] mt-32 text-center'>
                You need to add some items!!
              </p> : 
              cart.map((c, index) => (
                <div className='-mt-8 h-56' key={c.id}>
                  <Link to={`/product/detail/${c.id}`}>
                    <img src={c.images} alt={c.name} className='h-[150px] w-[170px]  
                    top-[30px] mt-32' />
                  </Link>
                  <p className='text-[20px] ml-64 -mt-32 w-[250px]'>{c.name}</p>
                  <p className='ml-[570px] 2xl:ml-[620px] text-[30px] mt-[20px]'>${c.price}</p>
                  <div className='-mt-[50px] ml-40 2xl:ml-80'>
                    <button className='ml-[710px] text-[27px] -mt-32' 
                    onClick={() => increase(c.id)}>
                      <Icon icon="akar-icons:arrow-up" />
                    </button>

                    <button className='ml-[710px] text-[27px] mt-4' 
                    onClick={() => decrease(c.id)}>
                      <Icon icon="akar-icons:arrow-down" />
                    </button>

                    <p className='ml-[750px] -mt-16 text-[30px]'>{c.amount}</p>
                  </div>

                  <button className='ml-64 -mt-24 text-[25px]' onClick={() => delete2(c.id)}>
                    <Icon icon="akar-icons:trash-can" />
                  </button>
                  
                  <p className='ml-[1130px] 2xl:ml-[1390px] -mt-[70px] text-[30px]'>
                  {Intl.NumberFormat('en-IN', { 
                    style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
                    }).format(c.amount * c.price)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className='ml-48'>
          <p className='relative -mt-72 ml-[950px] text-[27px] 2xl:ml-[1280px]'>
            Subtotal: {Intl.NumberFormat('en-IN', { 
            style: 'currency', currency: 'USD', maximumSignificantDigits: 3 
            }).format(total)}
          </p>


          <p className='relative text-[16px] mt-0 ml-[820px] 2xl:ml-[1120px]'>
            Tax included. Shipping calculated at checkout.
          </p>
          <p className='absolute top-[170px] text-[25px] left-[420px] text-red-400'>{disableMessage}</p>
          <button className='absolute top-[120px] 2xl:ml-[1310px] ml-[1020px] h-[40px] text-[27px]' onClick={clear}>
            Clear Cart
          </button>
          <Link to='/checkout' className={disableLink}>
            <button className='absolute ml-[1020px] 2xl:ml-[1310px] mt-8 h-[40px] text-[20px] border-2 w-32
            border-black' onClick={deny} disabled={disable}>
              Check Out
            </button>
          </Link>
        </div>

        </div>
    </div>
  )
}

export default Cart