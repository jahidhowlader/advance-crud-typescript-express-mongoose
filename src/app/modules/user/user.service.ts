import mongoose from "mongoose";
import config from "../../config";
import AcademicSemesterModel from "../academic-semester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import status from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    const userData: Partial<TUser> = {};

    userData.password = password || (config.DEFAULT_PASSWORD as string);
    userData.role = 'student';

    // find academic semester info
    const admissionSemester = await AcademicSemesterModel.findById(
        payload.admissionSemester,
    );

    if (!admissionSemester) {
        throw new AppError(404, "Admission semester not found");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //set  generated id
        userData.id = await generateStudentId(admissionSemester);

        // create a user (transaction-1)
        const newUser = await UserModel.create([userData], { session }); // array

        //create a student
        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a student (transaction-2)
        const newStudent = await StudentModel.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction();
        await session.endSession();
        return newStudent;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        if (err instanceof Error) {
            throw new AppError(status.BAD_REQUEST, err.message || 'Failed to create student');
        }
    }
};

export const UserServices = {
    createStudentIntoDB
}