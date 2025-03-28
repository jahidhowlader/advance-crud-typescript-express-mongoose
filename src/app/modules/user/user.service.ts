import config from "../../config";
// import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
// import { StudentModel } from "../student/student.model";

const createStudentIntoDB = async (password: string) => {

    const user: Partial<TUser> = {
        id: '2025100001',
        password: password ?? config.DEFAULT_PASSWORD,
        role: 'student'
    }

    const createUserOperation = await UserModel.create(user)

    // if (createUserOperation) {

    // }
    // else {

    // }

    console.log({
        createUserOperation,
        result: typeof createUserOperation,
        id: createUserOperation.id
    });




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