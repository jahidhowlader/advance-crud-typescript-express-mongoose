import { Request, Response, NextFunction } from 'express';

export const requestTime = (request: Request, response: Response, next: NextFunction) => {
    request.startTime = Date.now();
    next();
}