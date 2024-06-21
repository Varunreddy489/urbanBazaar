import Router from "express"

import { verifyToken } from "../middleware/protectedRoute"
import { addToCart, getCartProducts, removeItem, updateCart } from "../controllers/cart.controller"

const router = Router()

router.post("/:productId", addToCart);
router.get('/', getCartProducts);
router.put('/:productId', updateCart);
router.delete('/:cartId', removeItem);

export { router as cartRoutes }