import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Types } from "mongoose";

const generateTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {

    const JWT_SECRET = process.env.JWT_SECRET as Secret;
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV !== "development", // Set to true in production
    });
};

export default generateTokenAndSetCookie;
