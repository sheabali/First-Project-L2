import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { studentsServices } from '../student/student.service';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createUserIntoDB(password, studentData);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student is created succesfully.',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await studentsServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'student are retivieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentsServices.getOneStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'student retivieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createStudent,
};
