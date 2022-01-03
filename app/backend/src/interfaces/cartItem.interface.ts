export interface CartItem {
  _id: string;
  productId: string;
  clientId: string;
  proposal_id: string;
  price: number;
  timestamp: Date;
  image: string;
  quantity: number;
  name: string;
  locked: boolean;
  shipping: number;
  sellerId: string;
  special_conditions: string;
}
