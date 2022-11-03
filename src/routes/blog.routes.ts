import { Router } from "express";
import { getBlog } from "../controllers/blog.controllers";

export const blogRouter = Router()

blogRouter.get("/blogs", getBlog);