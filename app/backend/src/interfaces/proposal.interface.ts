export interface Proposal {
  _id: string;
  sellerId: string;
  productId: string;
  price: number;
  shipping: number;
  stock: number;
  maxPerPurchase: number;
  special_conditions: string;
}
