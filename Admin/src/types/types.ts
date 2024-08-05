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
  discount?: number;
  discountedPrice?: number;
  category: string;
  image: string;
  rating: number;
  availability?: boolean;
  brand?: string;
  dimensions?: string;
}

export interface UserTypes {
  _id?: string;
  name: string;
  username: string;
  email: string;
  gender?: "male" | "female";
  profilePic?: string;
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
  streetName: string;
  pincode: number;
  localityName: string;
  city: string;
  state: string;
}
