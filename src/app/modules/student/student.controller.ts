import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { Student } from './student.interface';
import studentValidationSchemaWithZod from './student.zod.validation';
import { ZodError } from 'zod';
// import studentValidationSchemaWithJoi from './student.joi.validation';


export const createStudent = async (req: Request, res: Response) => {
    const startTime = req.startTime as number;

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

    const { student: studentData }: { student: Student } = req.body;

    // Validate request body with JOD
    try {
        const zodParsedData = studentValidationSchemaWithZod.parse(studentData)

        // Create student
        const createdStudent = await StudentServices.createStudentIntoDB(zodParsedData);
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Student created successfully',
            data: createdStudent,
            responseTime: `${Date.now() - startTime}ms`
        });
    }
    catch (error) {
        // Zod Error
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Validation failed',
                responseTime: `${Date.now() - startTime}ms`,
                error: error.errors[0]['message']
            });
        }

        // Mongoose Error
        const err = error as Error
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal server error',
            responseTime: `${Date.now() - startTime}ms`,
            error: err.message || 'Unknown error'
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