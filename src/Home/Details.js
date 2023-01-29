import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RandomCategory from './RandomCategory'
import { useDispatch } from 'react-redux'
import { url } from '../baseUrl'

const Details = () => {
  const { id } = useParams()
  const [details, setDetails] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${url}/product/detail/${id}`)
    .then(res => setDetails(res.data))
    
    return () => {
      setDetails([])
    }
  }, [id, dispatch]);

  const addToCart = () => {
    const cart = {
      id: id,
      title: 'New Cart',
      date: new Date(),
      price: details.price,
      name: details.name,
      category: details.category,
      images: details.images,
      amount: 1
     }
   
    dispatch({ type: 'addCartItem', payload: { cart, id }})
  }
  
  return (
    <div className="font-['Sora']">
      <div className="grid grid-cols-2 h-[431px]">
        <img src={details.images} className="absolute 2xl:w-[770px] col-span-1 top-[122px] left-[60px]
        object-cover h-[431px] w-[701px]" alt={details.name}/>
        <div className='absolute col-span-1 top-[115px] 2xl:left-[850px] left-[770px] h-[431px]'>
          <p className='text-[30px]'>{details.name}</p>
          <p className='text-[25px] text-[rgba(0,0,0,0.75)]'>${details.price}</p>
          <p className='text-[25px]'>{details.category}</p>
          <p className='overflow-auto h-fit 2xl:w-[800px] max-h-[250px] w-[600px]'>{details.description}</p>
          <button className='absolute left-[200px] 2xl:left-[320px] text-[20px] border border-black
          top-[452px] w-[150px] h-[35px]' onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>

      <RandomCategory c={details.category}/>

    </div>
  )
};

export default Details;
