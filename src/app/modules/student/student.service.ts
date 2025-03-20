import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {


    // For Creating Static Methods
    if (await StudentModel.isUserExist(studentData.id)) {
        throw new Error('Student Id is already exist')
    }
    const result = await StudentModel.create(studentData)
    return result

    // For Creating Instance Methods 
    // const student = new StudentModel(studentData)
    // if (await student.isUserExist(studentData.id)) {
    //     throw new Error('Student Id is already exist')
    // }
    // const result = await student.save()
    // return result;
};

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find();
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
};