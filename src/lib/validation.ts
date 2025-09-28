import Joi from 'joi';
import { ValidationError } from './errorHandler';

// Environment variables validation schema
export const envSchema = Joi.object({
  BOT_TOKEN: Joi.string().required().min(1),
  DEV: Joi.string().valid('true', 'false').default('false'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  POSTGRES_URL: Joi.string().uri().required(),
  WEBHOOK_URL: Joi.string().uri().optional(),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'http', 'debug').default('info'),
}).unknown();

// Telegram update validation schema
export const telegramUpdateSchema = Joi.object({
  update_id: Joi.number().required(),
  message: Joi.object({
    message_id: Joi.number().required(),
    from: Joi.object({
      id: Joi.number().required(),
      is_bot: Joi.boolean().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().optional(),
      username: Joi.string().optional(),
      language_code: Joi.string().optional(),
    }).required(),
    chat: Joi.object({
      id: Joi.number().required(),
      type: Joi.string().valid('private', 'group', 'supergroup', 'channel').required(),
      title: Joi.string().optional(),
      username: Joi.string().optional(),
      first_name: Joi.string().optional(),
      last_name: Joi.string().optional(),
    }).required(),
    date: Joi.number().required(),
    text: Joi.string().optional(),
    sticker: Joi.object().optional(),
    photo: Joi.array().optional(),
    document: Joi.object().optional(),
    video: Joi.object().optional(),
    audio: Joi.object().optional(),
    voice: Joi.object().optional(),
    location: Joi.object().optional(),
    contact: Joi.object().optional(),
  }).optional(),
  callback_query: Joi.object().optional(),
  inline_query: Joi.object().optional(),
  chosen_inline_result: Joi.object().optional(),
  edited_message: Joi.object().optional(),
  channel_post: Joi.object().optional(),
  edited_channel_post: Joi.object().optional(),
  shipping_query: Joi.object().optional(),
  pre_checkout_query: Joi.object().optional(),
  poll: Joi.object().optional(),
  poll_answer: Joi.object().optional(),
  my_chat_member: Joi.object().optional(),
  chat_member: Joi.object().optional(),
  chat_join_request: Joi.object().optional(),
}).unknown();

// User input validation schemas
export const textMessageSchema = Joi.object({
  text: Joi.string().min(1).max(4096).required(),
});

export const commandSchema = Joi.object({
  command: Joi.string().pattern(/^\/[a-zA-Z0-9_]+$/).required(),
  args: Joi.string().max(1000).optional(),
});

// Validation helper functions
export const validateEnv = (): void => {
  const { error } = envSchema.validate(process.env);
  if (error) {
    throw new ValidationError(`Environment validation failed: ${error.details[0].message}`);
  }
};

export const validateTelegramUpdate = (update: any): void => {
  const { error } = telegramUpdateSchema.validate(update);
  if (error) {
    throw new ValidationError(`Telegram update validation failed: ${error.details[0].message}`);
  }
};

export const validateTextMessage = (text: string): void => {
  const { error } = textMessageSchema.validate({ text });
  if (error) {
    throw new ValidationError(`Text message validation failed: ${error.details[0].message}`);
  }
};

export const validateCommand = (command: string, args?: string): void => {
  const { error } = commandSchema.validate({ command, args });
  if (error) {
    throw new ValidationError(`Command validation failed: ${error.details[0].message}`);
  }
};

// Sanitization functions
export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
};

export const sanitizeCommand = (command: string): string => {
  return command
    .replace(/[^a-zA-Z0-9_\/]/g, '') // Keep only alphanumeric, underscore, and slash
    .toLowerCase();
};

