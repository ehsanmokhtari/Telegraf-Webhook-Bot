const Sequelize = require("sequelize").Sequelize; // Import Sequelize constructor
const SessionModel = require("./models/session"); // Import session model

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URL)

// Authenticate the connection to the database
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.'); // Success message
}).catch(err => {
  console.error('Unable to connect to the database:', err); // Error handling
});

// Initialize the session model
const Session = SessionModel(sequelize, Sequelize);

// Sync the database, forcing a reset (use cautiously in production)
// Session.sync({ force: true })
sequelize.sync({ force: true });

module.exports = {
  sequelize, // Export the sequelize instance
  Session // Export the session model
};
