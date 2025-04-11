import React from 'react'
import Navbar from './Navbar'


const Header = () => {
  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden'
     style={{backgroundImage: "url('/header.png')"}} id ='Header'>
      <Navbar/>
      <div className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'>
        <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-serif font-semibold pt-20'
        >Your Dream Home Awaits</h2>
      </div>
    </div>
  )
}

export default Header
