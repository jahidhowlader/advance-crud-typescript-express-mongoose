import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.conatant";

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: true,
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true,
    }
});

AcademicSemesterSchema.pre('save', async function (next) {

    const findThisSemesterExistForYear = await AcademicSemesterModel.findOne({
        name: this.name,
        year: this.year
    })

    if (findThisSemesterExistForYear) {
        throw new Error('Semester is already exist!')
    }
    next()
})

const AcademicSemesterModel = model<TAcademicSemester>('Academic-Semester', AcademicSemesterSchema);

export default AcademicSemesterModel;
