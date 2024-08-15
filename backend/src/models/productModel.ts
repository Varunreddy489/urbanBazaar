import mongoose from "mongoose";
import { ProductTypes } from "../types/types";

const productSchema = new mongoose.Schema<ProductTypes>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    default: "",
  },
  dimensions: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
  },
});

export const productModel = mongoose.model<ProductTypes>(
  "product",
  productSchema
);
