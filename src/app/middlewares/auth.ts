import status from "http-status";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../modules/user/user.model";
import jwt from "jsonwebtoken";

const auth = (...requiredRoles: TUserRole[]) => {
    
    return catchAsync(async (request, response, next) => {
        const token = request.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
        }

        // checking if the given token is valid
        const decoded = jwt.verify(
            token,
            config.JWT_ACCESS_SECRET as string,
        ) as JwtPayload;

        const { role, userId, iat } = decoded;

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
            UserModel.isJWTIssuedBeforePasswordChanged(
                user.passwordChangedAt,
                iat as number,
            )
        ) {
            throw new AppError(status.UNAUTHORIZED, 'You are not authorized !');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                status.UNAUTHORIZED,
                'You are not authorized  hi!',
            );
        }

        request.user = decoded as JwtPayload;
        next();
    });
};

export default auth;