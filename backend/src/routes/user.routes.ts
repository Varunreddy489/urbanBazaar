import Router from "express"
import {  login, logout, register } from "../controllers/auth.controller"
import { verifyToken } from "../middleware/protectedRoute"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export { router as userRoutes }
