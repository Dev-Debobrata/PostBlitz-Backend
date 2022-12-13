import { Router } from "express";
import { loginAdmin } from "../controllers/admins/adminLogin.controllers";

/**
 * @description - Admin route
 */

export const adminRouter = Router();

adminRouter.post("/admins/login", loginAdmin);

