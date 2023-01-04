import { GetRecipientNotifications } from './../../../application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../../application/use-cases/count-recipient-notification';
import { ReadNotification } from './../../../application/use-cases/read-notification';
import { UnreadNotification } from './../../../application/use-cases/unread-notification';
import { SendNotification } from './../../../application/use-cases/send-notification';
import { CancelNotification } from './../../../application/use-cases/cancel-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { getgid } from 'process';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private SendNotification: SendNotification,
    private CancelNotification: CancelNotification,
    private ReadNotification: ReadNotification,
    private UnreadNotification: UnreadNotification,
    private CountRecipientNotifications: CountRecipientNotifications,
    private GetRecipientNotifications: GetRecipientNotifications,
  ) {}

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

  @Patch(':id/cancel')
  async cancel(
    @Param('id')
    id: string,
  ) {
    await this.CancelNotification.execute({
      notificationId: id,
    });

    return {
      message: 'Notification canceled',
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('id') id: string,
  ): Promise<{ count: number }> {
    const { count } = await this.CountRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.GetRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(
    @Param('id')
    id: string,
  ) {
    await this.ReadNotification.execute({
      notificationId: id,
    });

    return {
      message: 'Notification read',
    };
  }

  @Patch(':id/unread')
  async unread(
    @Param('id')
    id: string,
  ) {
    await this.UnreadNotification.execute({
      notificationId: id,
    });

    return {
      message: 'Notification unread',
    };
  }
}
