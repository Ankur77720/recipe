import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRoutes from './routes/index.routes.js';



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRoutes)




export default app;