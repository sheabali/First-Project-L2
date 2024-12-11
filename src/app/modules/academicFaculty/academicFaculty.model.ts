import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultyschema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultyschema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isFacultyExist) {
    throw new AppError(404, 'This Faculty is already exist!');
  }
  next();
});

academicFacultyschema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isFacultyExist = await AcademicFaculty.findOne(query);

  if (!isFacultyExist) {
    throw new AppError(404, 'This Faculty dose not exist!');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultyschema,
);
