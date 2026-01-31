import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Requested API Route Not Found!",
    errorSources: [
      {
        path: req.originalUrl,
        message: "API Route Not Found!",
      },
    ],
  });
};

export default notFound;
