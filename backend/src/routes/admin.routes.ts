import { Router } from "express";
import { verifyToken } from "../middleware/protectedRoute";
import { deleteUser, getAllUsers, getUser, login, logout } from "../controllers/admin.controller";

const router = Router()
router.post('/login', login)
router.post('/logout', logout)

router.get("/",getAllUsers)
router.get("/:id", getUser)
router.delete("/:id",  deleteUser)

export { router as adminRoutes }
