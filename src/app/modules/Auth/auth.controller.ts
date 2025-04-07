import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (request, response) => {

    const result = await AuthServices.loginUser(request.body);
    return result
});

export const AuthControllers = {
    loginUser,
    // changePassword,
    // refreshToken,
};