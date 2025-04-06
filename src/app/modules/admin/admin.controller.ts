import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getSingleAdmin = catchAsync(async (request, response) => {
    const { id } = request.params;
    const result = await AdminServices.getSingleAdminFromDB(id);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Admin is retrieved succesfully',
        data: result,
    });
});

const getAllAdmins = catchAsync(async (request, response) => {
    const result = await AdminServices.getAllAdminsFromDB(request.query);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Admins are retrieved succesfully',
        data: result,
    });
});

const updateAdmin = catchAsync(async (request, response) => {
    const { id } = request.params;
    const { admin } = request.body;
    const result = await AdminServices.updateAdminIntoDB(id, admin);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Admin is updated succesfully',
        data: result,
    });
});

const deleteAdmin = catchAsync(async (request, response) => {
    const { id } = request.params;
    const result = await AdminServices.deleteAdminFromDB(id);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Admin is deleted succesfully',
        data: result,
    });
});

export const AdminControllers = {
    getAllAdmins,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,
};