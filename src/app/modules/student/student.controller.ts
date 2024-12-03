import { NextFunction, Request, Response } from 'express';
import { studentsServices } from './student.service';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentsServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'student are retivieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentsServices.getOneStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'student retivieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
};
