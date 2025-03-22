import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {

    const result = await StudentModel.create(payload)
    return result

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

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find();
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    // const result = await StudentModel.aggregate([
    //     {
    //         $match: { id }
    //     }
    // ]);
    const result = await StudentModel.findOne({ id });
    return result;
};

const updateSingleStudentInDB = async (id: string, payload: Partial<TStudent>) => {
    const result = await StudentModel.findOneAndUpdate(
        { id },
        { $set: payload },
        { new: true, runValidators: true }
    );
    return result;
};


const deleteSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, { $set: { isDeleted: true } });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateSingleStudentInDB,
    deleteSingleStudentFromDB
};