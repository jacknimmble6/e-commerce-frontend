import React, { useState, useContext } from 'react'
import { MyContext } from '../useContext'

const OptionBar = () => {
  const [displayOptions, setDisplayOptions] = useState('hidden')
  const { handleSort, handlePriceRange, sort } = useContext(MyContext)

  const changeDisplayOptions = () => {
    if (displayOptions === 'hidden') {
      setDisplayOptions('block top-[740px] mt-24 ml-16 left-[100px] border border-black w-[300px] bg-white')
    } else {
      setDisplayOptions('hidden')
    }
  }

  return (
    <div className="font-['Sora']">
      <>
        <button className="absolute top-[680px] left-[100px] text-[25px]" onClick={changeDisplayOptions}>Price &#8681;</button>

        <div className={displayOptions}>
          <div className="ml-16 mt-4">
            <input type="checkbox" name='$1000 or above' value="$1000 or above" onClick={handlePriceRange}/>
            <label htmlFor="$1000 or above" className="text-[20px]">$1000 or above</label>
          </div>

          <div className="ml-16 mt-4">
            <input type="checkbox" name='$750 to $999.99' value="$750 to $999.99" onClick={handlePriceRange}/>
            <label htmlFor="$750 to $999.99" className="text-[20px]">$750 to $999.99</label>
          </div>

          <div className="ml-16 mt-4">
            <input type="checkbox" name='$500 to $749.99' value="$500 to $749.99" onClick={handlePriceRange}/>
            <label htmlFor="$500 to $749.99" checked={true} className="text-[20px]">$500 to $749.99</label>
          </div>

          <div className="ml-16 mt-4">
            <input type="checkbox" name='$250 to $499.99' value="$250 to $499.99" onClick={handlePriceRange}/>
            <label htmlFor="$250 to $499.99" className="text-[20px]">$250 to $499.99</label>
          </div>

          <div className="ml-16 mt-4">
            <input type="checkbox" name='$100 to $249.99' value="$100 to $249.99" onClick={handlePriceRange}/>
            <label htmlFor="$100 to $249.99" className="text-[20px]">$100 to $249.99</label>
          </div>

          <div className="ml-16 mt-4">
            <input type="checkbox" name='$99.99 or below' value="$0 to $99.99" onClick={handlePriceRange}/>
            <label htmlFor="$99.99 or below" className="text-[20px]">$99.99 or below</label>
          </div>
        </div>
      </>

      <div>
        <select className="absolute top-[677px] 2xl:left-[1380px] left-[1120px] 
        text-[25px]" value={sort} onChange={handleSort}>
          <option value='A-Z'>Order from A-Z</option>
          <option value='Z-A'>Order from Z-A</option>
          <option value='Order By Price'>Order By Price</option>
        </select>
      </div>
    </div>
  )
}

export default OptionBar