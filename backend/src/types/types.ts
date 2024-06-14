import mongoose, { Document, Schema, Types } from 'mongoose';

export interface authTypes {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
    profilePic: string;
}

export interface productTypes {
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    rating: number
}

export interface cartItemTypes {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface cartTypes {
    userId: mongoose.Schema.Types.ObjectId;
    items: cartItemTypes[];
    totalPrice: number;
}
