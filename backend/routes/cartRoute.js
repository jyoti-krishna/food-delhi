import express from 'express';
import {addToCart,removeFromCart,getCart,removeAllFromCart} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router();

cartRouter.use('/get',authMiddleware,getCart);
cartRouter.use('/add',authMiddleware,addToCart);
cartRouter.use('/remove',authMiddleware,removeFromCart);
cartRouter.use('/removeall',authMiddleware,removeAllFromCart);

export default cartRouter;