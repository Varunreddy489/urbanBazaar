import mongoose, { Document, Types } from 'mongoose';

export interface authTypes {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
    profilePic: string;
}

export interface addressTypes {
    streetName: string;
    pincode: number;
    localityName: string;
    city: string;
    state: string;
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
    productId: Types.ObjectId;
    userId: Types.ObjectId;
    userAddress: {
        streetName: string;
        pincode: number;
        localityName: string;
        city: string;
        state: string;
    };
    quantity: number;
    status: string;
    totalPrice: number;
    date: Date;
}