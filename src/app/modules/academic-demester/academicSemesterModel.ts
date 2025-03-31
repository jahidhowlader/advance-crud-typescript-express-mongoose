import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemesterInterface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemesterConatant";

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

const AcademicSemesterModel = model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema);

export default AcademicSemesterModel;
