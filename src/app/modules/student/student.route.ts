import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudent);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
