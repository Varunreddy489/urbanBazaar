import Router from "express"

import { verifyToken } from "../middleware/protectedRoute"
import { addAddress, getAddress, login, logout, register, updateUser } from "../controllers/user.controller"

const router = Router()

router.post("/login", login)
router.post("/logout", logout)
router.post("/register", register)
router.put("/:id", updateUser)


//address routes
router.post('/address/:userId', addAddress)
router.get('/address/:userId', getAddress)

export { router as userRoutes }
