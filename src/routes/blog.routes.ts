import { Router } from "express";
import { getBlogByCategory, getBlogById, getBlogByTitle, getBlogs } from "../controllers/blogs/getBlogs.controllers";
import { postBlog } from "../controllers/blogs/postBlogs.controllers";

export const blogRouter = Router()

blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/id/:_id", getBlogById);
blogRouter.get("/blogs/title/:title", getBlogByTitle);
blogRouter.get("/blogs/category/:category", getBlogByCategory);

blogRouter.post("/blogs/create", postBlog);