import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { cartModel } from '../models/cartModel';
import { userModel } from '../models/userModel';
import { productModel } from '../models/productModel';
import { cartItemTypes, cartTypes, ProductTypes } from '../types/types';
import { CartItemWithProductDetails } from '../../../frontend/src/types/types';

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { productId, userId } = req.params;
        const quantity = parseInt(req.body.quantity) || 1;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }

        const product = await productModel.findById(productObjectId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = cart.items.find(item => item.productId.equals(productObjectId));
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.items.push({ productId: productObjectId, quantity });
        }

        await cart.save();

        return res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getCartProducts = async (req: Request, res: Response) => {
    try {
        const carts: cartTypes[] = await cartModel.find({}).populate({
            path: 'items.productId',
            model: 'product'
        });

        const filteredProducts = carts.map((cart: cartTypes) => ({
            ...cart.toObject(),
            items: cart.items.filter((item: cartItemTypes) => item.quantity > 0)
        }));

        return res.status(200).json(filteredProducts);
    } catch (error) {
        console.log("Error in getCartProducts", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCartByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" })
        }

        const cartProducts = await cartModel.find({ userId }).populate({
            path: 'items.productId',
            model: 'product'
        })
        res.status(200).json({ "cartItems": cartProducts })

    } catch (error) {
        console.error("Error in getCartByUserId:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.params;
        const quantity = parseInt(req.body.quantity);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid productId" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const cartItem = cart.items.find(item => item.productId.equals(productObjectId));

        if (!cartItem) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        cartItem.quantity = Math.max(cartItem.quantity + quantity, 0);

        await cart.save();

        return res.status(200).json({ cart });

    } catch (error) {
        console.log("error in updateCart", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const removeItem = async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const cart = await cartModel.findByIdAndUpdate(cartId);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart deleted successfully", cart });
    } catch (error) {
        console.log("Error in removeCart:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};