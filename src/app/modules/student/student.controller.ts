import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { Student } from './student.interface';

const createStudent = async (req: Request, res: Response) => {
    try {
        const {
            student: studentData
        }: {
            student: Student
        } = req.body;

        const result = await StudentServices.createStudentIntoDB(studentData);
        res.status(201)
            .json({
                status: 201,
                success: true,
                message: 'Student created successfully',
                data: result,
                responseTime: `${Date.now() - (req.startTime as number)}ms`
            });
    }
    catch (err) {
        console.error(err);
        const error = err as Error;
        res.status(500)
            .json({
                status: 500,
                success: false,
                message: 'An error occurred while creating the student',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                error: error.message || 'Unknown error'
            });
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200)
            .json({
                status: 200,
                success: true,
                message: 'Student all student successfully',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                totalStudetnt: result.length,
                data: result,
            });
    }
    catch (err) {
        console.log(err);
        const error = err as Error;
        res.status(500)
            .json({
                status: 500,
                success: false,
                message: 'An error occurred while creating the student',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                error: error.message || 'Unknown error'
            });
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const result = await StudentServices.getSingleStudentFromDB(studentId);

        res.status(200)
            .json({
                status: 200,
                success: true,
                message: 'Student is retrieved succesfully',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                data: result,
            });
    }
    catch (err) {
        console.log(err);
        const error = err as Error;
        res.status(500)
            .json({
                status: 500,
                success: false,
                message: 'An error occurred while creating the student',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                error: error.message || 'Unknown error'
            });
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};