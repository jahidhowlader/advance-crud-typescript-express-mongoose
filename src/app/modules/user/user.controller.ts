import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
import { TStudent } from "../student/student.interface";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
// import config from "../../config";

export const createStudent = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

    const { password: passwordFromRequestBody, student: studentData }: { password: string, student: TStudent } = request.body

    try {

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
    catch (error) {
        next(error)

        // if (error instanceof ZodError) {
        //     return response.status(400).json({
        //         status: 500,
        //         success: false,
        //         message: 'Validation failed',
        //         error: error.errors[0]['message'] || 'Unknown error',
        //     })
        // }

        // if (error instanceof Error) {

        //     return response.status(400).json({
        //         status: 500,
        //         success: false,
        //         message: '',
        //         error: error['message'] || 'Unknown error'
        //     })
        // }
    }
};

export const UserController = {
    createStudent
} 