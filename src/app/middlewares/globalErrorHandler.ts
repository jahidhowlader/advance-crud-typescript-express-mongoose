import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {

    const startTime = request.startTime as number;

    const statusCode = error.status || 500
    const message = error.message || 'something went wrong'

    return response
        .status(statusCode)
        .json({
            success: false,
            message,
            responseTime: `${Date.now() - startTime}ms`,
            error
        })
}

export default globalErrorHandler