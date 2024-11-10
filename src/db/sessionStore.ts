import { Session } from "./sequelize"; // Import the Session model
import { SessionData } from "../lib/telegraf";

// Class to manage session storage in a PostgreSQL database
class PostgresSessionStore {
  
	// Retrieve session data by chat ID
	async get(chatId: string): Promise<SessionData | undefined> {
		try {
			const session = await Session.findOne({ where: { chatId } });
			console.log("get method found session:", session);
			return session ? (session.data as SessionData) : undefined; // Return session data or undefined if not found
		} catch (error) {
			console.error(`Error setting session data for chatId ${chatId}:`, error);
		}
	}

	// Save or update session data by chat ID
	async set(chatId: string, data: object): Promise<void> {
		console.log(`Setting session for chatId: ${chatId}`, data);
		try {
			const now = new Date(); // Get current date
			// Use upsert to either insert a new session or update an existing one
			await Session.upsert({
				chatId,
				data: data, // Store session data as a string
				createdAt: now, // Set createdAt
				updatedAt: now, // Set updatedAt
			});
			console.log(`Session data for chatId ${chatId} set successfully.`);
		} catch (error) {
			console.error(`Error setting session data for chatId ${chatId}:`, error);
		}
	}

	// Delete session data by chat ID
	async delete(chatId: string): Promise<void> {
		console.log(`Deleting session for chatId: ${chatId}`);
		try {
			await Session.destroy({ where: { chatId } });
			console.log(`Session for chatId ${chatId} deleted successfully.`);
		} catch (error) {
			console.error(`Error deleting session for chatId ${chatId}:`, error);
		}
	}
}

export default PostgresSessionStore; // Export the class for use in other modules
