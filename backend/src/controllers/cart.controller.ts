import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { cartModel } from '../models/cartModel';
import { productModel } from '../models/productModel';
import { cartItemTypes, cartTypes } from '../types/types';

export const addToCart = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId; // Assuming userId is sent in the request body
        const productId = req.params.productId;
        const quantity = req.body.quantity || 1; // Default quantity to 1 if not provided

        // Validate the productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        // Convert userId and productId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Find the cart for the user, or create a new one if it doesn't exist
        let cart = await cartModel.findOne({ userId: userObjectId });

        if (!cart) {
            cart = new cartModel({ userId: userObjectId, items: [], totalPrice: 0 });
        }

        // Check if the product exists in the cart
        const product = await productModel.findById(productObjectId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = cart.items.find(item => item.productId.equals(productObjectId));
        if (cartItem) {
            // Product exists in the cart, update the quantity
            cartItem.quantity += quantity;
        } else {
            // Product does not exist in the cart, add it
            cart.items.push({ productId: productObjectId, quantity });
        }

        // Update the total price
        cart.totalPrice += product.price * quantity;

        // Save the cart
        await cart.save();

        return res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getCartProducts = async (req: Request, res: Response) => {
    try {
        const products = await cartModel.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log("error in getCartProducts");
        return res.status(500).json({ error: "Internal Server Error" })

    }
}

export const updateCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.params;
        const { count } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid productId" });
        }

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const cartItem = cart.items.find(item => item.productId.toString() === productId);

        if (!cartItem) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        if (count === 0) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        } else {
            cartItem.quantity = count;
        }

        let totalPrice = 0;
        for (const item of cart.items) {
            const product = await productModel.findById(item.productId);
            if (product) {
                totalPrice += product.price * item.quantity;
            }
        }
        cart.totalPrice = totalPrice;


        await cart.save();

        return res.status(200).json(cart);

    } catch (error) {
        console.log("error in updateCart", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const removeItem = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid productId" });
        }

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        let totalPrice = 0;
        for (const item of cart.items) {
            const product = await productModel.findById(item.productId);
            if (product) {
                totalPrice += product.price * item.quantity;
            }
        }
        cart.totalPrice = totalPrice;

        await cart.save();

        return res.status(200).json(cart);

    } catch (error) {
        console.log("error in removeItem", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};