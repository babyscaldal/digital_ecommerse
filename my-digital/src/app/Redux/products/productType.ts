interface IRating {
  rate: number;
  count: number;
}

export interface IProductResponse {
  id: number;
  categoryId: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  rating: IRating;
  totalPrice?: number;
  quantity: number;
}

export interface IComments {
  createdAt?: string;
  updateAt?: string;
  productId: number;
  content: string;
  rate: string;
  id?: number;
  username: string;
}
