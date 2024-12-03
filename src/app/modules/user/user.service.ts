import config from '../../config';
import { StudentModel } from '../student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (password: string, studentData: TUser) => {
  const userData: Partial<TUser> = {};

  // if password not given, use deafult password
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // set generataed id
  userData.id = '20241234';

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
