import { Request, Response } from 'express';
import { Blog } from '../../models/blog.model';
import { serverError } from '../../utils/errorHandler';
import { redisClient } from '../../utils/redisConfig';
import { IBlog } from '../../utils/types';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to get all the blogs. It will check if the blogs exist or not. If the blogs exist then it will send the blogs to the user.
 */

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs: Array<IBlog> | null = await Blog.find({}).populate(
      'author',
      '-_id name username image'
    );
    if (blogs === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'Blog Not Found' });
      return;
    }

    await redisClient.setEx('blogs', 3600, JSON.stringify(blogs));

    logger.info({ status: 200, message: 'OK' });
    res.status(200).json(blogs);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to get a blog by id. It will check if the blog exist or not. If the blog exist then it will send the blog to the user.
 */

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.params;
    const blog: IBlog | null = await Blog.findById({ _id: _id }).populate(
      'author',
      'name username image'
    );
    if (blog === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json(blog);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to get a blog by title. It will check if the blog exist or not. If the blog exist then it will send the blog to the user.
 */

export const getBlogByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.params;
    const blog: Array<IBlog> | null = await Blog.find({
      title: { $regex: new RegExp(title.replace(/\s+/g, '\\s+'), 'gi') }
    }).populate('author', 'name username image');
    if (blog === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json(blog);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to get a blog by category. It will check if the blog exist or not. If the blog exist then it will send the blog to the user.
 */

export const getBlogByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category } = req.params;
    const blog: Array<IBlog> | null = await Blog.find({
      categories: {
        $regex: new RegExp(category.replace(/\s+/g, '\\s+'), 'gi')
      }
    }).populate('author', 'name username image');
    if (blog === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json(blog);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
