import { checkAcademicSemesternameAndCode } from "./academicSemesterConatant";
import { TAcademicSemester } from "./academicSemesterInterface";
import AcademicSemesterModel from "./academicSemesterModel";

const crateAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    if (checkAcademicSemesternameAndCode[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code..')
    }

    const result = await AcademicSemesterModel.create(payload)
    return result
}

export const AcademicSemesterService = {
    crateAcademicSemesterIntoDB
}