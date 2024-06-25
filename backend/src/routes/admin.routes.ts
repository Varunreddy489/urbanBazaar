import { Router } from "express";
import { verifyToken } from "../middleware/protectedRoute";
import { deleteUser, getAllUsers, getUser, login, logout, updateUser } from "../controllers/admin.controller";

const router = Router()
router.post('/login', login)
router.post('/logout', logout)

router.get("/",getAllUsers)
router.get("/:id", verifyToken, getUser)
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)

export { router as adminRoutes }
