import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources: [
      {
        path: "",
        message: message,
      },
    ],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
