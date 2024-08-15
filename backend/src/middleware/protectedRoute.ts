import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { AuthTypes } from "../types/types";

dotenv.config();

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: AuthTypes;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = async (
  req: Request & { user?: AuthTypes },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user.toObject();

    next();
  } catch (error) {
    console.error("Error in verifyToken:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
