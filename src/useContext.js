import React, { createContext, useState } from 'react'
import { useDispatch } from 'react-redux'

const MyContext = createContext()

const MyContextProvider = ({ children }) => {
  const [cart1, setCart1] = useState([{}])
  const [sort, setSort] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  const handleSort = (e) => {
    setSort(e.target.value)
    if (e.target.value === 'A-Z') {
      dispatch({ type: 'A-Z'})
    }

    if (e.target.value === 'Z-A') {
      dispatch({ type: 'Z-A'})
    }

    if (e.target.value === 'Order By Price') {
      dispatch({ type: 'orderByPrice'})
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handlePriceRange = (e) => {
    setPriceRange(e.target.value)
    if (e.target.value === "$0 to $99.99") {
      dispatch({ type: "0-99.99" })    
    } else if (e.target.value === "$100 to $249.99") {
      dispatch({ type: "100-249.99" })    
    } else if (e.target.value === "$250 to $499.99") {
      dispatch({ type: "100-249.99" })
    } else if (e.target.value === "$500 to $749.99") {
      dispatch({ type: "500-749.99" })
    } else if (e.target.value === "$750 to $999.99") {
      dispatch({ type: "750-999.99" })
    } else if (e.target.value === "$1000 or above") {
      dispatch({ type: "1000 and above" })
    }

    if (e.target.checked === true) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  return (
    <MyContext.Provider value={{ cart1, search, loading, setLoading, setSearch, handleSearch, setCart1, sort, 
    handleSort, handlePriceRange, priceRange, checked }}>
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, MyContextProvider }