import { Content } from '../../application/entities/content';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Notification } from '../../application/entities/notification';
import { NotificationNotFoundError } from './erros/notification-not-found';
import { makeNotification } from '../../../test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unReadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unReadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
