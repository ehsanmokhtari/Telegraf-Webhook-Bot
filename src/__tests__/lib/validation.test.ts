import { 
  validateEnv, 
  validateTelegramUpdate, 
  validateTextMessage, 
  sanitizeText, 
  sanitizeCommand 
} from '../../lib/validation';
import { ValidationError } from '../../lib/errorHandler';

describe('Validation', () => {
  describe('validateEnv', () => {
    it('should validate correct environment variables', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        BOT_TOKEN: 'test-token',
        POSTGRES_URL: 'postgresql://user:pass@localhost:5432/db',
        DEV: 'true',
        NODE_ENV: 'development'
      };

      expect(() => validateEnv()).not.toThrow();
      
      process.env = originalEnv;
    });

    it('should throw ValidationError for missing BOT_TOKEN', () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        POSTGRES_URL: 'postgresql://user:pass@localhost:5432/db'
      };

      expect(() => validateEnv()).toThrow(ValidationError);
      
      process.env = originalEnv;
    });
  });

  describe('validateTelegramUpdate', () => {
    it('should validate correct Telegram update', () => {
      const update = {
        update_id: 123,
        message: {
          message_id: 456,
          from: {
            id: 789,
            is_bot: false,
            first_name: 'Test'
          },
          chat: {
            id: 789,
            type: 'private'
          },
          date: 1234567890,
          text: 'Hello'
        }
      };

      expect(() => validateTelegramUpdate(update)).not.toThrow();
    });

    it('should throw ValidationError for invalid update', () => {
      const invalidUpdate = {
        update_id: 'invalid'
      };

      expect(() => validateTelegramUpdate(invalidUpdate)).toThrow(ValidationError);
    });
  });

  describe('validateTextMessage', () => {
    it('should validate correct text message', () => {
      expect(() => validateTextMessage('Hello world')).not.toThrow();
    });

    it('should throw ValidationError for empty text', () => {
      expect(() => validateTextMessage('')).toThrow(ValidationError);
    });

    it('should throw ValidationError for text too long', () => {
      const longText = 'a'.repeat(5000);
      expect(() => validateTextMessage(longText)).toThrow(ValidationError);
    });
  });

  describe('sanitizeText', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeText('<script>alert("xss")</script>Hello')).toBe('scriptalert("xss")/scriptHello');
    });

    it('should remove javascript protocol', () => {
      expect(sanitizeText('javascript:alert("xss")')).toBe('alert("xss")');
    });

    it('should trim whitespace', () => {
      expect(sanitizeText('  Hello world  ')).toBe('Hello world');
    });
  });

  describe('sanitizeCommand', () => {
    it('should keep valid characters', () => {
      expect(sanitizeCommand('/start_123')).toBe('/start_123');
    });

    it('should remove invalid characters', () => {
      expect(sanitizeCommand('/start<script>')).toBe('/startscript');
    });

    it('should convert to lowercase', () => {
      expect(sanitizeCommand('/START')).toBe('/start');
    });
  });
});

