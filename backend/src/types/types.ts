import mongoose, { Document, Schema, Types } from 'mongoose';

export interface authTypes {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
    profilePic: string;
    orders: number;
}

export interface adminAuthTypes {
    name: string
    email: string;
    password: string;
}

export interface productTypes {
    title: string;
    description: string;
    originalPrice: number;
    discount: number;
    discountedPrice: number;
    category: string;
    image: string;
    rating: number;
    availability: boolean;
    brand: string;
    dimensions: string;
    quantity: number;
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
