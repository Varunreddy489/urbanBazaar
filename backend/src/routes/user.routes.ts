import Router from "express"
import { deleteUser, getAllUsers, getUser, login, logout, register, updateUser } from "../controllers/auth.controller"
import { verifyToken } from "../middleware/protectedRoute"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

router.get("/",verifyToken, getAllUsers)
router.get("/:id",verifyToken, getUser)
router.put("/updateUser/:id",verifyToken, updateUser)
router.delete("/deleteUser/:id",verifyToken, deleteUser)


export { router as userRoutes }
