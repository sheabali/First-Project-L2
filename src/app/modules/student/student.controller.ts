import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from './student.service';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentsServices.getOneStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student retivieved successfully.',
    data: result,
  });
});

const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentsServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student are retivieved successfully.',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
};
