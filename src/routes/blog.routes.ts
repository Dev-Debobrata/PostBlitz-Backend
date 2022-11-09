import { Router } from "express";
import { getBlogById, getBlogByTitle, getBlogs } from "../controllers/blogs/getBlogs.controllers";
import { postBlog } from "../controllers/blogs/postBlogs.controllers";

export const blogRouter = Router()

blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blog/id/:_id", getBlogById);
blogRouter.get("/blog/title/:title", getBlogByTitle);

blogRouter.post("/blogs", postBlog);