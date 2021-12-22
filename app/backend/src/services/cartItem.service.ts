import { CreateCartItemDto, UpdateCartItemDto } from "@/dtos/cartItem.dto";
import { CartItem } from "@/interfaces/cartItem.interface";
import { Proposal } from "@/interfaces/proposal.interface";
import { CartItemModel } from "@/models/cartItem.model";
import { ProposalModel } from "@/models/proposal.model";
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { ProductModel } from "@/models/product.model";
import { Product } from "@/interfaces/product.interface";
import { Address } from "@/interfaces/address.interface";
import { AddressModel } from "@/models/address.model";
import { ClientInvoiceModel } from "@/models/clientInvoice.model";
import { SellerInvoiceModel } from "@/models/sellerInvoice.model";

export class CartItemService {
    public proposals = ProposalModel;
    public products = ProductModel;
    public cartItems = CartItemModel;
    public addresses = AddressModel;
    public clientInvoices = ClientInvoiceModel;
    public sellerInvoices = SellerInvoiceModel;

    public async addItem(item:CreateCartItemDto, client_id: string): Promise<CartItem>{
        console.log("função");
        if (isEmpty(item)) throw new HttpException(400, "Invalid Item");

        const alreadyInCart : CartItem = await this.cartItems.findOne({client_id: client_id,proposal_id: item.proposal_id});
        console.log("função2");
        if(alreadyInCart){
            throw new HttpException(400, "Item already in cart");
        }
        const prop: Proposal = await this.proposals.findById(item.proposal_id);
        console.log("função3");
        if(!(prop)){
            throw new HttpException(400, "Invalid proposal");
        }
        console.log("função4");
        if(item.quantity > prop.maxPerPurchase){
            throw new HttpException(400, "Invalid product quantity");
        }

        if(item.quantity > prop.stock){
            throw new HttpException(400, "Unsuficient stock to satisfy request");
        }

        const prod : Product = await this.products.findOne({_id:prop.product_id, forSale:true});


        const cartItem :  CartItem = await this.cartItems.create({product_id: prod._id, name: prod.name, client_id: client_id,
                                                                proposal_id: prop._id, price: prop.price, shipping: prop.shipping,
                                                                image: prod.images[0], quantity: item.quantity, locked: false, 
                                                                timestamp:new Date(), seller_id: prop.seller_id, special_conditions: prop.special_conditions});

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
        console.log("função");
        const date : Date = new Date();

        const itemList: CartItem[] = await this.cartItems.find({client_id:client_id, locked: false});

        var props = [];

        itemList.forEach(element => {
            props.push(this.proposals.findById(element.proposal_id));
        });

        Promise.all(props).then( (propsArray) =>{

            console.log(propsArray);

            for (let index = 0; index < itemList.length; index++) {
                
                if(itemList[index].quantity > propsArray[index].stock){
                    throw new HttpException(400, "Unsuficient stock to satisfy request of product" + itemList[index].name);
                }
            }

            this.cartItems.updateMany({client_id:client_id}, {locked: true}).then((res) => {
                console.log(res);

                var propsmodified = [];



                for (let index = 0; index < itemList.length; index++) {
                    var id = propsArray[index]._id.toString()
                    propsmodified.push(this.proposals.findOneAndUpdate({_id: id}, { $inc: { stock: (-1 * itemList[index].quantity) } },{new:true} ))      
                }

                Promise.all(propsmodified).then((results) => {
                    console.log(results);
                    return results;
                })
                .catch(function(err) {
                    console.log(err.message); // some coding error in handling happened
                  });
            });      
        })

        console.log("falhou");
    }

    public async concludePurchase(client_id: string, address_id: string){
        const address: Address = await this.addresses.findOne({_id:address_id, client_id:client_id});
        const itemList: CartItem[] = await this.cartItems.find({client_id:client_id, locked: true});

        const addressForInvoice = {nif: address.nif, address: address.address, postal_code: address.postal_code,
                                     name: address.name, contact: address.contact};

        var clientItems = [];

        var clientTotal = 0;

        var sellersItem = new Object();

        var date = Date();

        itemList.forEach(element => {
            clientTotal += element.quantity * (element.price + element.shipping);

            clientItems.push({quantity: element.quantity, price: element.price, shipping: element.shipping,
                            product_id: element.product_id, proposal_id: element.proposal_id, seller_id: element.seller_id, state:"indefinido", special_conditions: element.special_conditions});
            
            if(sellersItem[element.seller_id]){
                sellersItem[element.seller_id].push({quantity: element.quantity, price: element.price, shipping: element.shipping,
                                                product_id: element.product_id, proposal_id: element.proposal_id, state:"indefinido"});
            }else{
                sellersItem[element.seller_id] = [{quantity: element.quantity, price: element.price, shipping: element.shipping,
                    product_id: element.product_id, proposal_id: element.proposal_id, state:"indefinido"}];
            }
        });

        const clientInvoice  =  await this.clientInvoices.create({client_id: client_id,date:date, address:addressForInvoice, 
                                                        total: clientTotal,items: clientItems});

        var sellersInvoice = []

        for (const key of Object.keys(sellersItem)) {
            var sellerItems = [];
            var sellerTotal = 0;
            for (let index = 0; index <sellersItem[key].length; index++) {
                sellerTotal += sellersItem[key][index].quantity * (sellersItem[key][index].shipping + sellersItem[key][index].price);
                sellerItems.push(sellersItem[key][index]);
            }
            sellersInvoice.push(this.sellerInvoices.create({date: date, invoice_id:clientInvoice._id,seller_id: key,
                                                            total: sellerTotal, address: addressForInvoice, items: sellerItems }));
        }

        await this.cartItems.deleteMany({client_id:client_id, locked: true});



        Promise.all(sellersInvoice).then((res) => {
            return;
        })

        return;
    }

    public async unlockItems(client_id: string){
        const itemList = await this.cartItems.find({client_id:client_id, locked: true});

        var props = [];

        itemList.forEach(element => {
            props.push(this.proposals.findById(element.proposal_id));
        });

        Promise.all(props).then( (propsArray) =>{

            var cartsModified = [];

            for (let index = 0; index < itemList.length; index++) {
                cartsModified.push(this.cartItems.findByIdAndUpdate(itemList[index]._id, {locked: false, price: propsArray[index].price, 
                                                                    shipping: propsArray[index], special_conditions: propsArray[index].special_conditions}));
            }

            Promise.all(cartsModified).then( (cartArray) =>{

                return;
            })
        });

        


    }

}