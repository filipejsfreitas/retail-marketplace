import { CreateSellerDto, UpdateSellerDto } from '../dtos/seller.dto';
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

export class SellerService {
  public sellers = SellerModel;
  public invoices = SellerInvoiceModel;
  public comments = SellerCommentModel;
  public clientInvoices = ClientInvoiceModel;

  public async createSeller(seller_info: CreateSellerDto): Promise<Seller> {
    if (isEmpty(seller_info)) throw new HttpException(400, 'Invalid information');

    const seller: Seller = await this.sellers.create({ ...seller_info, rating: 0, numberRating: 0 });

    return seller;
  }

  public async updateSeller(seller_info: UpdateSellerDto, seller_id: string): Promise<Seller> {
    if (isEmpty(seller_info)) throw new HttpException(400, 'Invalid information');

    const seller: Seller = await this.sellers.findOneAndUpdate({ seller_id: seller_id }, { ...seller_info });

    return seller;
  }

  public async getSeller(seller_id: string) {
    const seller: Seller = await this.sellers.findOne({ seller_id: seller_id });

    return seller;
  }

  public async getInvoices(seller_id: string): Promise<SellerInvoice[]> {
    const invoices: SellerInvoice[] = await this.invoices.find({ seller_id: seller_id.toString() });

    return invoices;
  }

  public async getInvoice(seller_id: string, invoice_id: string): Promise<SellerInvoice> {
    const invoice: SellerInvoice = await this.invoices.findOne({ seller_id: seller_id, _id: invoice_id });

    if (!invoice) throw new HttpException(409, 'Invalid invoice Id or not authrized');

    return invoice;
  }

  public async updateInvoice(seller_id: string, invoice_id: string, new_state: string): Promise<SellerInvoice> {
    const invoice: SellerInvoice = await this.invoices.findOneAndUpdate({ seller_id: seller_id, _id: invoice_id }, { state: new_state });
    if (!invoice) throw new HttpException(409, 'Invalid invoice Id or not authrized');

    const clientInvoice = await this.clientInvoices.findOne({ _id: invoice.invoice_id });

    clientInvoice.items.forEach(element => {
      if (seller_id.toString() === seller_id) {
        element.state = new_state;
      }
    });

    await clientInvoice.save();

    return invoice;
  }

  public async makeComment(comment: SellerCommentDto, client_id: string, seller_id: string): Promise<SellerComment> {
    if (isEmpty(comment)) throw new HttpException(400, 'Invalid information');

    const findSeller: Seller = await this.sellers.findOne({ seller_id: seller_id });

    if (!findSeller) throw new HttpException(409, 'Invalid seller Id');

    const newNumberScores = findSeller.numberRating + 1;

    const newScore = (findSeller.rating * findSeller.numberRating + comment.rating) / newNumberScores;

    const updateSeller: Seller = await this.sellers.findOneAndUpdate(
      { _id: seller_id },
      { rating: newScore, numberRating: newNumberScores },
      { new: true },
    );

    const sellerComment: SellerComment = await this.comments.create({ ...comment, seller_id: seller_id, client_id: client_id, date: new Date() });

    return sellerComment;
  }

  public async deleteComment(comment_id: string, client_id: string): Promise<SellerComment> {
    const findComment: SellerComment = await this.comments.findOne({ _id: comment_id, client_id: client_id });

    if (!findComment) {
      throw new HttpException(400, "Invalid comment Id or rou're not authorized");
    }

    const seller: Seller = await this.sellers.findOne({ seller_id: findComment.seller_id });

    const newNumberScores = seller.numberRating - 1;

    let newScore = 0;

    if (newNumberScores > 0) {
      newScore = (seller.rating * seller.numberRating - findComment.rating) / newNumberScores;
    }

    const sellerUpdated: Seller = await this.sellers.findOneAndUpdate(
      { seller_id: seller._id },
      { rating: newScore, numberRating: newNumberScores },
      { new: true },
    );

    const commentdeleted: SellerComment = await this.comments.findOneAndRemove({ _id: comment_id });
    return commentdeleted;
  }

  public async updateComment(comment_id: string, client_id: string, new_comment: SellerCommentDto) {
    const findComment: SellerComment = await this.comments.findOne({ _id: comment_id, client_id: client_id });

    if (!findComment) {
      throw new HttpException(400, "Invalid comment Id or rou're not authorized");
    }

    const seller: Seller = await this.sellers.findOne({ seller_id: findComment.seller_id });

    const newScore = (seller.rating * seller.numberRating - findComment.rating + new_comment.rating) / seller.numberRating;

    const sellerUpdated: Seller = await this.sellers.findOneAndUpdate({ seller_id: seller._id }, { rating: newScore }, { new: true });

    const comment_updated: SellerComment = await this.comments.findOneAndUpdate(
      { _id: comment_id },
      { ...new_comment, date: new Date() },
      { new: true },
    );

    return comment_updated;
  }

  public async getComments(seller_id): Promise<SellerComment[]> {
    const comments: SellerComment[] = await this.comments.find({ seller_id: seller_id });

    return comments;
  }
}
