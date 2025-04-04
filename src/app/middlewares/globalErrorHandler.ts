import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void => {

    const startTime = request.startTime as number;

    const statusCode = error.status || 500
    const message = error.message || 'something went wrong'

    if (error instanceof ZodError) {
        response
            .status(statusCode)
            .json({
                success: false,
                message: 'validation error',
                responseTime: `${Date.now() - startTime}ms`,
                error: error.errors[0].message
            })
        return
    }

    response
        .status(statusCode)
        .json({
            success: false,
            message,
            responseTime: `${Date.now() - startTime}ms`,
            error
        })
    return
}

export default globalErrorHandler