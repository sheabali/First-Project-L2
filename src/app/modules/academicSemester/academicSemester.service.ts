import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSmester.interface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  return result;
};

const updateAcademicSemesterFromDB = async (
  academicSemesterId: string,
  updateData: Partial<TAcademicSemester>,
) => {
  const updateAcademicSemester = await AcademicSemester.findByIdAndUpdate(
    academicSemesterId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updateAcademicSemester;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
