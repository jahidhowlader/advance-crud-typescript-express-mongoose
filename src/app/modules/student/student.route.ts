import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequst from '../../middlewares/validateRequest';
import { studentValidation } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router
    .get('/:studentId', StudentControllers.getSingleStudent)
    .patch(
        '/:studentId',
        validateRequst(studentValidation.updateStudentValidationSchema),
        StudentControllers.updateStudent
    )
    .delete('/:studentId', StudentControllers.deleteSingleStudent);


export const StudentRoutes = router;