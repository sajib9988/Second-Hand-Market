/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose, { Types } from 'mongoose';
import { IUser, UserRole } from '../user/user.interface';
import User from '../user/user.model';

import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import config from '../../config';

import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { IAuth, IJwtPayload } from './auth.interface';
import AppError from '../../errors/appError';
import { createToken } from './auth.utils';
import { comparePassword } from '../../utils/comparePassword';
import { createHashPassword } from '../../utils/createHashPassword';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email })
      .select('+password')
      .session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is not active!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as unknown as string,
      name: user.name as string,
      email: user.email as string,
      isBlocked: user.isBlocked,
      role: user?.role as UserRole,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );
    console.log(accessToken, refreshToken, 'tokens');

    const updateUserInfo = await User.findByIdAndUpdate(
      user._id,
      { lastLogin: Date.now() },
      { new: true, session },
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string, res: Response) => {
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
    // console.log(decoded, 'decoded');
  } catch (error) {
    res.clearCookie('refreshToken');
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Expired refresh token');
  }

  const { userId } = decoded;
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // // checking if the user is inactive
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }
  //create token and sent to the  client side
  const jwtPayload = {
    userId: user._id as unknown as string,
    name: user.name as string,
    email: user.email as string,
    isBlocked: user.isBlocked,
    role: user?.role as UserRole,
  };

  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as string });
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return accessToken;
};
const updatePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { userId, email, role } = userData;
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const isPasswordMatched = await comparePassword(
    payload?.oldPassword,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Please enter current password correctly',
    );
  }
  const newPassword = await createHashPassword(
    payload?.newPassword,
    config.bcrypt_salt_rounds as string,
  );

  await User.findByIdAndUpdate(userId, {
    password: newPassword,
  });
};



export const authService = {
  loginUser,
  refreshToken,
  updatePassword,

};