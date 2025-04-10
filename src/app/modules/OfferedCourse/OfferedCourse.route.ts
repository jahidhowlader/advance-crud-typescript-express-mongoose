import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router
    .get(
        '/',
        OfferedCourseControllers.getAllOfferedCourses
    )
    .get(
        '/:id',
        OfferedCourseControllers.getSingleOfferedCourses
    )
    .post(
        '/create-offered-course',
        validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
        OfferedCourseControllers.createOfferedCourse,
    )
    .patch(
        '/:id',
        validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
        OfferedCourseControllers.updateOfferedCourse,
    ).delete(
        '/:id',
        OfferedCourseControllers.deleteOfferedCourseFromDB,
    );

export const offeredCourseRoutes = router;