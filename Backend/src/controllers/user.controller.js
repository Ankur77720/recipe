import { createUser } from "../service/user.service.js";
import userModel from "../models/user.model.js";


export const registerUserController = async (req, res) => {

    const { username, email, password } = req.body

    try {

        const user = await createUser({
            username, email, password
        })

        const token = user.generateToken()

        res.cookie("token", token)

        return res.status(201).json({
            message: "user created successfully",
            user
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "user not created",
            err
        })

    }





}

export const loginUserController = async (req, res) => {

    const { username, password } = req.body

    try {

        const user = await userModel.findOne({
            username
        })
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const token = user.generateToken()
        res.cookie("token", token)
        return res.status(200).json({
            message: "user logged in successfully",
            user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "user not logged in",
            err
        })
    }
}

export const getUserController = async (req, res) => {

    const user = await userModel.findById(req.user.id).select("-password")

    return res.status(200).json({
        user
    })

}