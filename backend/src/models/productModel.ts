import mongoose from "mongoose";
import { productTypes } from "../types/types";

const productSchema = new mongoose.Schema<productTypes>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    }
});

export const productModel = mongoose.model<productTypes>("product", productSchema);
