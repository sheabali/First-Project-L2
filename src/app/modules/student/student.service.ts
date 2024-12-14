import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let searchTerm = '';

  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // Filltering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  excludeFields.forEach((el) => delete queryObj[el]);

  console.log('base query', { query }, { queryObj });

  console.log(query, queryObj);
  const fillteringQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = fillteringQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  //fields limiting
  let fields = '-__v';

  // fields: 'name,email'
  // fields: 'name email'

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log(fields);
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const getOneStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remaningStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdateData);

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdateData,
  );

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  console.log('deleted id', id);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction(), await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student.');
  }
};

export const studentsServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getOneStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
