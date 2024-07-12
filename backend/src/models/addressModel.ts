import mongoose from "mongoose";
import { addressTypes } from "../types/types";

const addressSchema = new mongoose.Schema<addressTypes>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    streetName: {
        type: String,
        required: false
    },
    pincode: {
        type: Number,
    },
    localityName: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    }
}, { timestamps: true });

export const addressModel = mongoose.model<addressTypes>("address", addressSchema);
