import express from 'express';
import validateRequst from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemesterController';
import { academicValidation } from './academicSemesterValidation';

const router = express.Router();

router.post(
    '/create-academic-semester',
    validateRequst(academicValidation.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;