import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (request, response) => {
    const result = await CourseServices.createCourseIntoDB(request.body);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (request, response) => {
    const result = await CourseServices.getAllCoursesFromDB(request.query);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Course are retrieved successfully',
        data: result,
    });
});

const getSingleCourse = catchAsync(async (request, response) => {
    const { id } = request.params;
    const result = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Course is retrieved succesfully',
        data: result,
    });
});

const updateCourse = catchAsync(async (request, response) => {
    const { id } = request.params;
    const result = await CourseServices.updateCourseIntoDB(id, request.body);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'course is updated succesfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (request, response) => {
    const { id } = request.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
    });
});

const assignFacultiesWithCourse = catchAsync(async (request, response) => {
    const { courseId } = request.params;
    const { faculties } = request.body;

    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
        courseId,
        faculties,
    );

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Faculties assigned  succesfully',
        data: result,
    });
});

const removeFacultiesFromCourse = catchAsync(async (request, response) => {
    const { courseId } = request.params;
    const { faculties } = request.body;

    const result = await CourseServices.removeFacultiesFromCourseFromDB(
        courseId,
        faculties,
    );

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Faculties removed  succesfully',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse,
};