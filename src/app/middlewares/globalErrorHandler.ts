import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../types/error";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (
    error,
    request,
    response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next
): void => {

    const startTime = request.startTime as number;
    let statusCode = error.status || 500
    let message = error.message || 'something went wrong'
    let errorSources: TErrorSources = [{
        path: '',
        message: 'something went wrong'
    }]

    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources
    }
    else if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    // else if (error?.name === 'CastError') {

    // }

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