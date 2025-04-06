import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (request, response) => {
  const { id } = request.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(request, response, {
    status: status.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (request, response) => {
  const result = await FacultyServices.getAllFacultiesFromDB(request.query);

  sendResponse(request, response, {
    status: status.OK,
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (request, response) => {
  const { id } = request.params;
  const { faculty } = request.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(request, response, {
    status: status.OK,
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (request, response) => {
  const { id } = request.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(request, response, {
    status: status.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};