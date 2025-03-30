import userModel from '../models/userModel.js';

const addToCart = async(req,res) => {
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to Cart"});
    }
    catch(error){
        return res.json({success:false,message:"Error"});
    }
}
const removeFromCart = async(req,res) => {
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({success:true,message:"Item removed"});
        }
        else{
            res.json({success:false,message:"0 items to be removed"})
        }
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}
const removeAllFromCart = async(req,res) => {
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData.length>0){
            cartData=[];
            res.json({success:true,message:"All items removed"});
        }
        else{
            res.json({success:false,message:"Cart is empty"});
        }
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}

const getCart = async(req,res) => {
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
    }
    catch(error){
        res.json({success:false,message:error});
    }
}

export {addToCart,removeFromCart,getCart,removeAllFromCart};