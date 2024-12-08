import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

const {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} = AcademicSemesterValidation;

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.get(
  '/:academicSemesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:academicSemesterId',
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
