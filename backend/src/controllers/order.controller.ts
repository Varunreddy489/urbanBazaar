import { Request, Response } from "express";

import { userModel } from "../models/userModel";
import { orderModel } from "../models/orderModel";
import { addressModel } from "../models/addressModel";
import { productModel } from "../models/productModel";

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { productId, userId, address, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId fields are required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "userId fields are required" });
    }
    if (!address) {
      return res.status(400).json({ message: "address fields are required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await productModel.findById(productId);
    const user = await userModel.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ message: "Invalid product or user" });
    }

    const isAddress = await addressModel.findOne(address);

    if (!isAddress) return res.status(400).send("Invalid address");

    const totalPrice = product.price * quantity;
    const status = req.body.status || "pending";

    const newOrder = new orderModel({
      productId,
      userId,
      address,
      quantity,
      status,
      totalPrice,
});

    await newOrder.save();

    user.orders.push(newOrder._id);
    await user.save();

    return res.status(201).json({ newOrder });
  } catch (error) {
    console.log("error in addOrder:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await orderModel.find({ userId }).populate("productId");

    if (!orders) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    console.log("Error in getOrderById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
