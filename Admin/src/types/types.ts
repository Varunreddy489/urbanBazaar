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
    _id?: string;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    rating: string
}