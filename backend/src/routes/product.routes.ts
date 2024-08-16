import Router from "express";
import {
  addProduct,
  deleteProducts,
  getAllProducts,
  getProduct,
  updateProducts,
} from "../controllers/product.controllers";
import PaginatedResults from "../utils/pagination";
import { productModel } from "../models/productModel";
import { verifyToken } from "../middleware/protectedRoute";

const router = Router();

router.post("/", verifyToken, addProduct);
router.get("/", verifyToken, PaginatedResults(productModel), getAllProducts);
router.get("/:id", verifyToken, getProduct);
router.put("/:id", verifyToken, updateProducts);
router.delete("/:id", verifyToken, deleteProducts);

export { router as productRoutes };
