import { Request, Response, NextFunction, response } from 'express';
import { serverError } from '../utils/errorHandler';
import { redisClient } from '../utils/redisConfig';

/**
 * User Cache Middleware
 * @description This middleware is used to cache the user data in redis.
 * @constructor
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {NextFunction} next - Next Function
 * @returns {Promise<any>} - Returns the user data from redis or calls the next middleware.
 */

export const userCache = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;

  redisClient
    .get(username)
    .then((data) => {
      if (data != null) {
        res.status(200).json(JSON.parse(data));
      } else {
        next();
      }
    })
    .catch((error) => {
      serverError(error, res);
    });
};

/**
 * Blog Cache Middleware
 * @description This middleware is used to cache the blog data in redis.
 * @constructor
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {NextFunction} next - Next Function
 * @returns {Promise<any>} - Returns the user data from redis or calls the next middleware.
 */

export const blogCache = async (req: Request, res: Response, next: NextFunction) => {
  redisClient
    .get('blogs')
    .then((data) => {
      if (data != null) {
        res.status(200).json(JSON.parse(data));
      } else {
        next();
      }
    })
    .catch((error) => {
      serverError(error, res);
    });
};
