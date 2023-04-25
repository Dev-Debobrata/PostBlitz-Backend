import { Request, Response } from 'express';
import { IsValidUser } from '../../middleware/passHashing';
import { verifyUserToken } from '../../middleware/token';
import { User } from '../../models/user.model';
import { serverError } from '../../utils/errorHandler';
import { ITokenPayload, IUser } from '../../utils/typings';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to delete a user. It will check if the user is logged in or not. If the user is logged in then it will check verify the user's authentication using their password. If the user is authentic then it will delete the blog.
 */

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const getUser: IUser | null = await User.findOne({
      sessionId: verifiedToken.userId
    });
    if (getUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    const { username, password } = req.body;

    const findUser: IUser | null = await User.findOne({ username: username });
    if (findUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'user Not Found' });
      return;
    }

    if (findUser?.username !== getUser?.username) {
      logger.warn({ status: 401, message: 'Unauthorized' });
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userPassword = findUser?.password.toString();

    const result = await IsValidUser(password, userPassword as string);
    if (result === false) {
      logger.warn({ status: 401, message: 'Unauthorized' });
      res.status(401).json({ message: 'Invalid Credentials' });
      return;
    }

    await User.deleteOne({ username: username });
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json({ message: 'User Deleted Successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
