import express from 'express';
import { UserController } from './user.controller';
import validateRequst from '../../middlewares/validateRequest';
import { studentValidation } from '../student/student.zod.validation';

const router = express.Router();

router.post(
    '/create-student',
    validateRequst(studentValidation.createStudentValidationSchema),
    UserController.createStudent
);

export const UserRoutes = router;