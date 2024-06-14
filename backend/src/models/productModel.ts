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
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

export const productModel = mongoose.model<productTypes>("product", productSchema)