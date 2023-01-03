import { SendNotification } from './../../../application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private SendNotification: SendNotification) {}

  @Post('')
  async create(@Body() body: CreateNotificationBody) {
    const { content, category } = body;

    const { notification } = await this.SendNotification.execute({
      recipientId: '1',
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
