/* eslint-disable @typescript-eslint/no-unused-vars */
// custom.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      startTime?: number; // Add startTime property to Request
    }
  }
}
