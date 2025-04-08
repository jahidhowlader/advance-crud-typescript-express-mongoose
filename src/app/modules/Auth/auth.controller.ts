import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (request, response) => {

    const result = await AuthServices.loginUser(request.body);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'User is logged in succesfully!',
        data: result
    });
});

const changePassword = catchAsync(async (request, response) => {
    const { ...passwordData } = request.body;

    const result = await AuthServices.changePassword(request.user, passwordData);
    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Password is updated succesfully!',
        data: result,
    });
})

export const AuthControllers = {
    loginUser,
    changePassword,
    // refreshToken,
};