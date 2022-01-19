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

    return {
      revenueOverview,
      alerts,
      ordersOverview,
      recommendedCategories,
    };
  }

  @Get('/ordersOverview')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get orders overview information' })
  async getOrdersOverview(@Req() req: RequestWithUser) { 
    const ordersOverview = await this.sellerPanelService.getOrdersOverview(req.user._id.toString());
    return ordersOverview
  }

  @Get('/revenueOverview')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get revenue information' })
  async getrevenue(@Req() req: RequestWithUser) {
    const revenueOverview = await this.sellerPanelService.getRevenueOverview(req.user._id.toString());
    return revenueOverview;
  }

  @Get('/alerts')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get alerts information' })
  async getalerts(@Req() req: RequestWithUser) {
    
    const alerts = await this.sellerPanelService.getAlerts(req.user._id.toString());

    return alerts;
  }

  @Get('/recommendCategories')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get seller panel information' })
  async getcategories(@Req() req: RequestWithUser) {
    
    const recommendedCategories = await this.sellerPanelService.getRecommendedCategories(req.user._id.toString());

    return recommendedCategories
  }

  
}
