export interface ProductTypes {
    _id?: string;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    rating: string
}

export interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthUserTypes {
    id: string;
    name: string,
    username: string,
    email: string,
    password?: string,
    profilePic?: string,
}

export interface CartTypes{
    
}