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

  async getAmountsSoldInLastXDays(userId: string, days: number) {
    const xDaysAgo = moment().startOf('day').subtract(days, 'days').toDate();
    const previousXDays = moment(xDaysAgo).subtract(days, 'days').toDate();

    const invoicesFromLastXDays = await SellerInvoiceModel.aggregate<SellerInvoiceModel>([
      {
        $match: {
          date: {
            $gte: xDaysAgo,
          },
        },
      },
    ]);

    const totalLastXDays = invoicesFromLastXDays.reduce((x, y) => x + y.total, 0);

    const invoicesFromPreviousXDays = await SellerInvoiceModel.aggregate<SellerInvoiceModel>([
      {
        $match: {
          date: {
            $lt: xDaysAgo,
            $gte: previousXDays,
          },
        },
      },
    ]);

    const totalPreviousXDays = invoicesFromPreviousXDays.reduce((x, y) => x + y.total, 0);

    const diffInPercent = Math.round((totalLastXDays / (totalPreviousXDays === 0 ? 1 : totalPreviousXDays)) * 100);

    const countLastXDays = invoicesFromLastXDays.length;
    const countPreviousXDays = invoicesFromPreviousXDays.length;
    const countDiffInPercent = Math.round((countLastXDays / (countPreviousXDays === 0 ? 1 : countPreviousXDays)) * 100);

    return {
      totals: {
        lastXDays: totalLastXDays,
        previousXDays: totalPreviousXDays,
        diffInPercent: isNaN(diffInPercent) || !isFinite(diffInPercent) ? 0 : diffInPercent,
      },
      counts: {
        lastXDays: countLastXDays,
        previousXDays: countPreviousXDays,
        diffInPercent: isNaN(countDiffInPercent) || !isFinite(countDiffInPercent) ? 0 : countDiffInPercent,
      },
    };
  }

  async getAmountsSoldInLastXDaysOverNPeriods(userId: string, days: number, periods: number) {
    const periodicChanges = [];

    let xDaysAgo = moment().startOf('day').subtract(days, 'days').toDate();
    let previousXDays = moment(xDaysAgo).subtract(days, 'days').toDate();

    let invoicesFromLastXDays = await SellerInvoiceModel.aggregate<SellerInvoiceModel>([
      {
        $match: {
          date: {
            $gte: xDaysAgo,
          },
        },
      },
    ]);

    let totalLastXDays = invoicesFromLastXDays.reduce((x, y) => x + y.total, 0);

    for (let i = 0; i < periods; i++) {
      const invoicesFromPreviousXDays = await SellerInvoiceModel.aggregate<SellerInvoiceModel>([
        {
          $match: {
            date: {
              $lt: xDaysAgo,
              $gte: previousXDays,
            },
          },
        },
      ]);

      const totalPreviousXDays = invoicesFromPreviousXDays.reduce((x, y) => x + y.total, 0);
      const diffInPercent = Math.round((totalLastXDays / (totalPreviousXDays === 0 ? 1 : totalPreviousXDays)) * 100);

      const countLastXDays = invoicesFromLastXDays.length;
      const countPreviousXDays = invoicesFromPreviousXDays.length;
      const countDiffInPercent = Math.round((countLastXDays / (countPreviousXDays === 0 ? 1 : countPreviousXDays)) * 100);

      periodicChanges.push({
        period: {
          start: previousXDays.toISOString(),
          end: xDaysAgo.toISOString(),
        },
        totals: {
          lastXDays: totalLastXDays,
          previousXDays: totalPreviousXDays,
          diffInPercent: isNaN(diffInPercent) || !isFinite(diffInPercent) ? 0 : diffInPercent,
        },
        counts: {
          lastXDays: countLastXDays,
          previousXDays: countPreviousXDays,
          diffInPercent: isNaN(countDiffInPercent) || !isFinite(countDiffInPercent) ? 0 : countDiffInPercent,
        },
      });

      invoicesFromLastXDays = invoicesFromPreviousXDays;
      totalLastXDays = totalPreviousXDays;

      xDaysAgo = previousXDays;
      previousXDays = moment(xDaysAgo).subtract(days, 'days').toDate();
    }

    const response = await fetch(process.env.FLASK_URL + '/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(periodicChanges),
    });

    if (!response.ok) {
      return [];
    }

    return periodicChanges;
    // return await response.json();
  }
}
