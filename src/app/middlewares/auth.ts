import { status } from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {

    return catchAsync(async (request, response, next) => {

        const token = request.headers.authorization;
        // checking if the token is missing
        if (!token) {
            throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
        }

        jwt.verify(token, config.JWT_ACCESS_SECRET, function (err, decoded) {
            if (err) {
                throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
            }
            request.user = decoded as JwtPayload
            next();
        });

    });
};

export default auth;