import bcrypt from 'bcryptjs';
import { Request, Response } from "express";

import { authTypes } from "../types/types";
import { userModel } from "../models/userModel";
import { addressModel } from "../models/addressModel";
import generateTokenAndSetCookie from "../utils/genToken";

export const register = async (req: Request<any, any, authTypes>, res: Response) => {
    try {
        const { name, username, email, password, confirmPassword, gender, profilePic } = req.body

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }

        const isRegistered = await userModel.findOne({ email })

        if (isRegistered) {
            return res.status(500).json({ error: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new userModel({
            name,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: profilePic || gender === "male" ? boyProfilePic : girlProfilePic,
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

        const user = await userModel.findOne({ email })

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

export const addAddress = async (req: Request, res: Response) => {
    try {
        const { userId, streetName, pincode, localityName, city, state } = req.body;

        const isUser = await userModel.findById(userId);

        if (!isUser) {
            return res.status(400).send("Invalid user");
        }

        const existingAddress = await addressModel.findOne({
            userId,
            streetName,
            pincode,
            localityName,
            city,
            state,
        });

        if (existingAddress) {
            return res.status(400).json({ message: "Address already exists" });
        }

        const newAddress = new addressModel({
            userId,
            streetName,
            pincode,
            localityName,
            city,
            state,
        });

        await newAddress.save();
        return res.status(201).json({ message: "Address added successfully" });
    } catch (error) {
        console.error("Error in addAddress:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(400).json({ message: "Invalid user" })
        }

        const addresses = await addressModel.find({ userId })
        
        if (!addresses.length) {
            return res.status(404).json({ message: "No addresses found for this user" });
        }

        return res.status(200).json(addresses)

    } catch (error) {
        console.error("error in getAddress:", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}