import mongoose from "mongoose";
import { adminAuthTypes } from '../types/types';

const adminSchema = new mongoose.Schema<adminAuthTypes>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const adminModel = mongoose.model('admin', adminSchema)