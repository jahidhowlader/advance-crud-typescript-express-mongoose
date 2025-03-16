import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { Student } from './student.interface';
// import { Student } from './student.interface';

const createStudent = async (req: Request, res: Response) => {
    try {
        const {
            student: studentData
        }: {
            student: Student
        } = req.body;

        // Creating the student in the database
        const result = await StudentServices.createStudentIntoDB(studentData);

        // Returning a successful response
        res.status(201) // Use 201 for successful creation
            .json({
                status: 201,
                success: true,
                message: 'Student created successfully',
                data: result,
                responseTime: `${Date.now() - (req.startTime as number)}ms`
            });
    } catch (err) {
        console.error(err);

        // Return error response
        res.status(500)
            .json({
                status: 500,
                success: false,
                message: 'An error occurred while creating the student',
                responseTime: `${Date.now() - (req.startTime as number)}ms`,
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
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    // getSingleStudent,
};