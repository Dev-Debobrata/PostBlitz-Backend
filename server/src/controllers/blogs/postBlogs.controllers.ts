import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { verifyUserToken } from '../../middleware/token';
import { Blog } from '../../models/blog.model';
import { User } from '../../models/user.model';
import { serverError } from '../../utils/errorHandler';
import { IBlog, ITokenPayload, IUser } from '../../utils/typings';
import { logger } from '../../utils/logger';

interface Files {
  image: Express.MulterS3.File[];
}

/**
 * @description This service is used to post a blog. It will check if the user is logged in or not. If the user is logged in then it will post the blog.
 */

export const postBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      logger.warn({ status: 403, message: 'Forbidden' });
      res.status(403).json({ message: 'Please Log In' });
      return;
    }

    const verifiedToken: ITokenPayload | undefined = await verifyUserToken(
      sessionToken
    );

    const getAuthor: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId
    });
    if (getAuthor === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    const { title, description, content, categories } = req.body;

    const files = <Files | undefined>req.files;
    const imagesArray: string[] = [];
    files?.image.map((file) => {
      imagesArray.push(file?.location);
    });

    const blog: HydratedDocument<IBlog> = new Blog({
      title,
      description,
      content,
      categories,
      images: imagesArray,
      author: getAuthor?._id.toString(),
      created_At: Date.now(),
      updated_At: Date.now()
    });
    await blog.save();
    logger.info({ status: 201, message: 'Created' });
    res.status(201).json({ message: 'Blog Added Successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
