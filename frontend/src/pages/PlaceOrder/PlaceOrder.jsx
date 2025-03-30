import React, { useContext,useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { toast } from 'react-toastify';
import axios from "axios";

const PlaceOrder = () => {
  const { subTotal,token,food_list,cartItems,url,removeAllItems } = useContext(StoreContext);
  const [data,setData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    address:'',
    city:'',
    postalCode:'',
    country:''
  });
  const handleChange = (e) => {
    const namme=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[namme]:value}));
  }
  const deliveryFee = 2;
  const subTotalFee = subTotal();
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map(item=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData ={
      address:data,
      items:orderItems,
      amount:subTotalFee+deliveryFee,
    }
    let response = await axios.post(url+'/api/order/placeorder',orderData,{headers:{token}});
    if(response.data.success){
      toast.success(response.data.message);
      removeAllItems();
    }
    else{
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <form className="p-[120px] " onSubmit={placeOrder}>
        <p className="text-[40px] pb-10 font-semibold">Delivery Information</p>
        <div className="grid grid-cols-[25%_25%_50%] gap-4 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                placeholder="Enter your first name"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Enter your email"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                value={data.phoneNumber}
                placeholder="Enter your phone number"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">Address</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={data.address}
                placeholder="Enter your address"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                placeholder="Enter your Last name"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">City</label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={data.city}
                placeholder="Enter your city"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                onChange={handleChange}
                value={data.postalCode}
                placeholder="Enter your postal code"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[20px] font-medium">Country</label>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                value={data.country}
                placeholder="Enter your country"
                className="border-2 border-gray-400 p-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 pl-16">
            <h1 className="text-[28px] text-neutral-900 font-bold">
              Cart Totals
            </h1>
            <div className="flex flex-row justify-between text-[20px] font-medium text-neutral-500">
              <span>items total</span>
              <span>${subTotalFee}</span>
            </div>

            <hr className="border-gray-400 border-t-1 border-b-0" />

            <div className="flex flex-row justify-between text-[20px] font-medium text-neutral-500">
              <span>delivery fee</span>
              <span>${subTotalFee ? deliveryFee : 0}</span>
            </div>

            <hr className="border-gray-400 border-t-1 border-b-0" />

            <div className="flex flex-row justify-between font-bold text-[24px] text-neutral-500">
              <span>Total</span>
              <span>${subTotalFee ? subTotalFee + deliveryFee : 0}</span>
            </div>

            {subTotalFee > 0 ? (
              <Button
                type="submit"
                className="w-[50%] h-12 text-[20px] font-semibold rounded-md mt-8 bg-orange-500 text-white"
                
              >
                PAY ON DELIVERY
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
