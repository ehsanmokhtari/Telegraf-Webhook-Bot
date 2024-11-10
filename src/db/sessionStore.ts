import { Session } from './sequelize'; // Import the Session model
import { SessionData } from '../lib/telegraf';

// Class to manage session storage in a PostgreSQL database
class PostgresSessionStore {
  
  // Retrieve session data by chat ID
  async get(chatId: string): Promise<SessionData | undefined> {
    console.log('get method called with chatId:', chatId);
    const session = await Session.findOne({ where: { chatId } });
    console.log('get method found session:', session);
    return session ? (session.data as SessionData) : undefined; // Return session data or undefined if not found
  }

  // Save or update session data by chat ID
  async set(chatId: string, data: SessionData): Promise<void> {
    console.log('set method called with chatId:', chatId);
    console.log('set method called with data:', data);
    await Session.upsert({ chatId, data }); // Inserts or updates session data
  }

  // Delete session data by chat ID
  async delete(chatId: string): Promise<void> {
    await Session.destroy({ where: { chatId } }); // Remove session from the database
  }
}

export default PostgresSessionStore; // Export the class for use in other modules