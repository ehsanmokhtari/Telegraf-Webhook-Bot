import { Context } from 'telegraf';
import logger from './logger';

export class BotError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends BotError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class DatabaseError extends BotError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class TelegramAPIError extends BotError {
  constructor(message: string) {
    super(message, 502);
  }
}

export const handleBotError = async (ctx: Context, error: Error): Promise<void> => {
  logger.error('Bot error occurred:', {
    error: error.message,
    stack: error.stack,
    userId: ctx.from?.id,
    chatId: ctx.chat?.id,
    messageType: ctx.message ? Object.keys(ctx.message)[1] : 'unknown',
  });

  // Don't send error messages for operational errors in production
  if (process.env.NODE_ENV === 'production' && error instanceof BotError && !error.isOperational) {
    return;
  }

  try {
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `❌ Error: ${error.message}` 
      : '❌ Something went wrong. Please try again later.';
    
    await ctx.reply(errorMessage);
  } catch (replyError) {
    logger.error('Failed to send error message to user:', replyError);
  }
};

export const handleWebhookError = (error: Error, req: any, res: any): void => {
  logger.error('Webhook error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
  });

  if (!res.headersSent) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    });
  }
};

export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

