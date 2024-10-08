import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { userModel } from "../models/userModel";
import { adminModel } from "../models/adminModel";
import generateTokenAndSetCookie from "../utils/genToken";
import { orderModel } from "../models/orderModel";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "Inadequate Data" });
    }
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: "Admin Does not Exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    const token = generateTokenAndSetCookie(admin._id, res);

    res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });

    console.log("Token:", token);
  } catch (error: any) {
    console.error("Error in adminLogin:", error.message);
    console.log("Error in adminLogin:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("error in logout:", error.message);
    res.status(404).json({ error: "internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel
      .find()
      .populate("address")
      .populate({
        path: "orders",
        model: "order",
      })
      .exec();

    return res.status(200).json(users);
  } catch (error: any) {
    console.log("error in getAllUsers:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isUserExists = await userModel.findById(id);

    if (!isUserExists) {
      return res.status(404).json({ error: "User Does not exist" });
    }

    const user = await userModel.findById(id);
    return res.status(200).json(user);
  } catch (error: any) {
    console.log("error in get user:", error.message);
    res.status(404).json({ error: "internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isUserExists = await userModel.findById(id);

    if (!isUserExists) {
      return res.status(404).json({ error: "User Does not exist" });
    }

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ eror: "user not found" });
    }
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.log("error in deleteuser", error.message);
    res.status(404).json({ error: "internal server error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("productId")
      .populate("userId");
    return res.status(200).json({ orders });
  } catch (error) {
    console.log("Error in getOrders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
