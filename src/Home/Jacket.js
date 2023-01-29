import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { url } from '../baseUrl'

const Jacket = ({ handleLoaded2 }) => {
  const [jackets, setJackets] = useState([])

  useEffect(() => {
    axios.get(`${url}/products/jackets`)
    .then(res => {
      setJackets(res.data)
      handleLoaded2()
    })

    return () => {
      setJackets([])
    }
  }, [handleLoaded2]);

  return (
    <div className="grid grid-cols-3 xs:grid-cols-1 absolute top-[2092px] xs:top-[4200px] w-full h-[1302px] font-['Sora']">
      <p className="absolute left-[667px] 2xl:left-[770px] text-[36px] xs:top-8 top-[-76px] xs:left-[130px] font-['Sora']">Jackets</p>
      <div className='grid grid-cols-3 xs:grid-cols-1 absolute h-[1193px] left-[67px] xs:left-0 top-[59px] -ml-[30px]'>
        {jackets.slice(0,6).map(jacket => (
          <div className="w-[390px] 2xl:w-[510px] 2xl:ml-4 h-fit left-[7px] top-[-44px] ml-16 xs:mt-8 xs:w-[340px]
          font-['Sora'] bg-white shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]" key={jacket._id}>
            <Link to={`/product/detail/${jacket._id}`}>
            <img src={jacket.images[0]} alt='' className="w-[390px] 2xl:w-[510px] xs:w-[340px] h-[275px] object-cover"/>
            <div className='text-center mt-8'>
              <p className="left-[81px] top-[330px] text-[30px]">{jacket.name}</p>
              <p className="top-[390px] left-[90px] mt-8 text-[30px] text-[rgba(0,0,0,0.5)]">
                {jacket.category}
              </p>
              <p className="left-[35px] mt-8 top-[468px] text-[36px]">
                Price: ${jacket.price}
              </p>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/jackets">
        <p className="absolute top-[1200px] 2xl:left-[770px] xs:top-[3500px] xs:left-[100px] left-[667px] text-[36px]">See All</p>
      </Link>
    </div>
  )
};

export default Jacket;
