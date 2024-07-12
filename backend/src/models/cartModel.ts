import mongoose, { Schema, Types, Document } from 'mongoose';
import { cartItemTypes, cartTypes } from '../types/types';

const cartItemSchema = new Schema<cartItemTypes>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new Schema<cartTypes>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },
    items: [cartItemSchema]
});

export const cartModel = mongoose.model<cartTypes>("cart", cartSchema);