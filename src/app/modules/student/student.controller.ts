import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { TStudent } from './student.interface';
import studentValidationSchemaWithZod from './student.zod.validation';
import { ZodError } from 'zod';
// import studentValidationSchemaWithJoi from './student.joi.validation';

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
                message: 'An error occurred while retrieved the student',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                error: error.message || 'Unknown error'
            });
    }
};

const updateStudent = async (req: Request, res: Response) => {
    const startTime = req.startTime as number;
    const { studentId } = req.params;
    const { student: studentData }: { student: Partial<TStudent> } = req.body; // Partial<TStudent> means type hint, all field will not update

    try {
        const zodParsedData = studentValidationSchemaWithZod.partial().parse(studentData); // partial() meabs allow optional field
        const updatedStudent = await StudentServices.updateSingleStudentInDB(studentId, zodParsedData);

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Student updated successfully',
            data: updatedStudent,
            responseTime: `${Date.now() - startTime}ms`
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Validation failed',
                responseTime: `${Date.now() - startTime}ms`,
                error: error.errors[0]['message']
            });
        }

        const err = error as Error;
        return res.status(500).json({
            status: 500,
            success: false,
            message: err.message,
            responseTime: `${Date.now() - startTime}ms`,
            error: err || 'Unknown error'
        });
    }
};


const deleteSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteSingleStudentFromDB(studentId);
        res.status(200)
            .json({
                status: 200,
                success: true,
                message: 'Student delete succesfully',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                data: result,
            });
    }
    catch (err) {
        console.log('err');
        const error = err as Error;
        res.status(500)
            .json({
                status: 500,
                success: false,
                message: 'An error occurred while deleting the student',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
                error: error.message || 'Unknown error'
            });
    }
};

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteSingleStudent
};