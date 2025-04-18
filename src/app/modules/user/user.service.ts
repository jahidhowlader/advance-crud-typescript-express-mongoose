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
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createStudentIntoDB = async (
    file: any,
    password: string,
    payload: TStudent
) => {

    const userData: Partial<TUser> = {};
    userData.password = password || (config.DEFAULT_PASSWORD as string);
    userData.role = 'student';
    userData.email = payload.email;

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
        const imageName = `${userData.id}${payload?.name?.firstName}`;
        const path = file?.path;
        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path) as { secure_url: string };

        const newUser = await UserModel.create([userData], { session }); // array

        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        payload.profileImg = secure_url;

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

const createFacultyIntoDB = async (
    file: any,
    password: string,
    payload: TFaculty
) => {

    const userData: Partial<TUser> = {};
    userData.password = password || (config.DEFAULT_PASSWORD as string);
    userData.role = 'faculty';
    userData.email = payload.email;

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
        const imageName = `${userData.id}${payload?.name?.firstName}`;
        const path = file?.path;
        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path) as { secure_url: string };

        const newUser = await UserModel.create([userData], { session }); // array
        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        payload.profileImg = secure_url;

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

const createAdminIntoDB = async (
    file: any,
    password: string,
    payload: TFaculty
) => {

    const userData: Partial<TUser> = {};
    userData.password = password || (config.DEFAULT_PASSWORD as string);
    userData.role = 'admin';
    userData.email = payload.email;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        userData.id = await generateAdminId();
        const imageName = `${userData.id}${payload?.name?.firstName}`;
        const path = file?.path;
        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path) as { secure_url: string };

        const newUser = await UserModel.create([userData], { session });
        if (!newUser.length) {
            throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        payload.profileImg = secure_url;

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

const getMe = async (userId: string, role: string) => {

    // const decoded = verifyToken(token, config.jwt_access_secret as string);
    // const { userId, role } = decoded;

    let result = null;
    if (role === 'student') {
        result = await StudentModel.findOne({ id: userId }).populate('user');
    }
    if (role === 'admin') {
        result = await AdminModel.findOne({ id: userId }).populate('user');
    }

    if (role === 'faculty') {
        result = await FacultyModel.findOne({ id: userId }).populate('user');
    }

    return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
    const result = await UserModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

export const UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus
}