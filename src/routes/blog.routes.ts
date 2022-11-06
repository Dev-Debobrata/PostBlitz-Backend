import { Router } from "express";
import { getBlog, getBlogs } from "../controllers/blog.controllers";

export const blogRouter = Router()

blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/:title", getBlog);