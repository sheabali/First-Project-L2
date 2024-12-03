import { Request, Response } from 'express';
import { studentsServices } from '../student/student.service';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createUserIntoDB(password, studentData);

    res.status(200).json({
      status: true,
      message: 'Student is created succesfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something Went wrong.',
    });
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
