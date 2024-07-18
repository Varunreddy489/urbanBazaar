export interface UserTypes {
  _id?: string;
}

export interface ProductTypes {
  _id?: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  rating: number;
  availability: boolean;
  brand: string;
  dimensions: string;
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
  _id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  profilePic?: string;
}

export interface CartItem {
  _id?: string;
  userId?: string;
  productId: string;
  quantity: number;
}

export interface cartTypes {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  __v: number;
}

export interface CartItemWithProductDetails extends CartItem {
  productDetails: ProductTypes;
}

export interface AddressTypes {
  streetName: string;
  pincode: number;
  localityName: string;
  city: string;
  state: string;
}

export interface OrderTypes {
  _id: string;
  productId: ProductTypes;
  userId: string;
  address: AddressTypes;
  quantity: number;
  status?: string;
  totalPrice?: number;
}
