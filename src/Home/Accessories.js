import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { url } from '../baseUrl'

const Accessories = ({ handleLoaded3 }) => {
  const [accessories, setAccessories] = useState([])

  useEffect(() => {
    axios.get(`${url}/products/accessories`)
    .then(res => {
      setAccessories(res.data)
      handleLoaded3()
    })
  
    return () => {
      setAccessories([])
    }
  }, [handleLoaded3]);

  return (
    <div className="grid grid-cols-3 xs:grid-cols-1 absolute top-[3564px] xs:top-[7800px] w-full h-[1302px] font-['Sora']">
      <p className="absolute left-[637px] 2xl:left-[720px] text-[36px] top-[-76px] xs:left-24 xs:top-0 font-['Sora']">Accessories</p>
      <div className='grid grid-cols-3 xs:grid-cols-1 absolute h-[1193px] left-[67px] xs:top-[50px] xs:left-0 top-[19px] -ml-[30px]'>
        {accessories.slice(0,6).map(accessory => (
          <div className="w-[390px] xs:w-[340px] 2xl:ml-4 2xl:w-[510px] h-fit left-[7px] top-[-44px] ml-16 mt-8
          font-['Sora'] bg-white shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]" key={accessory._id}>
            <Link to={`/product/detail/${accessory._id}`}>
              <img src={accessory.images[0]} alt='' className="w-[390px] 2xl:w-[510px] xs:w-[340px] h-[275px] object-cover"/>
              <div className='text-center mt-8'>
                <p className="left-[81px] top-[330px] text-[30px]">{accessory.name}</p>
                <p className="top-[390px] left-[90px] mt-8 text-[30px] text-[rgba(0,0,0,0.5)]">
                  {accessory.category}
                </p>
                <p className="left-[35px] mt-8 top-[468px] text-[36px]">
                  Price: ${accessory.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/accessories">
        <p className="absolute top-[1300px] 2xl:left-[760px] left-[667px] text-[36px]">See All</p>
      </Link>
    </div>
  )

};

export default Accessories;
