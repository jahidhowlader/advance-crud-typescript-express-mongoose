import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

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
        // new: true means By default findOneAndUpdate() return old data new:true meand return new data
        // runValidators: true means By default findOneAndUpdate() do not check validation rules (schema level validation) ## runValidators: true mongoose schema validation enforce 
    );
    return result;
};


const deleteSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, { $set: { isDeleted: true } });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateSingleStudentInDB,
    deleteSingleStudentFromDB
};