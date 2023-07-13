import { Request, Response } from 'express';
import { verifyUserToken } from '../../middleware/token';
import { User } from '../../models/user.model';
import { ITokenPayload, IUser } from '../../utils/types';
import { redisClient } from '../../utils/redisConfig';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to get a user by ID. It will check if the user is logged in or not. If the user is logged in then it will get the user by ID.
 */

export const getUserByID = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const getUser: IUser | null = await User.findOne(
      {
        _id: verifiedToken?.userId
      },
      'name username country email pincode address'
    ).populate('blogs', '-author');
    if (getUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User Not Found' });
      return;
    }
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json(getUser);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to get a user by username. It will check if the user is logged in or not. If the user is logged in then it will get the user by username.
 */

export const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;

    const user: IUser | null = await User.findOne(
      { username: username },
      'name username country'
    ).populate('blogs', '-author');
    if (user === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await redisClient.setEx(username, 3600, JSON.stringify(user));

    logger.info({ status: 200, message: 'OK' });
    res.status(200).json(user);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
