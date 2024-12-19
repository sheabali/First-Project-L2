import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  // Pi and Richard Parker

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  // const isPasswordMatched =

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched!');
  }
  // console.log(isPasswordMatched);
  //checking if the password is correct

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.jwt_access_secret as string,
    { expiresIn: '4d' },
  );

  return { accessToken, needPasswordChange: user?.needPasswordChange };
};

export const AuthServices = {
  loginUser,
};
