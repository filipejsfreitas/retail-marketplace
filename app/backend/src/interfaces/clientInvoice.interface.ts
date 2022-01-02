export interface ClientInvoice {
  _id: string;
  clientId: string;
  date: Date;
  total: number;
  address: { nif: string; address: string; postal_code: string; name: string; contact: string };
  items: Array<{
    quantity: number;
    price: number;
    shipping: number;
    productId: string;
    proposal_id: string;
    sellerId: string;
    state: string;
    special_conditions: string;
  }>;
}
