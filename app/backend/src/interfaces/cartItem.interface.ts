export interface CartItem {
  _id: string;
  product_id: string;
  client_id: string;
  proposal_id: string;
  price: number;
  timestamp: Date;
  image: string;
  quantity: number;
  name: string;
  locked: boolean;
  shipping: number;
  seller_id: string;
  special_conditions: string;
}
