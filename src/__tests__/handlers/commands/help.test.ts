import helpCommand from '../../../handlers/commands/help';
import { Context } from 'telegraf';

// Mock Telegraf context
const mockContext = {
  from: { id: 123, first_name: 'Test' },
  reply: jest.fn()
} as unknown as Context;

describe('Help Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send help message', async () => {
    const handler = helpCommand();
    await handler(mockContext);

    expect(mockContext.reply).toHaveBeenCalledWith(
      expect.stringContaining('Here are the commands you can use:')
    );
  });

  it('should include all available commands', async () => {
    const handler = helpCommand();
    await handler(mockContext);

    const replyText = (mockContext.reply as jest.Mock).mock.calls[0][0];
    
    expect(replyText).toContain('/greeter');
    expect(replyText).toContain('/echo');
    expect(replyText).toContain('/superwizard');
    expect(replyText).toContain('/help');
    expect(replyText).toContain('Say \'hi\'');
    expect(replyText).toContain('Send a sticker');
  });
});

