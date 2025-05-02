import mongoose from 'mongoose';
import config from "../config/config.js"


function connectDB() {

    mongoose.connect(config.MONGO_URI)
        .then(() => {
            console.log("Connected to MONGODB")
        })
        .catch(() => {
            console.log("Error connecting to MONGODB")
        })

}


export default connectDB;