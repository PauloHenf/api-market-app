export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  discountPercentage: number;
  created_at: Date;
  updated_at: Date;
}
