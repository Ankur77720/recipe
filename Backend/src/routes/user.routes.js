import { Router } from "express";
import { getUserController, loginUserController, registerUserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.get('/me', authMiddleware, getUserController)


export default router