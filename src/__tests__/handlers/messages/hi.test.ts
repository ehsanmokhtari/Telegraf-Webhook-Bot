import hiMessage from '../../../handlers/messages/hi';
import { Context } from 'telegraf';

// Mock Telegraf context
const mockContext = {
  from: { id: 123, first_name: 'Test' },
  reply: jest.fn()
} as unknown as Context;

describe('Hi Message Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send greeting message', async () => {
    const handler = hiMessage();
    await handler(mockContext);

    expect(mockContext.reply).toHaveBeenCalledWith('Hey there');
  });

  it('should be called only once', async () => {
    const handler = hiMessage();
    await handler(mockContext);

    expect(mockContext.reply).toHaveBeenCalledTimes(1);
  });
});

