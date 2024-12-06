import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { UserControllers } from './user.controller';

const route = express.Router();

const { studentValidationSchema } = StudentValidations;

route.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = route;
