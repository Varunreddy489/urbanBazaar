export interface AdminRegisterData {
  email: string;
  password: string;
}

export interface AdminAuthTypes {
  id?: string;
  email: string;
  name?: string;
  password: string;
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
  brand: string;
  dimensions?: string;
  quantity: number;
}

export interface UserTypes {
  _id?: string;
  name: string;
  username: string;
  email: string;
  gender?: "male" | "female";
  profilePic?: string;
  address?: AddressTypes[];
  orders: OrderTypes[];
}

export interface OrderTypes {
  _id?: string;
  productId: ProductTypes;
  userId: UserTypes;
  address: AddressTypes;
  quantity: number;
  status?: string;
  totalPrice?: number;
  date: string;
}

export interface AddressTypes {
  userId?: string;
  streetName?: string;
  pincode: number;
  localityName: string;
  city: string;
  state: string;
}
