// recipe.routes.js
import { Router } from "express";
import { submitIngredientsController } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to handle ingredient submissions - protected by auth middleware
router.post('/ingredients', authMiddleware, submitIngredientsController);

export default router;