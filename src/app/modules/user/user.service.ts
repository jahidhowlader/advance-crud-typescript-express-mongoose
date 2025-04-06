/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import config from "../../config";
import AcademicSemesterModel from "../academic-semester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import status from "http-status";
import { AcademicDepartmentModel } from "../academic-department/academicDepartment.model";
import { TFaculty } from "../faculty/faculty.interface";
import { FacultyModel } from "../faculty/faculty.model";
import { AdminModel } from "../admin/admin.model";

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
        userData.id = await generateStudentId(admissionSemester);
        const newUser = await UserModel.create([userData], { session }); // array

        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {

    const userData: Partial<TUser> = {};
    userData.password = password || (config.DEFAULT_PASSWORD as string);
    userData.role = 'faculty';
    const academicDepartment = await AcademicDepartmentModel.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        userData.id = await generateFacultyId();

        const newUser = await UserModel.create([userData], { session }); // array
        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        const newFaculty = await FacultyModel.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();
        return newFaculty;
    }
    catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {

    const userData: Partial<TUser> = {};
    userData.password = password || (config.DEFAULT_PASSWORD as string);
    userData.role = 'admin';

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        userData.id = await generateAdminId();
        const newUser = await UserModel.create([userData], { session });
        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        const newAdmin = await AdminModel.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();
        return newAdmin;
    }
    catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB
}