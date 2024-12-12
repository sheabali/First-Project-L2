import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from './student.service';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentsServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student are retivieved successfully.',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);
  const result = await studentsServices.getOneStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student retivieved successfully.',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { student } = req.body;
  const { studentId } = req.params;

  const result = await studentsServices.updateStudentFromDB(studentId, student);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is update successfully.',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentsServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student deleted successfully.',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
