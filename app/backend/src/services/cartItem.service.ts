import { CreateCartItemDto, UpdateCartItemDto } from "@/dtos/cartItem.dto";
import { CartItem } from "@/interfaces/cartItem.interface";
import { Proposal } from "@/interfaces/proposal.interface";
import { CartItemModel } from "@/models/cartItem.model";
import { ProposalModel } from "@/models/proposal.model";
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { ProductModel } from "@/models/product.model";
import { Product } from "@/interfaces/product.interface";

export class CartItemService {
    public proposals = ProposalModel;
    public products = ProductModel;
    public cartItems = CartItemModel;

    public async addItem(item:CreateCartItemDto, client_id: string): Promise<CartItem>{
        if (isEmpty(item)) throw new HttpException(400, "Invalid Item");

        const alreadyInCart : CartItem = await this.cartItems.findOne({client_id: client_id,proposal_id: item.proposal_id});

        if(alreadyInCart){
            throw new HttpException(400, "Item already in cart");
        }
        const prop: Proposal = await this.proposals.findById(item.proposal_id);

        if(!(prop)){
            throw new HttpException(400, "Invalid proposal");
        }

        if(item.quantity > prop.maxPerPurchase){
            throw new HttpException(400, "Invalid product quantity");
        }

        if(item.quantity > prop.stock){
            throw new HttpException(400, "Unsuficient stock to satisfy request");
        }

        const prod : Product = await this.products.findById(prop.product_id);

        const cartItem :  CartItem = await this.cartItems.create({product_id: prod._id, name: prod.name, client_id: client_id,
                                                                proposal_id: prop._id, price: prop.price, shipping: prop.shipping,
                                                                image: prod.images[0], quantity: item.quantity, locked: false, timestamp:new Date() });

        return cartItem;
    }

    public async updateItem(item: UpdateCartItemDto, client_id: string, cartItem_id: string): Promise<CartItem>{
        if (isEmpty(item)) throw new HttpException(400, "Invalid Item");

        const oldItem : CartItem = await this.cartItems.findOne({_id:cartItem_id, client_id: client_id});




        const prop: Proposal = await this.proposals.findById(oldItem.proposal_id);

        if(!(prop)){
            throw new HttpException(400, "Invalid proposal");
        }

        if(item.quantity > prop.maxPerPurchase){
            throw new HttpException(400, "Invalid product quantity");
        }

        if(item.quantity > prop.stock){
            throw new HttpException(400, "Unsuficient stock to satisfy request");
        }

        const cartItem :  CartItem = await this.cartItems.findOneAndUpdate({_id:cartItem_id,client_id: client_id},{ quantity: item.quantity, locked: false, timestamp:new Date() },{new:true});

        return cartItem;
    }

    public async deleteCartItem(client_id: string, cartItem_id: string):Promise<CartItem>{
        const cartItem: CartItem = await this.cartItems.findOneAndDelete({_id:cartItem_id, client_id: client_id});

        return cartItem;
    }

    public async getCartItem(client_id: string, cartItem_id: string):Promise<CartItem>{
        const cartItem: CartItem = await this.cartItems.findOne({_id:cartItem_id, client_id: client_id});

        return cartItem;
    }

    public async getClientCartItems(client_id: string):Promise<CartItem []>{
        const cartItems: CartItem []= await this.cartItems.find({ client_id: client_id});

        return cartItems;
    }

    public async lockClientItems(client_id:string){
        const date : Date = new Date();

        const itemList: CartItem[] = await this.cartItems.find({client_id:client_id});

        var propIds : string[] = [];
        var props : Proposal[] = [];
        /*
        itemList.forEach(element => {
            const prop = await this.proposals.findById(element.proposal_id);
            if(element.quantity > prop.stock){
                throw new HttpException(400, "Unsuficient stock to satisfy request");
            }
            
        });
        */
        return itemList;
    }

}