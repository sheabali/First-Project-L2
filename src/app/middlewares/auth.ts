import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  console.log('dd', ...requiredRoles);
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);

    // checking if the token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    // invalid token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not authorized!',
          );
        }
        console.log(decoded);
        const role = (decoded as JwtPayload).data.role;
        console.log('role', role);

        console.log(!requiredRoles.includes(role));
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not authorizedd!',
          );
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
