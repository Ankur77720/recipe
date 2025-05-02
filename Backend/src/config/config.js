import { config } from 'dotenv';
config();


const _config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/recipe',
    JWT_SECRET: process.env.JWT_SECRET
}


export default Object.freeze(_config);