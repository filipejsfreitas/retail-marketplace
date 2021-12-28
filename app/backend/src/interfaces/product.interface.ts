export interface Characteristic{
    name: string;
    value: string;
}


export interface CommentChecker{
    title: string;
    score: number;
    comment: string; 
    date: Date; 
    client_id: string;
    name: string;
}

export interface CommentProduct{
    _id: string;
    title: string;
    score: number;
    comment: string; 
    date: Date; 
    client_id: string;
    name: string;
}

export interface Product{
    _id: string;
    category_id: string;
    description: string;
    score: number;
    number_scores: number;
    name: string;
    number_views: number;
    images: Array<string>,
    characteristic: Array<{name:string,value:string}>;
    tecnical: Array<string>,
    best_price: number;
    comments: Array<CommentProduct>;
    forSale: boolean;
}