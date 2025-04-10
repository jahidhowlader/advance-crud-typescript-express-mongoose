/* eslint-disable @typescript-eslint/ban-ts-comment */
import jwt from 'jsonwebtoken';

export const createToken = (
    jwtPayload: { userId: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    // @ts-ignore
    return jwt.sign(jwtPayload, secret, {
        expiresIn
    });
};