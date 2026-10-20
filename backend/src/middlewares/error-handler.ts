import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Errors WE created on purpose (400, 404, …): safe to show the client
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: { message: err.message, details: err.details },
    });
    return;
  }

  // Anything else is a real bug: log it for us, hide the details from the client
  console.error(err);
  res.status(500).json({ error: { message: "Something went wrong" } });
};
