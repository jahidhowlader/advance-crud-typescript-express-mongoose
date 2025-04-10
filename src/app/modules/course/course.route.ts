import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router
    .get(
        '/',
        CourseControllers.getAllCourses
    )
    .get(
        '/:id',
        auth('student', 'faculty', 'admin'),
        CourseControllers.getSingleCourse
    )
    .post(
        '/create-course',
        auth('admin'),
        validateRequest(CourseValidations.createCourseValidationSchema),
        CourseControllers.createCourse,
    )
    .put(
        '/:courseId/assign-faculties',
        validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
        CourseControllers.assignFacultiesWithCourse,
    )
    .patch(
        '/:id',
        auth('admin'),
        validateRequest(CourseValidations.updateCourseValidationSchema),
        CourseControllers.updateCourse,
    )
    .delete(
        '/:id',
        auth('admin'),
        CourseControllers.deleteCourse
    )
    .delete(
        '/:courseId/remove-faculties',
        validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
        CourseControllers.removeFacultiesFromCourse,
    );

export const CourseRoutes = router;