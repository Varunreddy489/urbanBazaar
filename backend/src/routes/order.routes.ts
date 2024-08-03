import { Router } from "express";
import { addOrder, getAllOrders, getOrdersByUserId } from "../controllers/order.controller";

const router = Router()

//order routes
router.post('/', addOrder)
router.get('/admin', getAllOrders)
router.get('/:userId', getOrdersByUserId);

export { router as orderRoutes }