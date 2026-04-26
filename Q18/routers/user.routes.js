import { Router } from "express";
import { login, logout, refreshAccessToken, register } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const userRouter = Router() ; 

userRouter.post("/register" , register)
userRouter.post("/login" , login)
userRouter.post("/logout" , verifyJwt , logout)
userRouter.post("/refresh-token" , refreshAccessToken)

export {userRouter}