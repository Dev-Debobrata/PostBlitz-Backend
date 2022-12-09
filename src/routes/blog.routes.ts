import { Router } from "express";
import { deleteBlog } from "../controllers/blogs/deleteBlogs.controllers";
import {
  getBlogByCategory,
  getBlogById,
  getBlogByTitle,
  getBlogs,
} from "../controllers/blogs/getBlogs.controllers";
import { patchBlog } from "../controllers/blogs/patchBlogs.controllers";
import { postBlog } from "../controllers/blogs/postBlogs.controllers";
import { upload } from "../middleware/multerConfig";

export const blogRouter = Router();

blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/id/:_id", getBlogById);
blogRouter.get("/blogs/title/:title", getBlogByTitle);
blogRouter.get("/blogs/category/:category", getBlogByCategory);

blogRouter.post(
  "/blogs/create",
  upload.fields([{ name: "image", maxCount: 3 }]),
  postBlog
);

blogRouter.patch("/blogs/update/:_id", patchBlog);

blogRouter.delete("/blogs/delete/:blogId", deleteBlog);
