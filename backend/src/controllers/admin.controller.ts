import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { adminModel } from "../models/adminModel";
import generateTokenAndSetCookie from "../utils/genToken";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({ error: "Inadequate Data" })
        }
        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return res.status(400).json({ error: "Admin Does not Exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        const token = generateTokenAndSetCookie(admin._id, res)

        res.status(200).json({
            id: admin._id,
            email: admin.email,
        })

        console.log("token:", token);

    } catch (error: any) {
        console.error("Error in adminLogin:", error.message);
        console.log("Error in adminLogin:", error.message);
        res.status(404).json({ error: "internal server error" })


    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.log("error in logout:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
}