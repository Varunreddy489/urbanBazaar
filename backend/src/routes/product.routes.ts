import Router from "express"
import { addProduct, deleteProducts, getAllProducts, getProduct, updateProducts } from "../controllers/product.controllers"
import { verifyToken } from "../middleware/protectedRoute"

const router = Router()

router.post('/', addProduct)
router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.put('/:id', updateProducts)
router.delete('/:id', deleteProducts)

export { router as productRoutes }