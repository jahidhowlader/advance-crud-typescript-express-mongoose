// /* eslint-disable @typescript-eslint/no-unused-vars */
// // custom.d.ts
// import * as express from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      startTime?: number; // Add startTime property to Request
      user: JwtPayload;
    }
  }
}
