// Define the session model for Sequelize
module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model; // Base Model class from Sequelize

  class Session extends Model { } // Define Session class extending Model

  // Initialize the session model with fields
  Session.init({
    chatId: {
      type: Sequelize.STRING, // Chat ID as a string
      primaryKey: true, // Set chatId as the primary key
    },
    data: {
      type: Sequelize.JSONB, // Session data stored as JSONB
    },
  }, {
    sequelize, // Pass the sequelize instance
    modelName: "session", // Name of the model
    tableName: 'sessions', // Name of the table
  });

  return Session; // Return the session model
}
