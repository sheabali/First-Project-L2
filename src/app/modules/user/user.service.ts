import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUserIntoDB = async (password: string, payload: Student) => {
  const userData: Partial<TUser> = {};

  // if password not given, use deafult password
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set generataed id
  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // refernce _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
