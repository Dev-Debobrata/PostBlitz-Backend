import { Router } from "express";
import { getUsers } from "../controllers/users/getUsers.controllers";
import { postUser } from "../controllers/users/postUsers.controllers";

export const userRouter = Router()

userRouter.get('/users', getUsers);
// userRouter.get('/users/:username', getUserByUsername);

userRouter.post('/users', postUser);
