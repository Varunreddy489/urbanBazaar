import mongoose from "mongoose";
import { authTypes } from "../types/types";

const authSchema = new mongoose.Schema<authTypes>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const userModel = mongoose.model<authTypes>("user", authSchema);
