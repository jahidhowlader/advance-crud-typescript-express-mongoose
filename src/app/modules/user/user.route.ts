import express from 'express';
import { UserController } from './user.controller';
import validateRequst from '../../middlewares/validateRequest';
import studentValidationSchemaWithZod from '../student/student.zod.validation';

const router = express.Router();

router.post(
    '/create-student',
    validateRequst(studentValidationSchemaWithZod),
    UserController.createStudent
);




export const UserRoutes = router;