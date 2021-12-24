export interface Proposal{
    _id: string;
    seller_id: string;
    product_id: string;
    price: number;
    shipping: number;
    stock: number;
    maxPerPurchase: number;
    special_conditions: string;
}