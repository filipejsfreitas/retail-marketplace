export interface SellerComment {
  _id: string;
  clientId: string;
  sellerId: string;
  date: Date;
  rating: number;
  shipping_rating: number;
  support_rating:number;
}
