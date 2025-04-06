/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../types/error";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (
    error,
    request,
    response,
    next
): void => {

    const startTime = request.startTime as number;
    let statusCode = error.status || 500
    let message = error.message || 'something went wrong'
    let errorSources: TErrorSources = [{
        path: '',
        message: 'something went wrong'
    }]

    // Zod Errors
    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources
    }
    // Mongoose Validation Error
    else if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    // Mongoose CastError
    else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    // Mongoose Cost Error
    else if (error?.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    // Custom App error
    else if (error instanceof AppError) {
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }
    // Error Intance
    else if (error instanceof Error) {
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }


    // Finally Response Error To Client
    response
        .status(statusCode)
        .json({
            success: false,
            message,
            responseTime: `${Date.now() - startTime}ms`,
            errorSources,
            stack: config.NODE_ENV === 'development' ? error.stack : null
        })
    return
}

export default globalErrorHandler