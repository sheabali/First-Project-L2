import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSmester.interface';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};

  // if password not given, use deafult password
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  const generateStudentId = (payload: TAcademicSemester) => {};

  // set generataed id
  // userData.id = generateStudentId()

  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // refernce _id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
