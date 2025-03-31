import { Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./academicSemesterService";

export const createAcademicSemester = catchAsync(async (request, response): Promise<Response | void> => {

    // const { password: passwordFromRequestBody, student: studentData }: { password: string, student: TStudent } = request.body

    // Validate request body with ZOD
    // const { password } = userValidationSchema.parse({ password: passwordFromRequestBody })
    // response data after create student
    const createdAcademicSemester = await AcademicSemesterService.crateAcademicSemesterIntoDB(request.body);

    // Send response to utility send response function
    sendResponse(request, response, {
        status: status.CREATED,
        success: true,
        message: 'academic semester is create successfully',
        data: createdAcademicSemester
    })
})

export const AcademicSemesterController = {
    createAcademicSemester
} 