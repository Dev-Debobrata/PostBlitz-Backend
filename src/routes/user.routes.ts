import { Router } from "express";
import { getUser, postUser } from "../controllers/user.controllers";

export const userRouter = Router()

userRouter.get('/users', getUser);
userRouter.post('/users', postUser);
