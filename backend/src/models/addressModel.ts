import mongoose from "mongoose";
import { AddressTypes } from "../types/types";

const addressSchema = new mongoose.Schema<AddressTypes>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
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

export const addressModel = mongoose.model<AddressTypes>("address", addressSchema);
