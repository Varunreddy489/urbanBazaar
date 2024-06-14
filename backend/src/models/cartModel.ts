import mongoose from "mongoose";
import { cartItemTypes, cartTypes } from "../types/types";

const cartItemSchema = new mongoose.Schema<cartItemTypes>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new mongoose.Schema<cartTypes>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

export const cartModel = mongoose.model<cartTypes>("cart", cartSchema);
