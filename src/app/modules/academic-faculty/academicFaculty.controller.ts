import { status } from "http-status";
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
    async (request, response): Promise<void> => {
        const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
            request.body,
        );

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic faculty is created succesfully',
            data: result,
        });
    }
);

const getAllAcademicFaculties = catchAsync(
    async (request, response): Promise<void> => {
        const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic faculties are retrieved successfully',
            data: result,
        });
    }
);

const getSingleAcademicFaculty = catchAsync(
    async (request, response): Promise<void> => {
        const { facultyId } = request.params;
        const result =
            await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic faculty is retrieved succesfully',
            data: result
        });
    }
);

const updateAcademicFaculty = catchAsync(
    async (request, response): Promise<void> => {
        const { facultyId } = request.params;
        const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, request.body);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic faculty is updated succesfully',
            data: result
        });
    }
);

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};