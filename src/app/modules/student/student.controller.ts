import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { TStudent } from './student.interface';
import { ZodError } from 'zod';
import catchAsync from '../../utils/catchAsync';
import { status } from "http-status";

const getAllStudents = catchAsync(

    async (request: Request, response: Response): Promise<void> => {
        try {
            const result = await StudentServices.getAllStudentsFromDB();
            response.status(200)
                .json({
                    status: status.OK,
                    success: true,
                    message: 'Student all student successfully',
                    responseTime: `${Date.now() - (request.startTime as number)}ms`,
                    totalStudetnt: result.length,
                    data: result,
                });
        }
        catch (err) {
            console.log(err);
            const error = err as Error;
            response.status(500)
                .json({
                    status: 500,
                    success: false,
                    message: 'An error occurred while creating the student',
                    responseTime: `${Date.now() - (request.startTime as number)}ms`,
                    error: error.message || 'Unknown error'
                });
        }
    }
)

const getSingleStudent = catchAsync(

    async (request: Request, response: Response): Promise<void> => {
        try {
            const { studentId } = request.params;
            const result = await StudentServices.getSingleStudentFromDB(studentId);
            response.status(200)
                .json({
                    status: status.OK,
                    success: true,
                    message: 'Student is retrieved succesfully',
                    responseTime: `${Date.now() - (request.startTime as number)}ms`,
                    data: result,
                });
        }
        catch (err) {
            console.log(err);
            const error = err as Error;
            response.status(500)
                .json({
                    status: 500,
                    success: false,
                    message: 'An error occurred while retrieved the student',
                    responseTime: `${Date.now() - (request.startTime as number)}ms`,
                    error: error.message || 'Unknown error'
                });
        }
    }
)

const updateStudent = catchAsync(

    async (request: Request, response: Response): Promise<void> => {
        const startTime = request.startTime as number;
        const { studentId } = request.params;
        const { student: studentData }: { student: Partial<TStudent> } = request.body; // Partial<TStudent> means type hint, all field will not update

        try {
            const updatedStudent = await StudentServices.updateSingleStudentInDB(studentId, studentData);

            response.status(200).json({
                status: status.OK,
                success: true,
                message: 'Student updated successfully',
                data: updatedStudent,
                responseTime: `${Date.now() - startTime}ms`
            });
        }
        catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Validation failed',
                    responseTime: `${Date.now() - startTime}ms`,
                    error: error.errors[0]['message']
                });
            }

            const err = error as Error;
            response.status(500).json({
                status: 500,
                success: false,
                message: err.message,
                responseTime: `${Date.now() - startTime}ms`,
                error: err || 'Unknown error'
            });
        }
    }
)

const deleteSingleStudent = catchAsync(

    async (request: Request, response: Response): Promise<void> => {
        try {
            const { studentId } = request.params;
            const result = await StudentServices.deleteSingleStudentFromDB(studentId);
            response.status(200)
                .json({
                    status: status.OK,
                    success: true,
                    message: 'Student delete succesfully',
                    responseTime: `${Date.now() - (request.startTime as number)}ms`,
                    data: result,
                });
        }
        catch (err) {
            console.log('err');
            const error = err as Error;
            response.status(500)
                .json({
                    status: 500,
                    success: false,
                    message: 'An error occurred while deleting the student',
                    responseTime: `${Date.now() - (request.startTime as number)}ms`,
                    error: error.message || 'Unknown error'
                });
        }
    }
)

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteSingleStudent
};