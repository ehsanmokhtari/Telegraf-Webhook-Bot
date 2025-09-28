// Test setup file
import { config } from 'dotenv';

// Load environment variables for testing
config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DEV = 'false';

// Mock console methods to reduce noise in tests
const mockConsole = {
  log: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

global.console = {
  ...console,
  ...mockConsole,
};

