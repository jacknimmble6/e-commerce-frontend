import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { url } from '../baseUrl'

const RandomCategory = ({ c }) => {
  const [random, setRandom] = useState([])

  useEffect(() => {
    const getRandom = async () => {
      if (c === 'Sneakers') {
        axios.get(`${url}/products/random/sneaker`)
        .then(res => setRandom(res.data))
      }
      
      if (c=== 'Jackets') {
        axios.get(`${url}/products/random/jacket`)
        .then(res =>setRandom(res.data))
      }
      
      if (c === 'Accessories') {
        axios.get(`${url}/products/random/accessory`)
        .then(res => setRandom(res.data))
      }
    }

    getRandom()

    return () => {
      setRandom([])
    }
  }, [c])

  return (
    <div className="absolute top-[644px] left-[60px] w-[1200px] h-[500px] font-['Sora']">
      <p className='text-[40px] text-[rgba(0,0,0,0.75)]'>You may be interested in:</p>
      <div className='grid grid-cols-3 gap-0 w-[1370px]'>
      {random.map(r => (
        <div className='w-[380px] h-fit text-center shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]
         bg-white'>
          <Link to={`/product/detail/${r._id}`}>
            <img src={r.images[0]} alt='' className='h-[200px] w-[380px] object-cover'/>
            <p className='text-[30px]'>{r.name}</p>
            <p className='text-[25px] text-[rgba(0,0,0,0.5)] mt-4'>{r.category}</p>
            <p className='text-[30px] mt-4'>Price: ${r.price}</p>
          </Link>
        </div>
      ))}
      </div>
    </div>
  )
}

export default RandomCategory