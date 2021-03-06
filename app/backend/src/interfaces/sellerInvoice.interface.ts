export interface SellerInvoice {
  _id: string;
  seller_id: string;
  invoice_id: string;
  date: Date;
  total: number;
  address: { nif: string; address: string; postal_code: string; name: string; contact: string };
  state: 'processing' | 'sent' | 'finished';
  items: [{ quantity: number; price: number; shipping: number; productId: string; proposal_id: string; special_conditions: string }];
}
