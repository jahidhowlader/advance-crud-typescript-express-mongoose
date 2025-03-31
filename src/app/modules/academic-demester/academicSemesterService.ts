import { TAcademicSemester } from "./academicSemesterInterface";
import AcademicSemesterModel from "./academicSemesterModel";

const crateAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    const result = await AcademicSemesterModel.create(payload)
    return result
}

export const AcademicSemesterService = {
    crateAcademicSemesterIntoDB
}