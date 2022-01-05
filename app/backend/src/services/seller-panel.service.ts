import moment from 'moment';
import { Singleton } from 'typescript-ioc';
import { SellerInvoiceModel } from '../models/sellerInvoice.model';
import { ProposalModel } from '../models/proposal.model';
import fetch from 'node-fetch';

@Singleton
export class SellerPanelService {
  async getOrdersOverview(userId) {
    const sent = await SellerInvoiceModel.find({ seller_id: userId, state: 'sent' }).count();
    const processing = await SellerInvoiceModel.find({ seller_id: userId, state: 'processing' }).count();

    return {
      processing,
      sent,
    };
  }

  async getRevenueOverview(userId) {
    const startOfMonth = moment().subtract(1, 'month').toDate();

    const invoices = await SellerInvoiceModel.aggregate<SellerInvoiceModel>([
      {
        $match: {
          seller_id: userId,
          date: {
            $gte: startOfMonth,
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' }, day: { $dayOfMonth: '$date' } },
          count: { $sum: '$total' },
        },
      },
    ]);

    return invoices;
  }

  async getAlerts(userId: string) {
    const lowStockProposals = await ProposalModel.find({ seller_id: userId, stock: { $lte: 10 } });

    return { lowStockProposals };
  }

  async getRecommendedCategories(userId: string) {
    const response = await fetch(process.env.FLASK_URL + '/search_categories/' + 'PT');

    if (!response.ok) {
      return [];
    }

    return await response.json();
  }
}
