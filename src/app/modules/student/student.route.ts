import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router
    .get('/:studentId', StudentControllers.getSingleStudent)
    .patch('/:studentId', StudentControllers.updateStudent)
    .delete('/:studentId', StudentControllers.deleteSingleStudent);


export const StudentRoutes = router;