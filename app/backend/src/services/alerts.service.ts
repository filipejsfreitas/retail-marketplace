import { Singleton } from 'typescript-ioc';
import { AlertModel } from '../models/alert.model';
import moment from 'moment';

@Singleton
export class AlertsService {
  getUserAlerts(userId: string) {
    return AlertModel.find({ user_id: userId, dismissed: false });
  }

  getUserAlertsForToday(userId: string) {
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
}
