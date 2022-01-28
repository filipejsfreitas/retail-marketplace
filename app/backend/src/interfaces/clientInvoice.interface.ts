export interface ClientInvoice {
  _id: string;
  client_id: string;
  date: Date;
  total: number;
  address: { nif: string; address: string; postal_code: string; name: string; contact: string };
  items: Array<{
    quantity: number;
    price: number;
    shipping: number;
    product_id: string;
    proposal_id: string;
    seller_id: string;
    state: string;
    special_conditions: string;
  }>;
}
