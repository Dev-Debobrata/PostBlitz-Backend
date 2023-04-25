import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { randomBytes } from 'crypto';
import { User } from '../../models/user.model';
import { IUser } from '../../utils/typings';
import { IsValidUser, passHash } from '../../middleware/passHashing';
import { generateUserToken, RefreshUserToken } from '../../middleware/token';
import { transporter } from '../../middleware/nodemailerConfig';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';

const { AUTH_EMAIL } = process.env;

/**
 * @description This service is used to add user. It will take the data and add the user to the database.
 */

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, password, email, address, pincode, country } =
      req.body;

    const foundUser: IUser | null = await User.findOne({ username });
    if (foundUser !== null) {
      logger.warn({ status: 400, message: 'Bad Request' });
      res.status(400).json({
        message: 'Username already exists'
      });
      return;
    }
    const sessionId = randomBytes(16).toString('hex');
    const hashedPass = await passHash(password);

    const user: HydratedDocument<IUser> = new User({
      sessionId: sessionId,
      name,
      username,
      password: hashedPass,
      email,
      address,
      pincode,
      country,
      created_At: Date.now(),
      updated_At: Date.now()
    });
    const token = await generateUserToken(user);
    await user.save();
    const mailBody = {
      from: AUTH_EMAIL,
      to: email,
      subject: 'Account Created',
      html: `
        <h1>Your Account has been created successfully</h1>
        <p>Thank you for creating an account in postBlitz, hope you will enjoy our contents. So, let the sink in.</p>
        `
    };
    transporter.sendMail(mailBody, (error) => {
      if (error) {
        serverError(error, res);
      }
      logger.info({ status: 201, message: 'Created' });
      res
        .cookie('sessionId', token, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .status(201)
        .json({ message: 'User Added Successfully' });
    });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

/**
 * @description This service is used to login user. It will check if the user exists or not. If the user exists then it will check if the password is correct or not. If the password is correct then it will generate a new token and send it to the user.
 */

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      logger.info({ status: 200, message: 'OK' });
      res.status(200).json({ message: 'Token Already Exist' });
      return;
    }

    const newSessionId = randomBytes(16).toString('hex');

    const findUser: IUser | null = await User.findOneAndUpdate(
      { username: username },
      {
        sessionId: newSessionId,
        updated_At: Date.now()
      }
    );

    if (findUser === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'user does not exist' });
      return;
    }

    const userPassword = findUser?.password.toString();

    const result = await IsValidUser(password, userPassword || '');
    if (result === false) {
      logger.warn({ status: 401, message: 'Unauthorized' });
      res.status(401).json({ message: 'Invalid Credentials' });
      return;
    }

    let refreshToken;
    if (findUser) {
      refreshToken = await RefreshUserToken(findUser);
    }

    logger.info({ status: 201, message: 'Created' });
    res
      .cookie('sessionId', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      })
      .status(201)
      .json({
        message: 'Logged In Successfully'
      });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
