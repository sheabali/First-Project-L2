import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSmester.interface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
};
