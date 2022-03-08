import React, { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MyContext } from '../useContext';

const Navbar = () => {
  const reduxCart = useSelector(state => state.cart)
  const user = useSelector(state => state.user.firstName)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const { search, handleSearch, setLoading } = useContext(MyContext)
  const navigate = useNavigate()
  const location = useLocation()

  const showButton = () => {
    setShow(true)
  }

  const hideButton = () => {
    setShow(false)
  }
  const logout = () => {
    dispatch({ type: 'clearUser' })
    if (location.pathname === '/admin' || '/profile') {
      navigate('/')
    }
  }

  const startSearch = (e) => {
    if (e.key === 'Enter' && search !=='') {
      navigate('/search')
      setLoading(true)
      dispatch({ type: 'setTerm', payload: { search }})
    }
  }

  return (
    <div className="absolute top-0 bg-white h-[79px] xs:hidden">
      <p className="absolute top-[36px] left-[59px] text-[25px] 
      font-['Sora'] leading-[14px]">
        Commerce.Net
      </p>

      <Link to='/'>
        <p className="absolute top-[36px] left-[325px] text-[25px] 
        font-['Sora'] leading-[14px]">
          Home
        </p>
      </Link>
      
      <Link to='/allProducts'>
        <p className="absolute top-[36px] left-[485px] w-[185px] 
        text-[25px] font-['Sora'] leading-[14px]">
          All Products
        </p>
      </Link>

      <input className="absolute top-[30px] left-[753px] w-[196px] border-[1px] border-solid 
      border-black box-border" value={search} onChange={handleSearch} onKeyPress={startSearch} />

      <Link to='/cart'>
        <Icon icon="bx:bx-cart" width="51" height="35" className="absolute left-[1074px] 
        right-[16.32%] top-[25px] bottom-[29.11%]" />
        <p className='absolute left-[1120px] top-[30px] text-[20px]'>
          ({reduxCart === [] ? 0 : reduxCart.length})
        </p>
      </Link>
      
      <Link to='/profile'>
        <Icon icon="vs:profile" width="51" height="35" className="absolute left-[1324px] 
        right-[16.32%] top-[25px] bottom-[29.11%]" onMouseEnter={showButton} />
      </Link>

      {user !== '' && show === true ?
        <button className='absolute top-[25px] left-[1400px] text-[25px] w-[100px]' onClick={logout} onMouseLeave={hideButton}>
          Log Out
        </button>
        : ''
      }
    </div>
  );
};

export default Navbar;
