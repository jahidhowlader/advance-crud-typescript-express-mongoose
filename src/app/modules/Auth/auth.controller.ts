import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (request, response) => {

    const result = await AuthServices.loginUser(request.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;

    response.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'User is logged in succesfully!',
        data: {
            accessToken,
            needsPasswordChange,
        },
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

const refreshToken = catchAsync(async (request, response) => {

    const { refreshToken } = request.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
});

const forgetPassword = catchAsync(async (request, response) => {

    const userId = request.body.id;
    const result = await AuthServices.forgetPassword(userId);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Reset link is generated succesfully!',
        data: result,
    });
});


const resetPassword = catchAsync(async (request, response) => {

    const token = request.headers.authorization;

    const result = await AuthServices.resetPassword(request.body, token as string);
    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Password reset succesful!',
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
};