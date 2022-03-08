import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { url } from '../baseUrl'
import { Link } from 'react-router-dom'

const Sneakers = () => {
  const [sneakers, setSneakers] = useState([])

  useEffect(() => {
    axios.get(`${url}/products/sneakers`)
    .then(res => setSneakers(res.data))

    return () => {
      setSneakers([])
    }
  }, []);

  const randomImage = sneakers[Math.floor(Math.random()*sneakers.length)] || ''

  return (
    <>
    {sneakers.length === 0 ? <p className="mt-64 text-[40px] ml-[600px]">Loading...</p> :
    <div>
      <img src={randomImage.images === undefined ? '' : randomImage.images[0]} key={randomImage._id} 
       alt="" className="h-[550px] ml-16 mt-24 w-[1300px] "/>
        
      <div className="grid grid-cols-3 mt-16 w-[1370px]">
        {sneakers.map(product => (
          <div className="w-[360px] h-fit left-[0px] top-[-44px] ml-16 mt-8
           font-['Sora'] bg-white shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]" key={product._id}>

            <Link to={`/product/detail/${product._id}`}>
              <img src={product.images[0]} alt='' className="w-[360px] h-[275px] object-cover"/>

              <div className='text-center mt-8'>
                <p className="left-[81px] top-[330px] text-[30px]">{product.name}</p>
                <p className="top-[390px] left-[90px] mt-8 text-[30px] text-[rgba(0,0,0,0.5)]">
                  {product.category}
                </p>
                <p className="left-[35px] mt-8 top-[468px] text-[36px]">
                  Price: Price: {Intl.NumberFormat('en-IN', {  style: 'currency', currency: 'USD', maximumSignificantDigits: 3 })
                  .format(product.price)}
                </p>
              </div>
                
            </Link>

          </div>
        ))}
      </div>
    </div>
    }
    </>
  )
}

export default Sneakers