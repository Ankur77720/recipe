import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from "../config/config.js"


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
    }

})


userSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, config.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

userSchema.statics.verifyToken = function (token) {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}


userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);

    return hash;

}

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch
}

const userModel = mongoose.model('user', userSchema)

export default userModel