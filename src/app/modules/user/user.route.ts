import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';

const router = express.Router();

router.post(
    '/create-student',
    validateRequest(studentValidation.createStudentValidationSchema),
    UserController.createStudent
);

router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    UserController.createFaculty,
);

router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserController.createAdmin,
);

export const UserRoutes = router;