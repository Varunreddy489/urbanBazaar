import mongoose, { Types } from "mongoose";
import { OrderTypes } from "../types/types";

const orderSchema = new mongoose.Schema<OrderTypes>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    },
    address: {
        streetName: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        localityName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const orderModel = mongoose.model<OrderTypes>("order", orderSchema);
