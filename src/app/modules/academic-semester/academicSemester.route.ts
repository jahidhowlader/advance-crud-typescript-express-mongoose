import express from 'express';
import validateRequst from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequst(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester
)
  .patch(
    '/:semesterId',
    validateRequst(AcademicSemesterValidation.updateAcademicSemesterValidationSchema),
    AcademicSemesterController.updateAcademicSemester
  );

export const AcademicSemesterRoutes = router;