import { Router } from "express";
import { addOrder, getAllOrders, getOrdersByUserId  } from "../controllers/order.controller";

const router = Router()

router.post('/', addOrder)
router.get('/user/:userId', getOrdersByUserId);
router.get('/admin', getAllOrders)

export { router as orderRoutes }