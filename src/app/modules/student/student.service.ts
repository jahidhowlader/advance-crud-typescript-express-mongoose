import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

    /*
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 
   
  let searchTerm = '';   // SET DEFAULT VALUE 

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string; 
  }

  
 // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  { email: { $regex : query.searchTerm , $options: i}}
  { presentAddress: { $regex : query.searchTerm , $options: i}}
  { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  
  // WE ARE DYNAMICALLY DOING IT USING LOOP
   const searchQuery = Student.find({
     $or: studentSearchableFields.map((field) => ({
       [field]: { $regex: searchTerm, $options: 'i' },
    })),
   });

  
   // FILTERING fUNCTIONALITY:
  
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
   excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

 
  // SORTING FUNCTIONALITY:
  
  let sort = '-createdAt'; // SET DEFAULT VALUE 
 
 // IF sort  IS GIVEN SET IT
  
   if (query.sort) {
    sort = query.sort as string;
  }

   const sortQuery = filterQuery.sort(sort);


   // PAGINATION FUNCTIONALITY:

   let page = 1; // SET DEFAULT VALUE FOR PAGE 
   let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
   let skip = 0; // SET DEFAULT VALUE FOR SKIP


  // IF limit IS GIVEN SET IT
  
  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  
  
  // FIELDS LIMITING FUNCTIONALITY:

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 

  fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
  fields: 'name email'; // HOW IT SHOULD BE 

  let fields = '-__v'; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');

  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;

  */

    const studentQuery = new QueryBuilder(
        StudentModel.find()
            .populate('admissionSemester')
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                },
            }),
        query,
    )
        .search(studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await studentQuery.modelQuery;
    return result;
};

const getSingleStudentFromDB = async (id: string) => {

    if (!(await StudentModel.isUserExist(id))) {
        throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    const result = await StudentModel.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};

const updateSingleStudentInDB = async (id: string, payload: Partial<TStudent>) => {

    if (!(await StudentModel.isUserExist(id))) {
        throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }


    const result = await StudentModel.findOneAndUpdate(
        { id },
        { $set: modifiedUpdatedData },
        { new: true, runValidators: true }
        // new: true means By default findOneAndUpdate() return old data new:true meand return new data
        // runValidators: true means By default findOneAndUpdate() do not check validation rules (schema level validation) ## runValidators: true mongoose schema validation enforce 
    );
    return result;
};


const deleteSingleStudentFromDB = async (id: string) => {

    if (!(await StudentModel.isUserExist(id))) {
        throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedStudent = await StudentModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
        }

        const deletedUser = await UserModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new AppError(status.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();
        return deletedStudent;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        if (error instanceof Error) {
            throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
        }
    }

    const result = await StudentModel.updateOne({ id }, { $set: { isDeleted: true } });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateSingleStudentInDB,
    deleteSingleStudentFromDB
};