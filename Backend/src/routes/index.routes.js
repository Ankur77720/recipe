import {Router} from "express"
import userRoutes from "./user.routes.js"

const indexRoutes = Router()



indexRoutes.use('/api/v1/user', userRoutes)


export  default indexRoutes
