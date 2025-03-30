import { RequestHandler } from 'express';

export const requestTime: RequestHandler = (request, response, next) => {
    request.startTime = Date.now();
    next();
}