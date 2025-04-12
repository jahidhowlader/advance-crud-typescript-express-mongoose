import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router
    .post(
        '/login',
        validateRequest(AuthValidation.loginValidationSchema),
        AuthControllers.loginUser,
    )
    .post(
        '/change-password',
        auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
        validateRequest(AuthValidation.changePasswordValidationSchema),
        AuthControllers.changePassword,
    )
    .post(
        '/refresh-token',
        validateRequest(AuthValidation.refreshTokenValidationSchema),
        AuthControllers.refreshToken,
    )
    .post(
        '/forget-password',
        validateRequest(AuthValidation.forgetPasswordValidationSchema),
        AuthControllers.forgetPassword
    )
    .post(
        '/reset-password',
        validateRequest(AuthValidation.resetPasswordValidationSchema),
        AuthControllers.resetPassword,
    );

export const AuthRoutes = router;