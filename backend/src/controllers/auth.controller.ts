import { Request, Response } from "express";

import { authModel } from "../models/authModel";
import generateTokenAndSetCookie from "../utils/genToken";
import { authTypes } from "../types/types";
import bcrypt from 'bcryptjs';

export const register = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const { name, username, email, password, confirmPassword, gender } = req.body

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }

        const isRegistered = await authModel.findOne({ email })

        if (isRegistered) {
            return res.status(500).json({ error: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new authModel({
            name,
            username,
            email,
            password: hashedPassword,
            confirmPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        await newUser.save()


        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            gender: newUser.gender,
            profilePic: newUser.profilePic,
        });

    } catch (error: any) {
        console.log("error in register:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};

export const login = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await authModel.findOne({ email })

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(404).json({ error: "Invalid Credentials" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error: any) {
        console.log("error in login:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};

export const logout = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.log("error in logout:", error.message);
        res.status(404).json({ error: "internal server error" })
    }
};

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
