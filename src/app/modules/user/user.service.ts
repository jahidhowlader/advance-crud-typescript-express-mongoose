import config from "../../config";
import AppError from "../../errors/AppError";
import AcademicSemesterModel from "../academic-semester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
// import { StudentModel } from "../student/student.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    if (!payload) {
        throw new AppError(400, 'Student data missing')
    }

    // find academic semester info
    const admissionSemester = await AcademicSemesterModel.findById(
        payload.admissionSemester,
    );

    if (!admissionSemester) {
        throw new AppError(400, 'This semester not available')
    }

    const userData: Partial<TUser> = {
        id: await generateStudentId(admissionSemester),
        password: password ?? config.DEFAULT_PASSWORD,
        role: 'student'
    }

    const newUser = await UserModel.create(userData)

    if (newUser._id) {

        payload.id = newUser.id
        payload.user = newUser._id

        const newStudent = await StudentModel.create(payload)
        return newStudent
    }



    // const result = await StudentModel.create(payload)
    // return result

    // For Creating Static Methods
    // if (await StudentModel.isUserExist(payload.id)) {
    //     throw new Error('Student Id is already exist')
    // }
    // const result = await StudentModel.create(payload)
    // return result

    // For Creating Instance Methods 
    // const student = new StudentModel(payload)
    // if (await student.isUserExist(payload.id)) {
    //     throw new Error('Student Id is already exist')
    // }
    // const result = await student.save()
    // return result;
};

export const UserServices = {
    createStudentIntoDB
}