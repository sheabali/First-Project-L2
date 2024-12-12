import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUserIntoDB = async (password: string, payload: Student) => {
  const userData: Partial<TUser> = {};

  // If password is not provided, use the default password from config
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid academic semester ID.',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate student ID based on the academic semester
    userData.id = await generateStudentId(admissionSemester);

    // Create the new user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user.');
    }

    // Assign user ID and reference to the payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference the created user's _id

    // Create the student
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student.');
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user.');
  }
};

export const UserServices = {
  createUserIntoDB,
};
