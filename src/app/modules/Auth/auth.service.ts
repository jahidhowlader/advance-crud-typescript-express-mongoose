import status from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import config from "../../config";
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {

    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(payload.id);
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

    if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(status.FORBIDDEN, 'Password do not matched');
    }

    //create token and sent to the  client
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.JWT_ACCESS_SECRET as string,
        config.JWT_ACCESS_EXPIRES_IN as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.JWT_REFRESH_SECRET as string,
        config.JWT_REFRESH_EXPIRES_IN as string,
    );

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange
    }
};

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string; newPassword: string }) => {

    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(userData.userId);
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

    //checking if the password is correct
    if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new AppError(status.FORBIDDEN, 'Password do not matched');

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.BCRIPT_SALT),
    );

    await UserModel.findOneAndUpdate(
        {
            id: userData.userId,
            role: userData.role,
        },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date(),
        },
    );

    return null;
};

const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    const { userId, iat } = decoded;

    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(userId);

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

    if (
        user.passwordChangedAt &&
        UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    ) {
        throw new AppError(status.UNAUTHORIZED, 'You are not authorized !');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.JWT_ACCESS_SECRET as string,
        config.JWT_REFRESH_EXPIRES_IN as string,
    );

    return {
        accessToken,
    };
};
export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
};