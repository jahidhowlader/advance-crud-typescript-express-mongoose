import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import { status } from "http-status";

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
        },
    },
    {
        timestamps: true,
    },
);

AcademicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartmentModel.findOne({
        name: this.name,
    });

    if (isDepartmentExist) {
        throw new AppError(
            status.NOT_FOUND,
            'This department is already exist!',
        );
    }

    next();
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartmentModel.findOne(query);

    if (!isDepartmentExist) {
        throw new AppError(
            status.NOT_FOUND,
            'This department does not exist! ',
        );
    }

    next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
    'Academic-Department',
    AcademicDepartmentSchema,
);