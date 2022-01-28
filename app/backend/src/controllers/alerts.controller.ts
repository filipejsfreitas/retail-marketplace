import { Inject, Singleton } from 'typescript-ioc';
import { Authorized, Delete, Get, JsonController, Param, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import { AlertsService } from '../services/alerts.service';

@Singleton
@JsonController('/alerts')
export class AlertsController {
  @Inject
  private alertsService: AlertsService;

  @Get('/')
  @Authorized()
  @OpenAPI({ summary: 'get alerts of this user' })
  async getAlerts(@Req() req: RequestWithUser) {
    const userId = req.token._id;

    const alerts = await this.alertsService.getUserAlerts(userId);

    return { data: alerts, message: "User's Alerts" };
  }

  @Get('/today')
  @Authorized()
  @OpenAPI({ summary: 'get alerts of this user for today' })
  async getAlertsForToday(@Req() req: RequestWithUser) {
    const userId = req.token._id;

    const alerts = await this.alertsService.getUserAlertsForToday(userId);

    return { data: alerts, message: "User's Alerts" };
  }

  @Delete('/:id')
  @Authorized()
  async deleteAlert(@Param('id') alertId: string, @Req() req: RequestWithUser) {
    const userId = req.token._id;

    const alert = await this.alertsService.getUserAlertById(alertId, userId);

    if (!alert) {
      throw new HttpException(404, 'Not found');
    }

    await this.alertsService.deleteAlert(alert);

    return { data: alert, message: 'Alert deleted' };
  }
}
