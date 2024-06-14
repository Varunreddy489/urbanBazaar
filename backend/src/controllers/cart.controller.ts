import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { cartModel } from '../models/cartModel';
import { productModel } from '../models/productModel';
import { cartItemTypes, cartTypes } from '../types/types';

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params

    } catch (error) {

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