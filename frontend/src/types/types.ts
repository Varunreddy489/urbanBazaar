export interface ProductTypes {
  _id?: string
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
}


export interface CartItem {
    productId: string;
    quantity: number;
    _id: string;
  }
  
  export interface cartTypes {
    _id: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    __v: number;
  }
  
  export interface CartItemWithProductDetails extends CartItem {
    productDetails: ProductTypes;
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
