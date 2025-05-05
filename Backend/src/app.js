import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRoutes from './routes/index.routes.js';
import path from 'path';
import morgan from 'morgan';


const app = express();
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRoutes)

app.get('*wild',(req,res)=>{
    res.sendFile(path.join(path.resolve(), 'public', 'index.html'), (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send("Internal Server Error");
        }
    });
})




export default app;