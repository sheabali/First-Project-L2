import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { UserControllers } from './user.controller';

const route = express.Router();

const { createStudentValidationSchema } = StudentValidations;

route.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = route;
