import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './student.validation';

const router = express.Router();

const { updateStudentValidationSchema } = StudentValidations;

router.get('/', StudentControllers.getAllStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
