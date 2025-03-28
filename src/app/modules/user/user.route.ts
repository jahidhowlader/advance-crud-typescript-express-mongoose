import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-student', UserController.createStudent);

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.patch('/:studentId', StudentControllers.updateStudent);

// router.delete('/:studentId', StudentControllers.deleteSingleStudent);


export const UserRoutes = router;