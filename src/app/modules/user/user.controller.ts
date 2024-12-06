import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from '../student/student.service';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createUserIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is created succesfully.',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await studentsServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student are retivieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentsServices.getOneStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student retivieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  getAllUser,
  getSingleUser,
};
