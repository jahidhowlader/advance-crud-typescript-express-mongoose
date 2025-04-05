// custom.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      startTime?: number; // Add startTime property to Request
    }
  }
}
