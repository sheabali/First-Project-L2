import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  console.log(req.user, req.body);

  const { ...passswordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passswordData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password Updated succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
