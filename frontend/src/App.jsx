import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const [isLogin,setIsLogin]=useState(false);
  return (
    <>
    <ToastContainer/>
    <NextUIProvider>
      <Navbar setIsLogin={setIsLogin}/>
      <LoginModal isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
      <Footer/>
      </NextUIProvider>
    </>
  );
}

export default App;
