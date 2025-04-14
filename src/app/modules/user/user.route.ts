import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

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
        upload.single('file'),
        (request: Request, response: Response, next: NextFunction) => {
            request.body = JSON.parse(request.body.data);
            next();
        },
        validateRequest(studentValidation.createStudentValidationSchema),
        UserController.createStudent
    ).post(
        '/create-faculty',
        auth(USER_ROLE.admin),
        upload.single('file'),
        (request: Request, response: Response, next: NextFunction) => {
            request.body = JSON.parse(request.body.data);
            next();
        },
        validateRequest(createFacultyValidationSchema),
        UserController.createFaculty,
    )
    .post(
        '/create-admin',
        upload.single('file'),
        (request: Request, response: Response, next: NextFunction) => {
            request.body = JSON.parse(request.body.data);
            next();
        },
        validateRequest(createAdminValidationSchema),
        UserController.createAdmin,
    )
    .post(
        '/change-status/:id',
        auth('admin'),
        validateRequest(userValidation.changeStatusValidationSchema),
        UserController.changeStatus,
    );

export const UserRoutes = router;