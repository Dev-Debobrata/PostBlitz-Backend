import { Router } from "express";
import { getBlogs } from "../controllers/blogs/getBlogs.controllers";
import { postBlog } from "../controllers/blogs/postBlogs.controllers";

export const blogRouter = Router()

blogRouter.get("/blogs", getBlogs);
// blogRouter.get("/blogs/:title", getBlog);

blogRouter.post("/blogs", postBlog);