import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { adminModel } from "../models/adminModel";
import generateTokenAndSetCookie from "../utils/genToken";
import { authTypes } from "../types/types";
import { authModel } from "../models/authModel";

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

export const getAllUsers = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const users = await authModel.find()
        return res.status(403).json(users)
    } catch (error: any) {
        console.log("error in get all users:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};

export const getUser = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const { id } = req.params

        const isUserExists = await authModel.findById(id)

        if (!isUserExists) {
            return res.status(404).json({ error: "User Does not exist" })
        }

        const user = await authModel.findById(id)
        return res.status(200).json(user)
    } catch (error: any) {
        console.log("error in get user:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};

export const updateUser = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const { id } = req.params
        const { name, username, email, password, confirmPassword, gender } = req.body

        const isUserExists = await authModel.findById(id)

        if (!isUserExists) {
            return res.status(404).json({ error: "User Does not exist" })
        }

        const user = await authModel.findByIdAndUpdate(id, req.body)

        return res.status(200).json(user)

    } catch (error: any) {
        console.log("error in update user:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};

export const deleteUser = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const { id } = req.params

        const isUserExists = await authModel.findById(id)

        if (!isUserExists) {
            return res.status(404).json({ error: "User Does not exist" })
        }

        const user = await authModel.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ eror: "user not found" })
        }
        return res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.log("error in deleteuser", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};