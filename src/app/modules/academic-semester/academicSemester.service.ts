import { checkAcademicSemesternameAndCodeMapper } from "./academicSemester.conatant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model";

const crateAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    if (checkAcademicSemesternameAndCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code..')
    }

    const result = await AcademicSemesterModel.create(payload)
    return result
}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemesterModel.find();
    return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemesterModel.findById(id);
    return result;
};

const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
) => {
    if (
        payload.name &&
        payload.code &&
        checkAcademicSemesternameAndCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const AcademicSemesterService = {
    crateAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}