import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(

    async (request, response) => {

        const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(request.body);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Semester Registration is created successfully!',
            data: result,
        });
    },
);

const getAllSemesterRegistrations = catchAsync(

    async (request, response) => {

        const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(request.query);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully !',
            data: result,
        });
    },
);

const getSingleSemesterRegistration = catchAsync(

    async (request, response) => {

        const { id } = request.params;
        const result = await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(id,);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully',
            data: result,
        });
    },
);

const updateSemesterRegistration = catchAsync(

    async (request, response) => {

        const { id } = request.params;
        const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id, request.body);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Semester Registration is updated successfully',
            data: result,
        });
    },
);

const deleteSemesterRegistration = catchAsync(

    async (request, response) => {

        const { id } = request.params;
        const result = await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Semester Registration is updated successfully',
            data: result,
        });
    },
);

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration,
};