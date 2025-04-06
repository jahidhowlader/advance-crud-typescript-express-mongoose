import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (request, response) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
        request.body,
    );
    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});

const getAllOfferedCourses = catchAsync(async (request, response) => {
    //   const result =
    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        data: null,
    });
});

const getSingleOfferedCourses = catchAsync(
    async (request, response) => {
        // const { id } = request.params;
        //   const result =
        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'OfferedCourse fetched successfully',
            data: null,
        });
    },
);

const updateOfferedCourse = catchAsync(async (request, response) => {
    const { id } = request.params;

    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
        id,
        request.body,
    );
    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'OfferedCourse updated successfully',
        data: result,
    });
});

const deleteOfferedCourseFromDB = catchAsync(
    async (request, response) => {
        const { id } = request.params;
        const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'OfferedCourse deleted successfully',
            data: result,
        });
    },
);

export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourses,
    updateOfferedCourse,
    deleteOfferedCourseFromDB,
};