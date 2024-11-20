import { Request, Response } from 'express';
import { studentsServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const result = await studentsServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'student create successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
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

export const StudentControllers = {
  createStudent,
  getAllStudent,
};
