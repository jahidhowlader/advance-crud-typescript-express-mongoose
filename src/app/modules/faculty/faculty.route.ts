import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .get('/:id', FacultyControllers.getSingleFaculty)
  .patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty
  )
  .delete('/:id', FacultyControllers.deleteFaculty);

router.get(
  '/',
  auth(),
  FacultyControllers.getAllFaculties
);

export const FacultyRoutes = router;