import { UpdateSellerDto } from '../dtos/seller.dto';
import { SellerCommentDto } from '../dtos/sellerComment.dto';
import { HttpException } from '../exceptions/HttpException';
import { Seller } from '../interfaces/seller.interface';
import { SellerComment } from '../interfaces/sellerComment.interface';
import { SellerInvoice } from '../interfaces/sellerInvoice.interface';
import { ClientInvoiceModel } from '../models/clientInvoice.model';
import { SellerModel } from '../models/seller.model';
import { SellerCommentModel } from '../models/sellerComment.model';
import { SellerInvoiceModel } from '../models/sellerInvoice.model';
import { isEmpty } from 'class-validator';
import { Singleton } from 'typescript-ioc';
import { CreateSellerDto } from '../dtos/users.dto';

@Singleton
export class SellerService {
  public sellers = SellerModel;
  public invoices = SellerInvoiceModel;
  public comments = SellerCommentModel;
  public clientInvoices = ClientInvoiceModel;

  public async createSeller(sellerInfo: CreateSellerDto, userId: string): Promise<SellerModel> {
    if (isEmpty(sellerInfo)) throw new HttpException(400, 'Invalid information');

    const { firstName, lastName, companyName, tin, companyPhoneNumber, customerServiceEmail } = sellerInfo;

    const seller = await this.sellers.create({
      userId,
      firstName,
      lastName,
      companyName,
      tin,
      companyPhoneNumber,
      customerServiceEmail,
      rating: 0,
      numberRating: 0,
    });

    return seller;
  }

  public async updateSeller(seller_info: UpdateSellerDto, sellerId: string): Promise<Seller> {
    if (isEmpty(seller_info)) throw new HttpException(400, 'Invalid information');

    const seller: Seller = await this.sellers.findOneAndUpdate({ userId: sellerId }, { ...seller_info });

    return seller;
  }

  public async getSeller(sellerId: string) {
    const seller: SellerModel = await this.sellers.findOne({ userId: sellerId });

    return seller;
  }

  public async getInvoices(sellerId: string): Promise<SellerInvoice[]> {
    const invoices: SellerInvoice[] = await this.invoices.find({ seller_id: sellerId.toString() });

    return invoices;
  }

  public async getInvoice(sellerId: string, invoice_id: string): Promise<SellerInvoice> {
    const invoice: SellerInvoice = await this.invoices.findOne({ seller_id: sellerId, _id: invoice_id });

    if (!invoice) throw new HttpException(409, 'Invalid invoice Id or not authrized');

    return invoice;
  }

  public async updateInvoice(sellerId: string, invoice_id: string, new_state: 'processing' | 'sent' | 'finished'): Promise<SellerInvoice> {
    const invoice: SellerInvoice = await this.invoices.findOneAndUpdate({ seller_id: sellerId, _id: invoice_id }, { state: new_state });
    if (!invoice) throw new HttpException(409, 'Invalid invoice Id or not authrized');

    const clientInvoice = await this.clientInvoices.findOne({ _id: invoice.invoice_id });

    clientInvoice.items.forEach(element => {
      if (element.seller_id.toString() === sellerId) {
        element.state = new_state;
      }
    });

    await clientInvoice.save();

    return invoice;
  }

  public async makeComment(comment: SellerCommentDto, clientId: string, sellerId: string): Promise<SellerComment> {
    if (isEmpty(comment)) throw new HttpException(400, 'Invalid information');

    const findSeller: Seller = await this.sellers.findOne({ user_id: sellerId });

    if (!findSeller) throw new HttpException(409, 'Invalid seller Id');

    const newNumberScores = findSeller.numberRating + 1;

    const rating = (comment.shipping_rating + comment.support_rating) / 2;

    const newScore = (findSeller.rating * findSeller.numberRating + rating) / newNumberScores;

    const updateSeller: Seller = await this.sellers.findOneAndUpdate(
      { _id: sellerId },
      { rating: newScore, numberRating: newNumberScores },
      { new: true },
    );

    const sellerComment: SellerComment = await this.comments.create({
      ...comment,
      seller_id: sellerId,
      client_id: clientId,
      date: new Date(),
      rating: rating,
    });

    return sellerComment;
  }

  public async deleteComment(comment_id: string, clientId: string): Promise<SellerComment> {
    const findComment: SellerComment = await this.comments.findOne({ _id: comment_id, clientId: clientId });

    if (!findComment) {
      throw new HttpException(400, "Invalid comment Id or rou're not authorized");
    }

    const seller: Seller = await this.sellers.findOne({ userId: findComment.seller_id });

    const newNumberScores = seller.numberRating - 1;

    let newScore = 0;

    if (newNumberScores > 0) {
      newScore = (seller.rating * seller.numberRating - findComment.rating) / newNumberScores;
    }

    const sellerUpdated: Seller = await this.sellers.findOneAndUpdate(
      { userId: seller._id },
      { rating: newScore, numberRating: newNumberScores },
      { new: true },
    );

    const commentdeleted: SellerComment = await this.comments.findOneAndRemove({ _id: comment_id });
    return commentdeleted;
  }

  public async updateComment(comment_id: string, clientId: string, new_comment: SellerCommentDto) {
    const findComment: SellerComment = await this.comments.findOne({ _id: comment_id, client_id: clientId });

    if (!findComment) {
      throw new HttpException(400, "Invalid comment Id or rou're not authorized");
    }

    const seller: Seller = await this.sellers.findOne({ userId: findComment.seller_id });

    const rating = (new_comment.shipping_rating + new_comment.support_rating) / 2;

    const newScore = (seller.rating * seller.numberRating - findComment.rating + rating) / seller.numberRating;

    const sellerUpdated: Seller = await this.sellers.findOneAndUpdate({ userId: seller._id }, { ...new_comment, rating: newScore }, { new: true });

    const comment_updated: SellerComment = await this.comments.findOneAndUpdate(
      { _id: comment_id },
      { ...new_comment, date: new Date() },
      { new: true },
    );

    return comment_updated;
  }

  public async getComments(sellerId): Promise<SellerComment[]> {
    const comments: SellerComment[] = await this.comments.find({ seller_id: sellerId });

    return comments;
  }

  public async addImage(sellerId: string, imagePath: string){
    const seller = await this.sellers.findById(sellerId);
    if(seller.image){
      throw new HttpException(400, "Already as image");
    }
    
    const newSeller = await this.sellers.findByIdAndUpdate(sellerId, {image: imagePath});

    return newSeller;   
  }

  public async updateImage(sellerId: string, imagePath: string){
    const seller = await this.sellers.findById(sellerId);
    if(!(seller.image)){
      throw new HttpException(400, "Does not have an image image");
    }
    
    const newSeller = await this.sellers.findByIdAndUpdate(sellerId, {image: imagePath});

    return newSeller;   
  }
}
