import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {

    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: request.body
            })
            next()
        }
        catch (error) {
            next(error)
        }
    }
}

export default validateRequest