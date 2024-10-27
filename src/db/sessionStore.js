const { Session } = require("./sequelize");

// Class to manage session storage in a PostgreSQL database
class PostgresSessionStore {
  // Retrieve session data by chat ID
  async get(chatId) {
    const session = await Session.findOne({ where: { chatId } });
    return session ? session.data : null; // Return session data or null if not found
  }

  // Save or update session data by chat ID
  async set(chatId, data) {
    await Session.upsert({ chatId, data }); // Inserts or Updates session data
  }

  // Delete session data by chat ID
  async delete(chatId) {
    await Session.destroy({ where: { chatId } }); // Remove session from the database
  }
}

module.exports = PostgresSessionStore; // Export the class for use in other modules
