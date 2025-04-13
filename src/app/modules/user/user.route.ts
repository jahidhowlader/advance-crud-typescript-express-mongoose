import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router
    .get(
        '/me',
        auth('student', 'faculty', 'admin'),
        UserController.getMe
    )
    .post(
        '/create-student',
        auth(USER_ROLE.admin),
        validateRequest(studentValidation.createStudentValidationSchema),
        UserController.createStudent
    ).post(
        '/create-faculty',
        auth(USER_ROLE.admin),
        validateRequest(createFacultyValidationSchema),
        UserController.createFaculty,
    )
    .post(
        '/create-admin',
        validateRequest(createAdminValidationSchema),
        UserController.createAdmin,
    );

export const UserRoutes = router;