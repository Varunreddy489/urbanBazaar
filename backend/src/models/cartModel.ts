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
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

export const cartModel = mongoose.model<cartTypes>("cart", cartSchema);