import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

const { createAcademicSemesterValidationSchema } = AcademicSemesterValidation;

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
