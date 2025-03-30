import { TAcademicSemester } from "./academicSemesterInterface"
import { model, Schema } from "mongoose"

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    year: {
        type: Date
    },
    startMonth: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    endMonth: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
}, {
    timestamps: true
})

export const AcademicSemester = model<TAcademicSemester>('Academic-Semester', AcademicSemesterSchema)