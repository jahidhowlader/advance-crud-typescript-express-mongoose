import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
import { TStudent } from "../student/student.interface";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const createStudent = catchAsync(
    async (request: Request, response: Response): Promise<void> => {

        const { password: passwordFromRequestBody, student: studentData }: { password: string, student: TStudent } = request.body

        // Validate request body with ZOD
        const { password } = userValidationSchema.parse({ password: passwordFromRequestBody })
        // response data after create student
        const createdStudent = await UserServices.createStudentIntoDB(password, studentData);

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.CREATED,
            success: true,
            message: 'Student create successfully',
            data: createdStudent
        })
    }
)

export const UserController = {
    createStudent
} 