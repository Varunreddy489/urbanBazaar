import { Router } from "express";
import { addOrder, getOrdersByUserId } from "../controllers/order.controller";

const router = Router()

//order routes
router.post('/', addOrder)
router.get('/:userId', getOrdersByUserId);

export { router as orderRoutes }