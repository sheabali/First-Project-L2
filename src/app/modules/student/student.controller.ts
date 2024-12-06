import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from './student.service';

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentsServices.getOneStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student retivieved successfully.',
    data: result,
  });
});

const getAllStudent = catchAsync(async (req, res) => {
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
