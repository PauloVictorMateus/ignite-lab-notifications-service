import { Content } from './content';
import { Notification } from './notification';
describe('Notification', () => {
  it('should be able to create a notifications', () => {
    const notification = new Notification({
      content: new Content('Você tem uma nova notificação'),
      category: 'social',
      recipientId: 'example-id',
    });

    expect(notification).toBeTruthy();
  });
});
