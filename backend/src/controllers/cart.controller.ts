import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { cartModel } from '../models/cartModel';
import { productModel } from '../models/productModel';
import { cartItemTypes, cartTypes } from '../types/types';

export const addToCart = async (req: Request, res: Response) => {
    try {

        const productId = req.params.productId;
        const quantity = parseInt(req.body.quantity) || 1;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        let cart = await cartModel.findOne();

        if (!cart) {
            cart = new cartModel({ items: [], totalPrice: 0 });
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

        cart.totalPrice += product.price * quantity;

        await cart.save();

        return res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getCartProducts = async (req: Request, res: Response) => {
    try {
        const carts: cartTypes[] = await cartModel.find({});

        const filteredProducts = carts.map((cart: cartTypes) => ({
            ...cart.toObject(),
            items: cart.items.filter((item: cartItemTypes) => item.quantity > 0)
        }));

        console.log("Filtered Products:", filteredProducts);

        return res.status(200).json(filteredProducts);
    } catch (error) {
        console.log("Error in getCartProducts", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateCart = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { count } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid productId" });
        }

        const cart = await cartModel.findOne();
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const cartItem = cart.items.find(item => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        cartItem.quantity += parseInt(count);

        if (cartItem.quantity < 0) {
            cartItem.quantity = 0;
        }

        await cart.save();
        return res.status(200).json(cart);

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