import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { UserModel } from '../user/user.model';

const getAllStudentsFromDB = async () => {

    const result = await StudentModel.find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};

const getSingleStudentFromDB = async (id: string) => {

    if (!(await StudentModel.isUserExist(id))) {
        throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    const result = await StudentModel.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};

const updateSingleStudentInDB = async (id: string, payload: Partial<TStudent>) => {

    if (!(await StudentModel.isUserExist(id))) {
        throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }


    const result = await StudentModel.findOneAndUpdate(
        { id },
        { $set: modifiedUpdatedData },
        { new: true, runValidators: true }
        // new: true means By default findOneAndUpdate() return old data new:true meand return new data
        // runValidators: true means By default findOneAndUpdate() do not check validation rules (schema level validation) ## runValidators: true mongoose schema validation enforce 
    );
    return result;
};


const deleteSingleStudentFromDB = async (id: string) => {

    if (!(await StudentModel.isUserExist(id))) {
        throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedStudent = await StudentModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
        }

        const deletedUser = await UserModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new AppError(status.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();
        return deletedStudent;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        if (error instanceof Error) {
            throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
        }
    }

    const result = await StudentModel.updateOne({ id }, { $set: { isDeleted: true } });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateSingleStudentInDB,
    deleteSingleStudentFromDB
};