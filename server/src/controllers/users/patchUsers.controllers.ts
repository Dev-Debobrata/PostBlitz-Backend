import { Request, Response } from 'express';
import { IsValidUser } from '../../middleware/passHashing';
import { verifyUserToken } from '../../middleware/token';
import { User } from '../../models/user.model';
import { serverError } from '../../utils/errorHandler';
import { ITokenPayload, IUser } from '../../utils/typings';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to update likes given by user. It will check if the user is logged in or not. If the user is logged in then it will take the blog id and update the likes given by the user.
 */

export const patchUserLikes = async (
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

    const { likedBlog } = req.body;

    const likedUser: IUser | null = await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId
      },
      {
        likedBlogs: likedBlog,
        updated_At: Date.now()
      }
    );
    if (likedUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User not found' });
      return;
    }
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json({ message: 'Like Added successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
}; // needs to be tested

/**
 * @description This service is used to update user data. It will check if the user is logged in or not. If the user is logged in then it will take the data and update the user data.
 */

export const patchUserData = async (
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

    const { name, username, country, email, pincode, address } = req.body;

    if (
      (name == '' &&
        username == '' &&
        country == '' &&
        email == '' &&
        pincode == '' &&
        address == '') ||
      (name == '' && !username && !country && !email && !pincode && !address) ||
      (!name && username == '' && !country && !email && !pincode && !address) ||
      (!name && !username && country == '' && !email && !pincode && !address) ||
      (!name && !username && !country && email == '' && !pincode && !address) ||
      (!name && !username && !country && !email && pincode == '' && !address) ||
      (!name && !username && !country && !email && !pincode && address == '')
    ) {
      logger.warn({ status: 400, message: 'Bad Request' });
      res
        .status(400)
        .json({ message: 'Please enter the detail you want to add' });
      return;
    }

    const updateUser: IUser | null = await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId
      },
      {
        name: name,
        username: username,
        country: country,
        email: email,
        pincode: pincode,
        address: address,
        updated_At: Date.now()
      }
    );
    if (updateUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User not found' });
      return;
    }
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json({ message: 'Data Updated successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to update user password. It will check if the user is logged in or not. If the user is logged in then it will take the password and update the user password.
 */

export const patchUserPassword = async (
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

    const { password, newPassword } = req.body;

    const updateUser: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId
    });
    if (updateUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userPassword = updateUser?.password.toString();

    const result = await IsValidUser(password, userPassword || '');
    if (result === false) {
      logger.warn({ status: 401, message: 'Unauthorized' });
      res.status(401).json({ message: 'Invalid Credentials' });
      return;
    }
    await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId
      },
      {
        password: newPassword
      }
    );

    res.status(200).json({ message: 'Data Updated successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to update user image. It will check if the user is logged in or not. If the user is logged in then it will take the image and update the user image.
 */

export const patchUserImage = async (
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

    const updateUser: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId
    });
    if (updateUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const file = <Express.MulterS3.File | undefined>req.file;

    await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId
      },
      {
        image: file?.location
      }
    );

    res.status(200).json({ message: 'Data Updated successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
