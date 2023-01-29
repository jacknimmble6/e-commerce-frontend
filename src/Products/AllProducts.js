import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { url } from '../baseUrl'
import OptionBar from './OptionBar'
import { Link } from 'react-router-dom'
import { MyContext } from '../useContext'
import { useSelector, useDispatch} from 'react-redux'

const AllProducts = () => {
  const [randomProduct, setRandomProduct] = useState([])
  const [showPage, setShowPage] = useState('hidden')
  const { checked } = useContext(MyContext)
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${url}/products/random`)
    .then(res => setRandomProduct(res.data))

    if (randomProduct !== []) {
      setShowPage('block')
    }

    if (checked === true) {
      axios.get(`${url}/products`)
      .then(res => dispatch({ type: 'addProducts', payload: res.data }))
    }

    return () => {
      setRandomProduct([])
    }
  }, [dispatch, checked])

  return (
    <>
      {products.length === 0 ? <p className="mt-64 text-[40px] ml-[600px]">Loading...</p> : 
      (
        <div className={showPage}>
          {randomProduct.map(r => (
            <img src={r.images === undefined ? '' : r.images[0]} key={r._id} alt="" 
            className="h-[550px] 2xl:w-[1580px] ml-16 mt-24 w-[1300px] "/>
          ))}
        
          <OptionBar />

          <div className="grid grid-cols-3 mt-16 w-[1370px] 2xl:w-[1580px]">
            {products.map(product => (
              <div className="w-[360px] 2xl:w-[510px] h-fit left-[0px] top-[-44px] ml-16 mt-8
               font-['Sora'] bg-white shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]" key={product._id}>

                <Link to={`/product/detail/${product._id}`}>
                  <img src={product.images[0]} alt='' className="w-[360px] 2xl:w-[510px] h-[275px] object-cover"/>

                  <div className='text-center mt-8'>
                    <p className="left-[81px] top-[330px] text-[30px]">{product.name}</p>
                    <p className="top-[390px] left-[90px] mt-8 text-[30px] text-[rgba(0,0,0,0.5)]">
                      {product.category}
                    </p>
                    <p className="left-[35px] mt-8 top-[468px] text-[36px]">
                     Price: {Intl.NumberFormat('en-IN', {  style: 'currency', currency: 'USD', maximumSignificantDigits: 3 })
                      .format(product.price)}
                    </p>
                  </div>
                
                </Link>

              </div>
            ))}
          </div>

      </div>
      )}
    </>
  )
}

export default AllProducts