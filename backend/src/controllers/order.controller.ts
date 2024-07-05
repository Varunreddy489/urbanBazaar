import { Request, Response } from "express";
import { authModel } from "../models/authModel";
import { productModel } from "../models/productModel";
import { orderModel } from "../models/orderModel";

export const addOrder = async (req: Request, res: Response) => {
    try {
        const { productId, userId, userAddress, quantity } = req.body;

        if (!productId || !userId || !userAddress) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const product = await productModel.findById(productId);
        const user = await authModel.findById(userId);

        if (!product || !user) {
            return res.status(402).json({ message: "Invalid product or user" });
        }

        const totalPrice = product.price * quantity;
        const status = req.body.status || 'pending';

        const newOrder = new orderModel({
            productId,
            userId,
            userAddress,
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

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderModel.find({}).populate("productId").populate("userId")
        return res.status(200).json({ orders })
    } catch (error) {
        console.log("Error in getOrders:", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id
        const order = await orderModel.findById(orderId).populate("productId").populate("userId")
        return res.status(200).json({ order })

    } catch (error) {
        console.log("Error in getOrderById:", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}