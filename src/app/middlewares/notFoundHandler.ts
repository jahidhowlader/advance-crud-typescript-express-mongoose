import { RequestHandler } from "express";
import { status } from "http-status";

const notFoundHandler: RequestHandler = (request, response, next) => {

    const startTime = request.startTime as number;

    return (response
        .status(status.NOT_FOUND)
        .json({
            success: false,
            message: 'API NOT FOUND',
            responseTime: `${Date.now() - startTime}ms`,
            error: ''
        })
    )
}

export default notFoundHandler