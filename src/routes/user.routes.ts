import { Router } from "express";
import { getUsers, getUserByUsername, postUser } from "../controllers/user.controllers";

export const userRouter = Router()

userRouter.get('/users', getUsers);
userRouter.get('/users/:username', getUserByUsername);

userRouter.post('/users', postUser);
