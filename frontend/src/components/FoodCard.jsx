import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

export const FoodCard = ({ foodprop }) => {
  const { url, cartItems, addItems, removeItems, } = useContext(StoreContext);
  return (
    <div className="bg-[#f4cd8c7a] backdrop-blur-md shadow-lg rounded-3xl overflow-hidden p-1 animate-fade flex flex-col justify-between">
      <img
        src={url+"/images/"+foodprop.image}
        alt={foodprop.name}
        className="w-full h-64 object-cover object-center rounded-3xl"
      ></img>
      <div className="p-4">
        <div className="flex flex-row justify-between items-center">
          <span className="font-bold text-[30px]"> {foodprop.name}</span>
          <img className="px-4 h-6" src={assets.rating_starts}></img>
        </div>
        <span className="block text-gray-500 text-sm">
          {" "}
          {foodprop.description}
        </span>
      </div>
      <div className="flex justify-between p-4">
        <span className="text-green-500 font-bold text-[30px] ">
          {" "}
          ${foodprop.price}
        </span>
        {cartItems[foodprop._id] ? (
          <div className="bg-white rounded-full h-[50px] p-2 flex flex-row items-center gap-3">
            <img
              className="hover:cursor-pointer"
              sizes={50}
              src={assets.remove_icon_red}
              onClick={() => removeItems(foodprop._id)}
            ></img>
            <span className="text-[20px] font-medium">
              {cartItems[foodprop._id]}
            </span>
            <img
              className="hover:cursor-pointer"
              src={assets.add_icon_green}
              onClick={() => addItems(foodprop._id)}
            ></img>
          </div>
        ) : (
          <img
            className="hover:cursor-pointer"
            src={assets.add_icon_white}
            onClick={() => addItems(foodprop._id)}
          ></img>
        )}
      </div>
    </div>
  );
};
