import { Request, Response } from "express";

import { userModel } from "../models/userModel";
import { orderModel } from "../models/orderModel";
import { addressModel } from "../models/addressModel";
import { productModel } from "../models/productModel";

export const addOrder = async (req: Request, res: Response) => {
    try {
        const { productId, userId, address, quantity } = req.body;

        if (!productId || !userId || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const product = await productModel.findById(productId);
        const user = await userModel.findById(userId);

        if (!product || !user) {
            return res.status(402).json({ message: "Invalid product or user" });
        }

        const isAddress = await addressModel.findOne(address)

        if (!isAddress) return res.status(400).send("Invalid address")

        const totalPrice = product.price * quantity;
        const status = req.body.status || 'pending';

        const newOrder = new orderModel({
            productId,
            userId,
            address,
            quantity,
            status,
            totalPrice
        });

        await newOrder.save();

        return res.status(201).json({ newOrder });
    } catch (error) {
        console.log("error in addOrder:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderModel.find({}).populate("productId").populate("userId")
        return res.status(200).json({ orders })
    } catch (error) {
        console.log("Error in getOrders:", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const orders = await orderModel.find({ userId }).populate("productId")

        if (!orders) {
            return res.status(404).json({ message: "No orders found for this user" })
        }

        return res.status(200).json({ orders })

    } catch (error) {
        console.log("Error in getOrderById:", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

