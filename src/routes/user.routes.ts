import { Router } from "express";
import { deleteUser } from "../controllers/users/deleteUsers.controllers";
import {
  getUserByID,
  getUserByUsername,
} from "../controllers/users/getUsers.controllers";
import {
  patchUserData,
  patchUserLikes,
  patchUserPassword,
} from "../controllers/users/patchUsers.controllers";
import {
  postUser,
  loginUser,
} from "../controllers/users/postUsers.controllers";

export const userRouter = Router();

userRouter.get("/user", getUserByID);
userRouter.get("/users/username/:username", getUserByUsername);

userRouter.post("/users/register", postUser);
userRouter.post("/users/login", loginUser);

userRouter.patch("/users/update/details", patchUserData);
userRouter.patch("/users/update/password", patchUserPassword);
userRouter.patch("/users/update/like", patchUserLikes);

userRouter.delete("/users/delete", deleteUser);
