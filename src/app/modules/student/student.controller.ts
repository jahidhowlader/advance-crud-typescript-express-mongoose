import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import { TStudent } from './student.interface';
import catchAsync from '../../utils/catchAsync';
import { status } from "http-status";

const getAllStudents = catchAsync(

    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
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
            next(err)
        }
    }
)

const getSingleStudent = catchAsync(

    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
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
            next(err)
        }
    }
)

const updateStudent = catchAsync(

    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
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
            next(error)
        }
    }
)

const deleteSingleStudent = catchAsync(

    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
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
            next(err)
        }
    }
)

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteSingleStudent
};