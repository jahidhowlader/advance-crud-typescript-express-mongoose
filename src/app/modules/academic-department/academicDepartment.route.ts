import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
    '/create-academic-department',
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router
    .get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment)
    .patch(
        '/:departmentId',
        validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
        AcademicDepartmentControllers.updateAcademicDepartment
    );


export const AcademicDepartmentRoutes = router;