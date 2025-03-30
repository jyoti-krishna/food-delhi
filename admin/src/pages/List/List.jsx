import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import assets from '../../assets/assets';

const List = ({url}) => {
  const [list,setList]=useState([]);
  const fetchList = async() => {
      const res=await axios.get(`${url}/api/food/list`);
      if(res.data.success){
        setList(res.data.data);
      }
      else toast.error('Error');
  }
  useEffect(()=>{
    fetchList();
  },[])
  const removeList = async(foodIndex) => {
    console.log(foodIndex);
    const res= await axios.post(`${url}/api/food/remove`,{id:foodIndex});
    await fetchList();
    if(res.data.success)
      toast.success("removed successfully");
    else toast.error("error");
  }
  return (
    <div className='w-full p-20 pt-8'>
      <span className='text-[48px] font-bold text-gray-500'>All Items</span>
      <div className='grid grid-cols-[2fr_3fr_2fr_2fr_0.5fr] pt-10 px-12 text-[25px] text-gray-700'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      <div>
        {
          list.map((item,index)=>{
            return (<div key={index} className='grid grid-cols-[2fr_3fr_2fr_2fr_0.5fr] text-gray-600 gap-4 mt-8 p-4 items-center bg-orange-200 rounded-lg shadow-xl'>
              <img src={`${url}/images/`+item.image} className='w-40 h-40 rounded-[50%]' />
              <span className='font-semibold text-[18px]'>{item.name}</span>
              <span className='font-semibold text-[24px]'>{item.category}</span>
              <span className='font-bold text-[24px]'>${item.price}</span>
              <img src={assets.cross} className='w-6 cursor-pointer' onClick={()=>removeList(item._id)}/>
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default List