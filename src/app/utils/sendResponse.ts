import { Request, Response } from "express";

interface Tresponse<T> {
    status: number,
    success: boolean,
    message?: string,
    data: T
}

const sendResponse = <T>(request: Request, response: Response, data: Tresponse<T>) => {

    const startTime = request.startTime as number;

    return response.status(data.status).json({
        status: data.status,
        success: true,
        message: data.message,
        responseTime: `${Date.now() - startTime}ms`,
        data: data.data
    });
}

export default sendResponse