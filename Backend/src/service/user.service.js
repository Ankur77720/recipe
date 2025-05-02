import userModel from "../models/user.model.js"



export async function createUser({ username, email, password }) {

    if (!username || !email || !password) {
        throw new Error("username , email and password is required")
    }


    const isUserExist = await userModel.findOne({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    })

    if (isUserExist) {
        throw new Error("user already exist")
    }


    const hash = await userModel.hashPassword(password)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    return user

}