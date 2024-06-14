  import { NextFunction, Request, Response } from "express";
  import jwt from "jsonwebtoken";

  const JWT_SECRET = process.env.JWT_SECRET as string

  export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, JWT_SECRET, (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };