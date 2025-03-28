import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
// import config from "../../config";

export const createStudent = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    // const startTime = request.startTime as number;

    // Validate request body with JOI
    // const { error, value } = studentValidationSchemaWithJoi.validate(studentData);
    // if (error) {
    //     return res.status(400).json({
    //         status: 400,
    //         success: false,
    //         message: 'Validation failed',
    //         responseTime: `${Date.now() - startTime}ms`,
    //         error: error.details.map(d => d.message)
    //     });
    // }

    // Create student
    //  const createdStudent = await StudentServices.createStudentIntoDB(value);
    //  return res.status(201).json({
    //      status: 201,
    //      success: true,
    //      message: 'Student created successfully',
    //      data: createdStudent,
    //      responseTime: `${Date.now() - startTime}ms`
    //  });

    const { password: passwordFromRequestBody }: { password: string } = request.body

    // Validate request body with ZOD
    try {

        const { password } = userValidationSchema.parse({ password: passwordFromRequestBody })

        const createdStudent = await UserServices.createStudentIntoDB(password);
        return response.status(201).json({
            status: 201,
            success: true,
            message: 'Student created successfully',
            data: createdStudent
        });
    }
    catch (error) {

        return response.status(400).json({
            status: 500,
            success: false,
            message: 'Validation failed',
            error: error.errors[0]['message'] || 'Unknown error'
        })
    }
};

export const UserController = {
    createStudent
} 