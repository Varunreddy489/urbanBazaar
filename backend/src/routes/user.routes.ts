import Router from "express"

import { verifyToken } from "../middleware/protectedRoute"
import { addAddress, getAddress, login, logout, register } from "../controllers/user.controller"

const router = Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

//address routes
router.post('/address/:userId', addAddress)
router.get('/address/:userId', getAddress)

export { router as userRoutes }
