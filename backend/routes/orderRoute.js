import express from 'express';
import auth from '../middleware/auth.js';
import {placeOrder,getOrders,getUserOrders,editOrder} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/placeorder', auth, placeOrder);
orderRouter.get('/getorders', getOrders);
orderRouter.get('/getuserorders',auth, getUserOrders);
orderRouter.post('/editorder',editOrder); // For admin to edit order status

export default orderRouter;