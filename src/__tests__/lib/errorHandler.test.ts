import { 
  BotError, 
  ValidationError, 
  DatabaseError, 
  TelegramAPIError,
  handleBotError 
} from '../../lib/errorHandler';
import { Context } from 'telegraf';

// Mock Telegraf context
const mockContext = {
  from: { id: 123, first_name: 'Test' },
  chat: { id: 123 },
  message: { text: 'test' },
  reply: jest.fn()
} as unknown as Context;

describe('Error Handler', () => {
  describe('Custom Error Classes', () => {
    it('should create BotError with default values', () => {
      const error = new BotError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
    });

    it('should create BotError with custom values', () => {
      const error = new BotError('Test error', 400, false);
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(false);
    });

    it('should create ValidationError', () => {
      const error = new ValidationError('Validation failed');
      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(400);
    });

    it('should create DatabaseError', () => {
      const error = new DatabaseError('Database connection failed');
      expect(error.message).toBe('Database connection failed');
      expect(error.statusCode).toBe(500);
    });

    it('should create TelegramAPIError', () => {
      const error = new TelegramAPIError('API request failed');
      expect(error.message).toBe('API request failed');
      expect(error.statusCode).toBe(502);
    });
  });

  describe('handleBotError', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle BotError in development', async () => {
      process.env.NODE_ENV = 'development';
      const error = new BotError('Test error');
      
      await handleBotError(mockContext, error);
      
      expect(mockContext.reply).toHaveBeenCalledWith('❌ Error: Test error');
    });

    it('should handle BotError in production', async () => {
      process.env.NODE_ENV = 'production';
      const error = new BotError('Test error');
      
      await handleBotError(mockContext, error);
      
      expect(mockContext.reply).toHaveBeenCalledWith('❌ Something went wrong. Please try again later.');
    });

    it('should not send error message for non-operational errors in production', async () => {
      process.env.NODE_ENV = 'production';
      const error = new BotError('Test error', 500, false);
      
      await handleBotError(mockContext, error);
      
      expect(mockContext.reply).not.toHaveBeenCalled();
    });

    it('should handle reply errors gracefully', async () => {
      const errorContext = {
        ...mockContext,
        reply: jest.fn().mockRejectedValue(new Error('Reply failed'))
      } as unknown as Context;
      
      const error = new BotError('Test error');
      
      // Should not throw
      await expect(handleBotError(errorContext, error)).resolves.not.toThrow();
    });
  });
});

