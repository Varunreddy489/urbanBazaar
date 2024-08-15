import { Router } from "express";
import { verifyToken } from "../middleware/protectedRoute";
import {
  login,
  logout,
  getUser,
  deleteUser,
  getAllUsers,
  getAllOrders,
} from "../controllers/admin.controller";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

router.get("/orders", getAllOrders);

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export { router as adminRoutes };
