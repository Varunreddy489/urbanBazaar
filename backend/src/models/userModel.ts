import mongoose from "mongoose";
import { AuthTypes } from "../types/types";

const userSchema = new mongoose.Schema<AuthTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  },
  { timestamps: true }
);

export const userModel = mongoose.model<AuthTypes>("user", userSchema);
