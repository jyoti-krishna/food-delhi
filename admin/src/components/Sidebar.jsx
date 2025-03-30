import React from 'react'
import assets from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col items-start w-64 h-100vh pt-20 pl-10 gap-10 border-gray-800 border-r-4'>
      <NavLink to='/add' className='flex flex-row gap-4 items-center font-semibold w-[100%] border-gray-800 border-4 border-r-0 p-4 cursor-pointer active:bg-orange-100 focus:border-orange-600 focus:bg-orange-100'>
       <img src={assets.add_icon} className='w-11 border-gray-900 border-[3px] rounded-[50%]'/>
       <span>Add items</span>
      </NavLink>
      <NavLink to='/list' className='flex flex-row gap-4 items-center font-semibold w-[100%] border-gray-800 border-4 border-r-0 p-4 cursor-pointer focus:border-orange-600 focus:bg-orange-100'>
       <img src={assets.list} className='w-10'/>
        <span>Items list</span>
      </NavLink>
      <NavLink to='/order' className='flex flex-row gap-4 items-center font-semibold w-[100%] border-gray-800 border-4 border-r-0 p-4 cursor-pointer focus:border-orange-600 focus:bg-orange-100'>
        <img src={assets.list} className='w-10'/>
        <span>Orders</span>
      </NavLink>
    </div>
  )
}

export default Sidebar;