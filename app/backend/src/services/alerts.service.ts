import { Inject, Singleton } from 'typescript-ioc';
import { AlertModel } from '../models/alert.model';
import moment from 'moment';
import { AlertGenerationModel } from '../models/alert-generation.model';
import { SellerPanelService } from './seller-panel.service';
import { ProductService } from './product.service';
import { ProposalService } from './proposal.service';

@Singleton
export class AlertsService {
  @Inject
  private sellerPanelService: SellerPanelService;

  @Inject
  private productService: ProductService;

  @Inject
  private proposalService: ProposalService;

  getUserAlerts(userId: string) {
    return AlertModel.find({ user_id: userId, dismissed: false });
  }

  async getUserAlertsForToday(userId: string) {
    if (!(await this.haveAlertsBeenGeneratedForToday(userId))) {
      await this.generateAlerts(userId);
      await this.updateLastAlertGenerationDate(userId);
    }

    return AlertModel.find({
      user_id: userId,
      dismissed: false,
      date: {
        $gte: moment().startOf('day').toDate(),
      },
    });
  }

  getUserAlertById(alertId: string, userId: string) {
    return AlertModel.findOne({ _id: alertId, user_id: userId, dismissed: false });
  }

  createAlert(userId: string, message: string) {
    return AlertModel.create({
      user_id: userId,
      date: moment().toDate(),
      message,
      dismissed: false,
    });
  }

  async deleteAlert(alert: AlertModel) {
    alert.dismissed = true;
    return await alert.save();
  }

  async haveAlertsBeenGeneratedForToday(userId: string) {
    const generation = await AlertGenerationModel.findOne({
      user_id: userId,
      date: {
        $gte: moment().startOf('day').toDate(),
      },
    });

    if (!generation) {
      return false;
    }

    return true;
  }

  async updateLastAlertGenerationDate(userId: string) {
    const generation = await AlertGenerationModel.findOne({
      user_id: userId,
    });

    if (!generation) {
      await AlertGenerationModel.create({
        user_id: userId,
        date: moment().toDate(),
      });

      return true;
    }

    generation.date = moment().toDate();
    await generation.save();

    return true;
  }

  async generateAlerts(userId: string) {
    const { lowStockProposals } = await this.sellerPanelService.getLowStockProposals(userId);

    for (const proposal of lowStockProposals) {
      const product = await this.productService.findProductById(proposal.product_id);

      let expectedDemand = 0;
      try {
        const { Stock_prevision: demands } = await this.proposalService.getStockPrevision(proposal._id, userId, proposal, product);
        expectedDemand = demands[0];
      } catch (e) {
        console.error(e);
      }

      if (proposal.stock < expectedDemand) {
        await this.createAlert(
          userId,
          `${product.name} is low on stock! It has ${proposal.stock} items in stock but we expect the demand for tomorrow to be ${expectedDemand} items.` +
            ' Consider adding more products for sale.',
        );
      }
    }
  }
}
