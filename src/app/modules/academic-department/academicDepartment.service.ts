import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartmentModel.create(payload);
    return result;
};



export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    // getAllAcademicDepartmentsFromDB,
    // getSingleAcademicDepartmentFromDB,
    // updateAcademicDepartmentIntoDB,
};