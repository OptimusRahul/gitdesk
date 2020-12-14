import { Notification } from 'electron';
import { responseNotification } from '../utility/responseObject';

export const notificationWindow = (notfication) => {
    new Notification(responseNotification(notfication.title, notfication.body, notfication.icon)).show();
};