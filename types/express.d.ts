// types/express.d.ts
import { } from 'express';

declare module 'express' {
    interface Request {
        startTime?: number;
    }
}
