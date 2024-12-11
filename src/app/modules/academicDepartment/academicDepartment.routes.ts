import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

const {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} = academicDepartmentValidation;

router.post(
  '/create-academic-department',
  validateRequest(createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
