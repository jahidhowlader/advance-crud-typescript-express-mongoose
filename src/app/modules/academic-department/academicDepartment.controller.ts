import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import { status } from "http-status";

const createAcademicDepartmemt = catchAsync(
    async (request: Request, response: Response): Promise<void> => {
        const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(request.body);

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.CREATED,
            success: true,
            message: 'Student create successfully',
            data: result
        })
    }
)


export const AcademicDepartmentControllers = {
    createAcademicDepartmemt,
    // getAllAcademicDepartmentsFromDB,
    // getSingleAcademicDepartmentFromDB,
    // updateAcademicDepartmentIntoDB,
};