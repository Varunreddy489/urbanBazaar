import { Router } from "express";
import { addOrder, getOrders } from "../controllers/order.controller";

const router = Router()

router.post('/', addOrder)
router.get('/', getOrders)

export { router as orderRoutes }