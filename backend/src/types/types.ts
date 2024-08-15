import mongoose, { Document, Types } from "mongoose";

export interface AuthTypes {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  username: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: "male" | "female";
  profilePic: string;
  address?: AddressTypes;
  orders?: mongoose.Types.ObjectId[];
}


export interface AddressTypes {
  userId?: string;
  streetName: string;
  pincode: number;
  localityName: string;
  city: string;
  state: string;
}

export interface adminAuthTypes {
  name: string;
  email: string;
  password: string;
}

export interface ProductTypes {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  image: string;
  rating: number;
  availability: boolean;
  brand?: string;
  dimensions?: string;
  quantity: number;
}

export interface CartItemWithProductDetails {
  _id?: Types.ObjectId;
  userId: string;
  productId: string;
  quantity: number;
  productDetails: ProductTypes;
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

export interface OrderTypes {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  address: {
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
