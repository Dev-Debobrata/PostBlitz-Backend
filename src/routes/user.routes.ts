import { Router } from "express";
import {
  getUserByID,
  getUserByUsername,
  getUsers,
} from "../controllers/users/getUsers.controllers";
import {
  postUser,
  loginUser,
} from "../controllers/users/postUsers.controllers";

export const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/id/:_id", getUserByID);
userRouter.get("/users/username/:username", getUserByUsername);

userRouter.post("/users/register", postUser);
userRouter.post("/users/login", loginUser);
