import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { url } from '../baseUrl'

const Sneaker = ({ handleLoaded1 }) => {
  const [sneakers, setSneakers] = useState([])

  useEffect(() => {
    axios.get(`${url}/products/sneakers`)
    .then(res => {
      setSneakers(res.data)
      handleLoaded1()
    })

    return () => {
      setSneakers([])
    }
  }, [handleLoaded1])

  return (
    <div className="grid grid-cols-3 xs:grid-cols-1 absolute top-[610px] w-full h-[1302px] font-['Sora']">
      <p className="absolute left-[667px] xs:left-[130px] text-[36px] top-[-76px] font-['Sora']">Sneakers</p>
      <div className='grid grid-cols-3 xs:grid-cols-1 absolute gap-2 xs:left-0 h-[1193px] left-[67px] top-[59px] -ml-[30px]'>
        {sneakers.slice(0,6).map(sneaker => (
          <div className="w-[390px] h-fit left-[7px] top-[-54px] ml-16 xs:mt-8 xs:w-[340px] xs:ml-16
          font-['Sora'] bg-white shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]" key={sneaker._id}>
            <Link to={`/product/detail/${sneaker._id}`}>
            <img src={sneaker.images[0]} alt='' className="w-[390px] xs:w-[340px] h-[275px] object-cover"/>
            <div className='text-center mt-8'>
              <p className="left-[81px] top-[330px] text-[30px]">{sneaker.name}</p>
              <p className="top-[390px] left-[90px] mt-8 text-[30px] text-[rgba(0,0,0,0.5)]">
                {sneaker.category}
              </p>
              <p className="left-[35px] mt-8 top-[468px] text-[36px]">
                Price: ${sneaker.price}
              </p>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to='/sneakers'>
        <p className="absolute top-[1250px] xs:top-[3450px] xs:left-[120px] left-[667px] text-[36px]">See All</p>
      </Link>
    </div>
  )
}

export default Sneaker