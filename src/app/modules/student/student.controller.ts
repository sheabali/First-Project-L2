import { Request, Response } from 'express';
import { studentsServices } from './student.service';

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

const getSingleStudent = async (req: Request, res: Response) => {
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

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
};
