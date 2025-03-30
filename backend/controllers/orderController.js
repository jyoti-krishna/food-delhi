import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import stripe from 'stripe';

const placeOrder = async (req, res) => {
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});
        return res.json({success:true, message: "Order Placed Successfully"});
    }
    catch(err){
        return res.json({success:false,message: err.message});
    }
}
const getOrders = async (req, res) => {
    try{
        const orders = await orderModel.find();
        return res.json({success:true, data: orders});
    }
    catch(err){
        return res.json({success:false,message: err.message});
    }
}
const getUserOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        return res.json({success:true, data: orders});
    }
    catch(err){
        return res.json({success:false,message: err.message});
    }
}
const editOrder = async (req,res) => {
    try{
        const order = await orderModel.findById(req.body.orderId);
        const status = req.body.status;
        if(order.status === "pending"){
            order.status = status;
            await order.save();
            return res.json({success:true, message: "Order Status Updated"});
        }
        else{
            return res.json({success:false, message: "Order Already Accepted"});
        }
    }
    catch(err){
        return res.json({success:false,message: err.message});
    }
}

export { placeOrder,getOrders ,getUserOrders, editOrder};