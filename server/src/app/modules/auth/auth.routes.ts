import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';

import auth from '../../middleware/auth';
import { authController } from './auth.controller';


const authRouter = Router();

authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  authController.loginUser,
);
authRouter.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  authController.refreshToken,
);
authRouter.put(
  '/update-password',
  auth(),  
  validateRequest(AuthValidation.changePasswordZodSchema),
  authController.updatePassword,
);


export default authRouter;