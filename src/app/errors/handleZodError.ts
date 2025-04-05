import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../types/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {

    const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });

    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources
    };
};

export default handleZodError;