import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import { status } from "http-status";

const createAcademicDepartment = catchAsync(

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

const getAllAcademicDepartments = catchAsync(

    async (request: Request, response: Response): Promise<void> => {

        const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic departments are retrieved successfully',
            data: result,
        });
    }
);

const getSingleAcademicDepartment = catchAsync(

    async (request: Request, response: Response): Promise<void> => {

        const { departmentId } = request.params;
        const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic department is retrieved successfully',
            data: result,
        });
    }
);

const updateAcademicDepartment = catchAsync(

    async (request: Request, response: Response): Promise<void> => {

        const { departmentId } = request.params;
        const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, request.body);

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.OK,
            success: true,
            message: 'Academic department is updated successfully',
            data: result,
        });
    }
);

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
};