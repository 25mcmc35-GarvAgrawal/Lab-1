import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express() ; 

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong"
    });
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,   
    credentials: true  
}))

app.use(cookieParser()) 

app.use(express.json({
    limit: "16kb"
}))

import { userRouter } from "./routers/user.routes.js";
import { productRouter } from "./routers/product.routes.js";

app.use("/api/v1/users" , userRouter) ; 
app.use("/api/v1/products" , productRouter) ; 



export {app}