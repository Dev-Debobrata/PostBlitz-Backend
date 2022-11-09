import { Router } from "express";
import { getUserByID, getUserByUsername, getUsers } from "../controllers/users/getUsers.controllers";
import { postUser } from "../controllers/users/postUsers.controllers";

export const userRouter = Router()

userRouter.get('/users', getUsers);
userRouter.get('/user/id/:_id', getUserByID);
userRouter.get('/user/title/:username', getUserByUsername);

userRouter.post('/users', postUser);
