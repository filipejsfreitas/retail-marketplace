import { ProposalModel } from '../models/proposal.model';
import { Proposal } from '../interfaces/proposal.interface';
import { CreateProposalDto, UpdateProposalDto } from '../dtos/proposal.dto';
import { HttpException } from '../exceptions/HttpException';
import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';
import { CartItemModel } from '../models/cartItem.model';

export class ProposalService {
  public proposals = ProposalModel;
  public products = ProductModel;
  public cartItems = CartItemModel;

  public async createProposal(prop: CreateProposalDto, seller: string): Promise<Proposal> {
    if (await this.alreadyExists(prop.product_id, seller)) {
      throw new HttpException(400, 'You already have a proposal on this product');
    }
    const proposal: Proposal = await this.proposals.create({ ...prop, seller_id: seller });
    await this.updateBestPrice(prop.product_id);
    /*
        const product : Product = await this.products.findById({_id: prop.productId})
        if(product.best_price < (prop.price + prop.shipping)){
            const Prod : Product = await this.products.findByIdAndUpdate({_id: prop.productId},{best_price: (prop.price + prop.shipping)})
        }*/
    return proposal;
  }

  public async getProposal(id: string): Promise<Proposal> {
    const proposal: Proposal = await this.proposals.findOne({ _id: id });

    return proposal;
  }

  public async updateProposal(id: string, prop: UpdateProposalDto, sellerId: string): Promise<Proposal> {
    const propo: Proposal = await this.proposals.findById(id);
    if (!(propo.seller_id.toString() === sellerId)) {
      throw new HttpException(400, "You're not authorized");
    }

    const proposal: Proposal = await this.proposals.findByIdAndUpdate({ _id: id }, { ...prop }, { new: true });
    if (!(propo.price === prop.price && propo.shipping === prop.shipping)) {
      await this.updateBestPrice(proposal.product_id);
    }

    if (!(propo.special_conditions === prop.special_conditions && propo.price === prop.price && propo.shipping === prop.shipping)) {
      await this.cartItems.updateMany(
        { proposal_id: id, locked: false },
        { price: prop.price, shipping: prop.shipping, special_conditions: prop.special_conditions },
      );
    }

    return proposal;
  }

  public async deleteProposal(id: string, sellerId: string): Promise<Proposal> {
    const propo: Proposal = await this.proposals.findById(id);
    if (!(propo.seller_id.toString() === sellerId)) {
      throw new HttpException(400, "You're not authorized");
    }

    const proposal: Proposal = await this.proposals.findByIdAndDelete({ _id: id });
    await this.updateBestPrice(proposal.product_id);
    await this.cartItems.deleteMany({ proposal_id: id, locked: false });
    /*
        const product : Product = await this.products.findById({_id: proposal.productId})
        if(product.best_price === (proposal.price + proposal.shipping)){
            const Prod : Product = await this.products.findByIdAndUpdate({_id: proposal.productId},{best_price: (prop.price + prop.shipping)})
        }*/
    return proposal;
  }

  public async getSellerProposals(id: string): Promise<Proposal[]> {
    const proposals: Proposal[] = await this.proposals.find({ seller_id: id });

    return proposals;
  }

  public async getProductProposals(id: string): Promise<Proposal[]> {
    const proposals: Proposal[] = await this.proposals.find({ product_id: id });

    return proposals;
  }

  public async updateBestPrice(id: string) {
    const props: Proposal[] = await this.getProductProposals(id);
    let bestOffer = 0;

    if (props.length > 0) {
      bestOffer = props[0].price + props[0].shipping;

      props.forEach(element => {
        if (element.price + element.shipping < bestOffer) {
          bestOffer = element.price + element.shipping;
        }
      });
    }

    const product: Product = await this.products.findByIdAndUpdate(id, { best_offer: bestOffer });

    return product;
  }

  public async alreadyExists(prodId: string, sellerId: string): Promise<Boolean> {
    const l: Proposal[] = await this.proposals.find({ product_id: prodId, seller_id: sellerId });
    return l.length > 0;
  }
}
