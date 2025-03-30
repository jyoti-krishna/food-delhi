import React, { useContext,useEffect,useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Cart = () => {
  const { url, food_list, addItems, removeItems, cartItems, subTotal, token } =
    useContext(StoreContext);
  const [userOrders,setUserOrders]=useState([]);
  const fetchOrder = async() => {
    const res=await axios.get(`${url}/api/order/getuserorders`,{headers:{token}});
    console.log(res.data,"hi");
    
    if(res.data.success){
      setUserOrders(res.data.data);
    }
    else toast.error('Error');
}
useEffect(()=>{
  fetchOrder();
},[])
  
  const deliveryFee = 2;
  const subTotalFee = subTotal();
  const navigate = useNavigate();
  return (
    <>
      <div className="p-[120px]">
        <h1 className="text-[28px] text-neutral-700 font-bold">Your Cart</h1>
        <hr className="border-gray-400 border-t-4 border-b-0 my-4 pb-4" />
        {subTotalFee ? (
          food_list.map((items, index) => {
            if (cartItems[items._id]) {
              return (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center p-4 bg-[#f4cd8c7a] backdrop-blur-md shadow-lg rounded-3xl mb-10"
                >
                  <div className="flex flex-row gap-4">
                    <img
                      src={url+"/images/"+items.image}
                      className="w-[100px] h-[100px] object-cover object-center rounded-3xl"
                    ></img>
                    <div>
                      <h1 className="font-bold text-[30px]">{items.name}</h1>
                      <span className="text-gray-500 text-sm">
                        {items.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-green-500 font-bold text-[30px]">
                      ${items.price * cartItems[items._id]}
                    </span>
                    <div className="bg-white rounded-full h-[50px] p-2 flex flex-row items-center gap-3">
                      <img
                        className="hover:cursor-pointer"
                        sizes={50}
                        src="https://img.icons8.com/ios-glyphs/30/000000/minus.png"
                        onClick={() => removeItems(items._id)}
                      ></img>
                      <span className="text-[20px] font-medium">
                        {cartItems[items._id]}
                      </span>
                      <img
                        className="hover:cursor-pointer"
                        src="https://img.icons8.com/ios-glyphs/30/000000/plus.png"
                        onClick={() => addItems(items._id)}
                      ></img>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <p className=" text-[28px] text-neutral-700 font-semibold flex flex-col justify-center items-center pb-10">
            Empty Cart!! Add Some Delicious Treat
          </p>
        )}
        <div className="flex flex-row md: gap-14 xl:gap-[280px]">
          <div className="flex flex-col w-full gap-2">
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
              <span >
                ${subTotalFee ? subTotalFee + deliveryFee : 0}
              </span>
            </div>

            {subTotalFee > 0 ? (
              <Button
                onClick={() => navigate("/order")}
                className="w-[50%] h-12 text-[20px] font-semibold rounded-md mt-8 bg-orange-500 text-white"
              >
                PROCEED TO CHECKOUT
              </Button>
            ) : null}
          </div>
          <div className="w-full mt-16">
            <span className="text-[18px] text-neutral-700 font-bold">
              if you have promo code, plz enter here.
            </span>
            <div className="flex flex-row mt-4 pr-10">
              <Input
                classNames={{
                  input:
                    "text-black text-[20px] bg-neutral-200 h-12 rounded-l-md p-4",
                }}
                placeholder="Promo Code"
              />
              <Button
                className="bg-neutral-800 h-12 rounded-r-md rounded-l-none text-white text-[20px] px-8"
                onClick={() => {}}
              >
                ENTER
              </Button>
            </div>
          </div>
        </div>
          <div className="pt-[50px]">
          <h1 className="text-[28px] text-neutral-700 font-bold">All orders</h1>
          <hr className="border-gray-400 border-t-4 border-b-0 my-4 pb-4" />
                {userOrders.length===0 ? <p className=" text-[28px] text-neutral-700 font-semibold flex flex-col justify-center items-center pb-10">No Orders Yet!!</p>:
                <div>{
                  userOrders.map((item,index)=>{
                    return (<div key={index} className={`grid grid-rows text-gray-600 gap-2 mt-8 p-4 items-center ${item.status === "pending" ? 'bg-blue-100' : item.status === "accepted"?'bg-green-200':'bg-red-200'} rounded-lg shadow-xl`}>
                      
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
                      <span className='font-semibold text-[18px]'>ADDRESS: {item.address.city},{item.address.address}</span>
                      <span  className='font-bold text-[18px]'>STATUS: {item.status}</span>
                    </div>)
                  })
                }</div>
                }
          </div>
      </div>
    </>
  );
};

export default Cart;
