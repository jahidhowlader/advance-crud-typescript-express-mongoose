import express from 'express';
import validateRequst from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemesterController';
import { AcademicSemesterValidation } from './academicSemesterValidation';

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