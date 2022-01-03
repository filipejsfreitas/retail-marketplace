import { CreateCartItemDto, UpdateCartItemDto } from '../dtos/cartItem.dto';
import { CartItem } from '../interfaces/cartItem.interface';
import { Proposal } from '../interfaces/proposal.interface';
import { CartItemModel } from '../models/cartItem.model';
import { ProposalModel } from '../models/proposal.model';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';
import { ProductModel } from '../models/product.model';
import { Product } from '../interfaces/product.interface';
import { Address } from '../interfaces/address.interface';
import { AddressModel } from '../models/address.model';
import { ClientInvoiceModel } from '../models/clientInvoice.model';
import { SellerInvoiceModel } from '../models/sellerInvoice.model';

export class CartItemService {
  public proposals = ProposalModel;
  public products = ProductModel;
  public cartItems = CartItemModel;
  public addresses = AddressModel;
  public clientInvoices = ClientInvoiceModel;
  public sellerInvoices = SellerInvoiceModel;

  public async addItem(item: CreateCartItemDto, clientId: string): Promise<CartItem> {
    console.log('função');
    if (isEmpty(item)) throw new HttpException(400, 'Invalid Item');

    const alreadyInCart: CartItem = await this.cartItems.findOne({ client_id: clientId, proposal_id: item.proposal_id });
    console.log('função2');
    if (alreadyInCart) {
      throw new HttpException(400, 'Item already in cart');
    }
    const prop: Proposal = await this.proposals.findById(item.proposal_id);
    console.log('função3');
    if (!prop) {
      throw new HttpException(400, 'Invalid proposal');
    }
    console.log('função4');
    if (item.quantity > prop.maxPerPurchase) {
      throw new HttpException(400, 'Invalid product quantity');
    }

    if (item.quantity > prop.stock) {
      throw new HttpException(400, 'Unsuficient stock to satisfy request');
    }

    const prod: Product = await this.products.findOne({ _id: prop.product_id, forSale: true });

    if (!prod) {
      throw new HttpException(400, 'Invalid product, or product not for sale');
    }

    const cartItem: CartItem = await this.cartItems.create({
      product_id: prod._id,
      name: prod.name,
      client_id: clientId,
      proposal_id: prop._id,
      price: prop.price,
      shipping: prop.shipping,
      image: prod.images[0],
      quantity: item.quantity,
      locked: false,
      timestamp: new Date(),
      seller_id: prop.seller_id,
      special_conditions: prop.special_conditions,
    });

    return cartItem;
  }

  public async updateItem(item: UpdateCartItemDto, clientId: string, cartItem_id: string): Promise<CartItem> {
    if (isEmpty(item)) throw new HttpException(400, 'Invalid Item');

    const oldItem: CartItem = await this.cartItems.findOne({ _id: cartItem_id, client_id: clientId });

    const prop: Proposal = await this.proposals.findById(oldItem.proposal_id);

    if (!prop) {
      throw new HttpException(400, 'Invalid proposal');
    }

    if (item.quantity > prop.maxPerPurchase) {
      throw new HttpException(400, 'Invalid product quantity');
    }

    if (item.quantity > prop.stock) {
      throw new HttpException(400, 'Unsuficient stock to satisfy request');
    }

    const cartItem: CartItem = await this.cartItems.findOneAndUpdate(
      { _id: cartItem_id, client_id: clientId },
      { quantity: item.quantity, locked: false, timestamp: new Date() },
      { new: true },
    );

    return cartItem;
  }

  public async deleteCartItem(clientId: string, cartItem_id: string): Promise<CartItem> {
    const cartItem: CartItem = await this.cartItems.findOneAndDelete({ _id: cartItem_id, client_id: clientId });

    return cartItem;
  }

  public async getCartItem(clientId: string, cartItem_id: string): Promise<CartItem> {
    const cartItem: CartItem = await this.cartItems.findOne({ _id: cartItem_id, client_id: clientId });

    return cartItem;
  }

  public async getClientCartItems(clientId: string): Promise<CartItem[]> {
    const cartItems: CartItem[] = await this.cartItems.find({ client_id: clientId });

    return cartItems;
  }

  public async lockClientItems(clientId: string) {
    setTimeout( () =>  this.unlockItems(clientId).then(), 900000)

    console.log('função');
    const date: Date = new Date();

    const itemList: CartItem[] = await this.cartItems.find({ client_id: clientId, locked: false });

    const props = [];

    itemList.forEach(element => {
      props.push(this.proposals.findById(element.proposal_id));
    });

    Promise.all(props).then(propsArray => {
      console.log(propsArray);

      for (let index = 0; index < itemList.length; index++) {
        if (itemList[index].quantity > propsArray[index].stock) {
          throw new HttpException(400, 'Unsuficient stock to satisfy request of product' + itemList[index].name);
        }
      }

      this.cartItems.updateMany({ client_id: clientId }, { locked: true }).then(res => {
        console.log(res);

        const propsmodified = [];

        for (let index = 0; index < itemList.length; index++) {
          const id = propsArray[index]._id.toString();
          propsmodified.push(this.proposals.findOneAndUpdate({ _id: id }, { $inc: { stock: -1 * itemList[index].quantity } }, { new: true }));
        }

        Promise.all(propsmodified)
          .then(results => {
            console.log(results);
            return results;
          })
          .catch(function (err) {
            console.log(err.message); // some coding error in handling happened
          });
      });
    });

    console.log('falhou');
  }

  public async concludePurchase(clientId: string, address_id: string) {
    const address: Address = await this.addresses.findOne({ _id: address_id, client_id: clientId });
    const itemList: CartItem[] = await this.cartItems.find({ client_id: clientId, locked: true });

    const addressForInvoice = {
      nif: address.nif,
      address: address.address,
      postal_code: address.postal_code,
      name: address.name,
      contact: address.contact,
    };

    const clientItems = [];

    let clientTotal = 0;

    const sellersItem = new Object();

    const date = Date();

    itemList.forEach(element => {
      clientTotal += element.quantity * (element.price + element.shipping);

      clientItems.push({
        quantity: element.quantity,
        price: element.price,
        shipping: element.shipping,
        product_id: element.product_id,
        proposal_id: element.proposal_id,
        seller_id: element.seller_id,
        state: 'indefinido',
        special_conditions: element.special_conditions,
      });

      if (sellersItem[element.seller_id]) {
        sellersItem[element.seller_id].push({
          quantity: element.quantity,
          price: element.price,
          shipping: element.shipping,
          product_id: element.product_id,
          proposal_id: element.proposal_id,
        });
      } else {
        sellersItem[element.seller_id] = [
          {
            quantity: element.quantity,
            price: element.price,
            shipping: element.shipping,
            product_id: element.product_id,
            proposal_id: element.proposal_id,
          },
        ];
      }
    });

    const clientInvoice = await this.clientInvoices.create({
      client_id: clientId,
      date: date,
      address: addressForInvoice,
      total: clientTotal,
      items: clientItems,
    });

    const sellersInvoice = [];

    for (const key of Object.keys(sellersItem)) {
      const sellerItems = [];
      let sellerTotal = 0;
      for (let index = 0; index < sellersItem[key].length; index++) {
        sellerTotal += sellersItem[key][index].quantity * (sellersItem[key][index].shipping + sellersItem[key][index].price);
        sellerItems.push(sellersItem[key][index]);
      }
      sellersInvoice.push(
        this.sellerInvoices.create({
          date: date,
          invoice_id: clientInvoice._id,
          seller_id: key,
          total: sellerTotal,
          address: addressForInvoice,
          items: sellerItems,
          state: 'indefinido',
        }),
      );
    }

    await this.cartItems.deleteMany({ client_id: clientId, locked: true });

    Promise.all(sellersInvoice).then(res => {
      return;
    });

    return;
  }

  public async unlockItems(clientId: string) {
    const itemList = await this.cartItems.find({ client_id: clientId, locked: true });
    console.log(itemList);

    const props = [];

    itemList.forEach(element => {
      props.push(this.proposals.findByIdAndUpdate(element.proposal_id, { $inc: { stock: element.quantity } }, { new: true }));
    });

    Promise.all(props).then(propsArray => {
      const cartsModified = [];
      console.log("primeiro promise all")
      console.log(propsArray);
      for (let index = 0; index < itemList.length; index++) {
        cartsModified.push(
          this.cartItems.findByIdAndUpdate(itemList[index]._id, {
            locked: false,
            price: propsArray[index].price,
            shipping: propsArray[index].shipping,
            special_conditions: propsArray[index].special_conditions,
          }),
        );
      }

      Promise.all(cartsModified).then(cartArray => {
        console.log("segundo promise all")
        console.log(cartArray)
        return;
      });
    });
  }
}
