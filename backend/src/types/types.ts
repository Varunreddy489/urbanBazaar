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

export interface adminAuthTypes {
    name: string
    email: string;
    password: string;
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
    productId: Types.ObjectId;
    quantity: number;
}

export interface cartTypes extends Document {
    userId: Types.ObjectId;
    items: cartItemTypes[];
    totalPrice: number;
}
