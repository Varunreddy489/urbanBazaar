import mongoose, { Document, Types } from 'mongoose';

export interface authTypes {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
    profilePic: string;
    orders: number;
    address: string;
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

export interface orderTypes {
    userId: Types.ObjectId;
    items: cartItemTypes[];
    totalPrice: number;
    address: string;
    paymentMethod: string;
    status: string;
    date: Date;
}