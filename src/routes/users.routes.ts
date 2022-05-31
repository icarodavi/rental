import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateUserAvatarController();

userRoutes.post('/', createUserController.handle);
userRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateAvatarUserController.handle
);

export { userRoutes };
