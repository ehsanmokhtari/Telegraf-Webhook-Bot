const Sequelize = require("sequelize").Sequelize; // Import Sequelize constructor
const SessionModel = require("./models/session"); // Import session model

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres', // Database dialect
  dialectModule: require('pg'), // PostgreSQL module
  database: process.env.POSTGRES_DATABASE, // Database name from environment variables
  username: process.env.POSTGRES_USER, // Username from environment variables
  password: process.env.POSTGRES_PASSWORD, // Password from environment variables
  host: process.env.POSTGRES_HOST, // Host from environment variables
  port: 5432, // Default PostgreSQL port
  dialectOptions: {
    ssl: {
      require: true, // Require SSL connection
      rejectUnauthorized: false // Set to true in production for security
    }
  },
  connectTimeout: 10000, // Connection timeout in milliseconds
  logging: console.log // Log SQL queries to the console
});

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
