import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router
  .get('/', SemesterRegistrationController.getAllSemesterRegistrations)
  .get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
  )
  .post(
    '/create-semester-registration',
    validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,),
    SemesterRegistrationController.createSemesterRegistration,
  )
  .patch(
    '/:id',
    validateRequest(SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,),
    SemesterRegistrationController.updateSemesterRegistration,
  )
  .delete(
    '/:id',
    SemesterRegistrationController.deleteSemesterRegistration,
  );

export const semesterRegistrationRoutes = router;