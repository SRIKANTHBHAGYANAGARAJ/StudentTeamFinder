import express from 'express'

import connectDB  from './config/mongoDB.js';
import authRouter from './routers/authRouter.js';
import cors from 'cors';

const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
const allowedOrigins = [
    'http://localhost:5174',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error('CORS not allowed'));
    },
    credentials: true,
}));
connectDB().then(() => {
    console.log("MongoDB connection second time")
}).catch(err => {
console.log("MongoDB connection failed:", err)   
process.exit(1);
});


app.use('/auth', authRouter);




const server =app.listen(3500, ()=>{
   console.log("http://localhost:3500")
});