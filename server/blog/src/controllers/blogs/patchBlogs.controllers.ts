import { Request, Response } from 'express';
import { verifyUserToken } from '../../middleware/token';
import { Blog } from '../../models/blog.model';
import { User } from '../../models/user.model';
import { serverError } from '../../utils/errorHandler';
import { ITokenPayload, IUser } from '../../utils/types';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to update a blog. It will check if the user is logged in or not. If the user is logged in then it will check if the user is the author of the blog or not. If the user is the author of the blog then it will update the blog.
 */

export const patchBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      logger.warn({ status: 403, message: 'Forbidden' });
      res.status(403).json({ message: 'Please Log In' });
      return;
    }

    const verifiedToken: ITokenPayload | undefined = await verifyUserToken(
      token
    );

    const { title, description, content, categories } = req.body;

    const getAuthor: IUser | null = await User.findOne({
      _id: verifiedToken?.userId
    });
    if (getAuthor === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    await Blog.findOneAndUpdate(
      {
        _id: req.params._id
      },
      {
        title,
        description,
        content,
        categories,
        updated_At: Date.now()
      }
    );

    logger.info({ status: 200, message: 'OK' });
    res.status(200).json({ message: 'Blog Updated Successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
