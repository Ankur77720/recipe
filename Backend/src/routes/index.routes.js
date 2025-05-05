import { Router } from "express"
import userRoutes from "./user.routes.js"
import recipeRoutes from "./recipe.routes.js"

const indexRoutes = Router()

indexRoutes.use('/api/v1/user', userRoutes)
indexRoutes.use('/api/v1/recipe', recipeRoutes)

export default indexRoutes
