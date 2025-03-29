import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import studentValidationSchemaWithZod from "../student/student.zod.validation";
// import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
// import { StudentModel } from "../student/student.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    if (!studentData) {
        throw new Error('Student data missing')
    }

    const userData: Partial<TUser> = {
        id: '2025100001',
        password: password ?? config.DEFAULT_PASSWORD,
        role: 'student'
    }

    const studentDataAfterValidation = studentValidationSchemaWithZod.parse(studentData)
    // TODO: CHECK STUDENT ID IS EXIST
    const newUser = await UserModel.create(userData)

    if (newUser._id) {

        studentDataAfterValidation.id = newUser.id
        studentDataAfterValidation.user = newUser._id

        const newStudent = await StudentModel.create(studentDataAfterValidation)
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