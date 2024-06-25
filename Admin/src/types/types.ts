export interface AdminRegisterData {
    email: string;
    password: string
}


export interface AdminAuthTypes {
    id?: string
    email: string;
    name?: string;
    password: string
}

export interface ProductTypes {
    _id?: string
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
}

export interface UserTypes {
    _id?: string;
    name: string;
    username: string;
    email: string;
    gender?: "male" | "female";
    profilePic?: string
}