import Router from "express"

import { verifyToken } from "../middleware/protectedRoute"
import { addToCart, getCartByUserId, getCartProducts, removeItem, updateCart } from "../controllers/cart.controller"

const router = Router()

router.post("/:userId/:productId", addToCart);
router.get('/', getCartProducts);
router.get('/:userId', getCartByUserId);
router.put('/:userId/:productId', updateCart);
router.delete('/:cartId', removeItem);


export { router as cartRoutes }