import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);
export const StoreProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  useEffect(()=>{
    const loadData = async () => {
      await fetchFoodList();
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  },[])

  const fetchFoodList = async () => {
    const response = await axios.get(url+ '/api/food/list');
    if(!response.data.success)
      alert("Error while fetching food list");
    setFoodList(response.data.data);
  }
  const addItems = async(id) => {
    if (!cartItems[id]) setCartItems((prev) => ({ ...prev, [id]: 1 }));
    else setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    if(token){
      await axios.post(url+"/api/cart/add",{"itemId":id},{headers:{token}});
    }
  };
  const removeItems = async(id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{"itemId":id},{headers:{token}});
    }
  };
  const removeAllItems = async() => {
    setCartItems({});
    if(token){
      await axios.post(url+"/api/cart/removeall",{},{headers:{token}});
    }
  }
  const loadCartData = async(token) =>{
    const res = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    if(res.data.success)
      setCartItems(res.data.cartData);
    else 
      console.log(res.data.message);
  }
  const subTotal = () => {
    let total = 0;     
    for (const item in cartItems)
      if (cartItems[item]) total += food_list.find(i=>i._id===item).price * cartItems[item];
    return total;
  };
  const contextValue = {
    food_list,
    addItems,
    removeItems,
    removeAllItems,
    cartItems,
    setCartItems,
    subTotal,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
