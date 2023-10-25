import { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";

export default (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = [
    "PUT",
    "POST",
    "GET",
    "DELETE",
    "PATCH",
    "CONNECT",
    "OPTIONS",
    "HEAD",
  ];
  if (!allowedMethods.includes(req.method)) {
    res.status(405).send(`${req.method} is not allowed`);
  }
  next();
};
