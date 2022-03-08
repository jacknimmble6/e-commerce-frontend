import React, { useState, useEffect } from 'react';
import RandomPhoto from './RandomPhoto'
import Sneaker from './Sneaker';
import Jacket from './Jacket';
import Accessories from './Accessories'

const Home = () => { 
  const [loaded1, setLoaded1] = useState(true)
  const [loaded2, setLoaded2] = useState(true)
  const [loaded3, setLoaded3] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleLoaded1 = () => {
    setLoaded1(false)
  }

  const handleLoaded2 = () => {
    setLoaded2(false)
  }

  const handleLoaded3 = () => {
    setLoaded3(false)
  }

  const handleLoaded = () => {
    if (loaded1 === true || loaded2 === true || loaded3 === true) {
      setLoading(true) 
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleLoaded()
  })

  return (
    <>
    {loading === true ? <p className="mt-64 text-[40px] ml-[600px]">Loading...</p> : (
      <div>
        <RandomPhoto />
        <Sneaker handleLoaded1={handleLoaded1}/>
        <Jacket handleLoaded2={handleLoaded2}/>
        <Accessories handleLoaded3={handleLoaded3}/>
      </div>
    )}
    </>
  )
};

export default Home;
