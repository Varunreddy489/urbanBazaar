import Router from "express"

import { verifyToken } from "../middleware/protectedRoute"
import { addToCart, getCartProducts, removeItem, updateCart } from "../controllers/cart.controller"

const router = Router()

router.post("/:productId", addToCart);
router.get('/', getCartProducts);
router.put('/:userId/:productId', updateCart);
router.delete('/:userId/:productId', removeItem);

export { router as cartRoutes }