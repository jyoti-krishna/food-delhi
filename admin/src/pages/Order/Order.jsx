import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Order = ({url}) => {
  const [orders,setOrders]=useState([]);
  const fetchOrder = async() => {
      const res=await axios.get(`${url}/api/order/getorders`);
      if(res.data.success){
        setOrders(res.data.data);
      }
      else toast.error('Error');
  }
  useEffect(()=>{
    fetchOrder();
  },[])
  const acceptOrder = async(orderId) => {
    const res=await axios.post(`${url}/api/order/editorder`,{orderId, status: "accepted"});
    if(res.data.success){
      toast.success('Order Accepted');
      fetchOrder();
    }
    else toast.error('Error mu');
  }
  const rejectOrder = async(orderId) => {
    const res=await axios.post(`${url}/api/order/editorder`,{orderId, status: "rejected"});
    if(res.data.success){
      toast.error('Order Rejected');
      fetchOrder();
    }
    else toast.error('Error');
  }
  return (
    <div className='w-full p-20 pt-8'>
      <div>
              <div className='text-4xl font-semibold'>Total Orders: {orders.length}</div>
              
              {
                orders.map((item,index)=>{
                  return (<div key={index} className={`grid grid-rows text-gray-600 gap-2 mt-8 p-4 items-center ${item.status === "pending" ? 'bg-blue-100' : item.status === "accepted"?'bg-green-200':'bg-red-200'} rounded-lg shadow-xl`}>
                    <span className='font-semibold text-[24px]'>{item.address.city}: {item.address.address}</span>
                    <span className='font-semibold text-[18px]'>{item.address.firstName} ({item.address.phoneNumber})</span>
                    <span className='font-semibold text-[18px]'>ORDER</span>
                    <div>
                      {
                        item.items.map((item,index)=>{
                          return (
                            <div key={index} className='flex flex-row gap-4 items-center'>
                              <span  className='font-semibold text-[18px]'>{item.quantity} X {item.name} ({item.category})</span>
                            </div>
                          )
                        })
                      }
                    </div>
                    <span className='font-semibold text-[18px]'>${item.amount}</span>
                    <span  className='font-bold text-[18px]'>STATUS: {item.status}</span>
                    <div className='flex flex-row gap-4 items-center'>
                      <button className='bg-green-500 text-white p-2 rounded-lg' onClick={()=>acceptOrder(item._id)}>Accept</button>
                      <button className='bg-red-500 text-white p-2 rounded-lg' onClick={()=>rejectOrder(item._id)}>Reject</button>
                    </div>
                  </div>)
                })
              }
            </div>
    </div>

  )
}

export default Order