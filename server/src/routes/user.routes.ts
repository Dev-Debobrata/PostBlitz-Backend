import { Router } from 'express';
import { deleteUser } from '../controllers/users/deleteUsers.controllers';
import { getUserByUsername } from '../controllers/users/getUsers.controllers';
import {
  patchUserData,
  patchUserImage,
  patchUserLikes,
  patchUserPassword
} from '../controllers/users/patchUsers.controllers';
import {
  postUser,
  loginUser
} from '../controllers/users/postUsers.controllers';
import { upload } from '../middleware/multerConfig';
import { validation } from '../middleware/bodyValidation';
import {
  userRegisterValidationSchema,
  userPasswordValidationSchema
} from '../utils/bodyValidationSchema';
import { userCache } from '../middleware/caching';

/**
 * @description - User route
 */

export const userRouter = Router();

userRouter.get('/users/username/:username', userCache, getUserByUsername);

userRouter.post(
  '/users/register',
  validation(userRegisterValidationSchema),
  postUser
);
userRouter.post('/users/login', loginUser);

userRouter.patch('/users/update/details', patchUserData);
userRouter.patch(
  '/users/update/password',
  validation(userPasswordValidationSchema),
  patchUserPassword
);
userRouter.patch('/users/update/like', patchUserLikes);
userRouter.patch('/users/update/image', upload.single('image'), patchUserImage);

userRouter.delete('/users/delete', deleteUser);
