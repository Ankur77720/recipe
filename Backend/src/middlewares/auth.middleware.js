import userModel from "../models/user.model.js";


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {

        const data = userModel.verifyToken(token)

        req.user = data

        next()

    } catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}