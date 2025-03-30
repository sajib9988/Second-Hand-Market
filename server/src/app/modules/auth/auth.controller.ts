import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';
import { Request, Response } from 'express';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body,"test login data req.body")
  const result = await authService.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  // set refresh token in cookies
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: {
      accessToken,
      refreshToken,
    }
  });
});


const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken, res);
  // console.log(result,"controler result");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Create refresh token successful',
    data: result
  });
});
const updatePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await authService.updatePassword(user as JwtPayload, payload);
  // console.log(result,"controler result");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'updated password successfully successful',
    data: result,
  });
});



const logOut = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Logout Successful',
    data: []
  });
};

export const authController = {
  loginUser,
  refreshToken,
  updatePassword,
  logOut,
};