import React, { useState } from "react";
import assets from "../../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  }) 

  const onChangeHandler = (e) => {
      const name= e.target.name;
      const value= e.target.value;
      setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('price',Number(data.price));
    formData.append('category',data.category);
    formData.append('image',image);
    const response = await axios.post(`${url}/api/food/add`,formData);
    
    if(response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      })
      setImage(false);
      toast.success(response.data.message);
    }
    else
      toast.error(response.data.message);
      
  }
  return (
    <>
      <div className="p-20 pr-80 w-full">
        <form className="flex flex-col gap-8 font-semibold text-gray-600 text-[20px]" onSubmit={onSubmitHandler}>
          <div>
            <span>Upload Image</span>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload} className="w-32 mt-3 border-gray-400 border-2 cursor-pointer" />
            </label>
            <input onChange={e=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="flex flex-col gap-4">
            <span>Product name</span>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="border-gray-400 border-2 p-2"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <span>Product Description</span>
            <textarea
              name="description"
              rows={4}
              placeholder="write here"
              className="border-gray-400 border-2 p-2"
              onChange={onChangeHandler}
              value={data.description}
              required
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <span>Product category</span>
            <select className="w-[150px] border-gray-500 border-2 p-2" onChange={onChangeHandler} value={data.category} name="category" required> 
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="SandWich">SandWich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
            <div className="flex flex-row gap-4 items-center">
            <span>Product Price</span>
            <input type="Number" className="border-gray-500 border-2 w-[150px] p-2" placeholder="$20" onChange={onChangeHandler}
              value={data.price} name="price" required/>
          </div>
          </div>
          
          <button type="submit" className="w-[100px] rounded-md p-3 bg-black text-white">ADD</button>
        </form>
      </div>
    </>
  );
};

export default Add;
