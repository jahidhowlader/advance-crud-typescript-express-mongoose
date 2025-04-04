import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./academicSemester.service";
import { Request, Response } from "express";

export const createAcademicSemester = catchAsync(
    async (request: Request, response: Response): Promise<void> => {

        const createdAcademicSemester = await AcademicSemesterService.crateAcademicSemesterIntoDB(request.body);

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.CREATED,
            success: true,
            message: 'academic semester is create successfully',
            data: createdAcademicSemester
        });
    }
);

const getAllAcademicSemesters = catchAsync(
    async (request: Request, response: Response): Promise<void> => {
        const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic semesters are retrieved successfully',
            data: result,
        });

    }
);

const getSingleAcademicSemester = catchAsync(
    async (request: Request, response: Response): Promise<void> => {
        const { semesterId } = request.params;
        const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic semester is retrieved succesfully',
            data: result,
        });
    }
);

const updateAcademicSemester = catchAsync(
    async (request: Request, response: Response): Promise<void> => {
        const { semesterId } = request.params;
        const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(semesterId, request.body);

        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic semester is retrieved succesfully',
            data: result,
        });
    }
);

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
} 