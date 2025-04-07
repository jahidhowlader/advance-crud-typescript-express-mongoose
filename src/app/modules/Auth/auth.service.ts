import status from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';


const loginUser = async (payload: TLoginUser) => {


    // checking if the user is exist
    const user = await UserModel.findOne({ id: payload.id });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(status.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(status.FORBIDDEN, 'This user is blocked ! !');
    }

    const isPasswordMatch = await bcrypt.compare(payload?.password, user.password)

    console.log({ user, isPasswordMatch });
    // checking if the user is exist

};

export const AuthServices = {
    loginUser,
    // changePassword,
    // refreshToken,
};