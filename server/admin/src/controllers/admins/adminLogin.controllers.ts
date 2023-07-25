import { Request, Response } from 'express';
import { IAdmin } from '../../utils/types';
import { IsValidUser } from '../../middleware/passHashing';
import { refreshAdminToken, verifyAdminToken } from '../../middleware/token';
import { Admin } from '../../models/admin.model';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to login admin. It will check if the user exists or not. If the user exists then it will check if the password is correct or not. If the password is correct then it will generate a new token and send it to the user.
 */

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const verifiedAdmin = await verifyAdminToken(token);

      if (!verifiedAdmin) {
        logger.warn({ status: 401, message: 'Unauthorized' });
        res.status(401).json({ message: 'Invalid Token' });
        return;
      }

      logger.info({ status: 200, message: 'OK' });
      res.status(200).json({ message: 'Token Already Exist' });
      return;
    }

    const findAdmin: IAdmin | null = await Admin.findOne({
      username: username
    });
    if (findAdmin === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'user does not exist' });
      return;
    }

    const userPassword = findAdmin?.password.toString();

    const result = await IsValidUser(password, userPassword || '');
    if (result === false) {
      logger.warn({ status: 401, message: 'Unauthorized' });
      res.status(401).json({ message: 'Invalid Credentials' });
      return;
    }
    let refreshToken;
    if (findAdmin) {
      refreshToken = refreshAdminToken(findAdmin);
    }

    logger.info({ status: 200, message: 'OK' });
    res
      .cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      })
      .status(200)
      .json({
        message: 'Logged In Successfully'
      });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
