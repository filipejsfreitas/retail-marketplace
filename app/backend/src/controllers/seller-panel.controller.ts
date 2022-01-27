import { Inject, Singleton } from 'typescript-ioc';
import { SellerPanelService } from '../services/seller-panel.service';
import { Authorized, Get, JsonController, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestWithUser } from '../interfaces/auth.interface';

@Singleton
@JsonController('/sellerPanel')
export class SellerPanelController {
  @Inject
  private sellerPanelService: SellerPanelService;

  @Get('/')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get seller panel information' })
  async get(@Req() req: RequestWithUser) {
    const revenueOverview = await this.sellerPanelService.getRevenueOverview(req.user._id.toString());
    const alerts = await this.sellerPanelService.getAlerts(req.user._id.toString());
    const ordersOverview = await this.sellerPanelService.getOrdersOverview(req.user._id.toString());
    const recommendedCategories = await this.sellerPanelService.getRecommendedCategories(req.user._id.toString());
    const amountsSoldInLastXDays = await this.sellerPanelService.getAmountsSoldInLastXDays(req.user._id.toString(), 7);

    return {
      revenueOverview,
      alerts,
      ordersOverview,
      recommendedCategories,
      amountsSoldInLastXDays,
    };
  }

  @Get('/ordersOverview')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get orders overview information' })
  async getOrdersOverview(@Req() req: RequestWithUser) {
    const ordersOverview = await this.sellerPanelService.getOrdersOverview(req.user._id.toString());
    return ordersOverview;
  }

  @Get('/revenueOverview')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get revenue information' })
  async getRevenue(@Req() req: RequestWithUser) {
    const revenueOverview = await this.sellerPanelService.getRevenueOverview(req.user._id.toString());
    return revenueOverview;
  }

  @Get('/alerts')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get alerts information' })
  async getAlerts(@Req() req: RequestWithUser) {
    const alerts = await this.sellerPanelService.getAlerts(req.user._id.toString());

    return alerts;
  }

  @Get('/recommendCategories')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get seller panel information' })
  async getCategories(@Req() req: RequestWithUser) {
    const recommendedCategories = await this.sellerPanelService.getRecommendedCategories(req.user._id.toString());

    return recommendedCategories;
  }

  @Get('/amountsSoldInLast7Days')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get seller panel information' })
  async getAmountsSoldInLast7Days(@Req() req: RequestWithUser) {
    return await this.sellerPanelService.getAmountsSoldInLastXDays(req.user._id.toString(), 7);
  }

  @Get('/amountsSoldOverLastYear')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get seller panel information' })
  async getAmountsSoldOverLastYear(@Req() req: RequestWithUser) {
    return await this.sellerPanelService.getAmountsSoldInLastXDaysOverNPeriods(req.user._id.toString(), 7, 52);
  }
}
