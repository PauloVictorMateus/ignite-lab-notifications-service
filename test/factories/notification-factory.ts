import { Content } from '../../src/application/entities/content';
import {
  Notification,
  NotificationProps,
} from '../../src/application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de agendamento'),
    recipientId: 'recipient-1',
    ...override,
  });
}
