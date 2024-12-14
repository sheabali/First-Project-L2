import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    unique: true,
    ref: 'User',
  },

  name: userNameSchema,
  gender: {
    type: String, // Specifies the field's data type
    enum: ['male', 'female'], // Limits the value to these options
    required: [true, 'Gender is required'], // Custom error message when missing
  },

  dateOfBirth: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  localGuardian: localGuardianSchema,
  profileImg: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.virtual('fullName').get(function () {
  return this?.name.firstName + this?.name.middleName + this?.name.lastName;
});

// studentSchema.pre('save', async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExist) {
//     throw new AppError(404, 'This department is already exist!');
//   }
//   next();
// });

// studentSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery();

//   const isDepartmentExist = await AcademicDepartment.findOne(query);

//   if (!isDepartmentExist) {
//     throw new AppError(404, 'This department dose not exist!');
//   }
//   next();
// });

export const StudentModel = model<Student>('Student', studentSchema);
