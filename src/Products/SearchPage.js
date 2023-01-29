import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { MyContext } from '../useContext'
import { url } from '../baseUrl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SearchPage = () => {
  const [products, setProducts] = useState([])
  const { loading, setLoading } = useContext(MyContext)
  const search1 = useSelector(state => state.search.searchTerm)

  useEffect(() => {
    axios.get(`${url}/products`, { params: { search: search1 } })
    .then(res => {
      setProducts(res.data)
      setLoading(false)
    })

    return () => {
      setProducts([])
    }
  }, [search1])

  return (
    <div className="font-['Sora']">
      {loading ? <p className="text-[90px] mt-72 ml-[520px]">Loading...</p> : (
      <>
      <p className='mt-40 text-[35px] ml-16'>Products Found({products.length})</p>
      <div className="grid grid-cols-3 mt-8 w-[1350px] 2xl:w-[1580px]">
        {products.map(product => (
          <div className="w-[390px] 2xl:w-[510px] h-fit left-[0px] top-[-44px] ml-16 mt-8
           font-['Sora'] bg-white shadow-[4px_4px_4px_4px_rgba(0,0,0,0.35)]" key={product._id}>
            <Link to={`/product/detail/${product._id}`}>
              <img src={product.images[0]} alt='' className="w-[390px] 2xl:w-[510px] h-[275px] object-cover"/>
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
      </>
      )}
    </div>
  )
}

export default SearchPage