import { TAcademicSemester } from '../academicSemester/academicSmester.interface';

export const generateStudentId = (payload: TAcademicSemester) => {
  //first time 0000
  // 0000 => 1

  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
