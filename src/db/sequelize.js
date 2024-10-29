const Sequelize = require("sequelize").Sequelize; // Import Sequelize constructor
const SessionModel = require("./models/session"); // Import session model

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URL,{
  dialect: 'postgres', // Database dialect
  dialectModule: require('pg'), // PostgreSQL module
  logging: console.log // Log SQL queries to the console
})

// Authenticate the connection to the database
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.'); // Success message
}).catch(err => {
  console.error('Unable to connect to the database:', err); // Error handling
});

// Initialize the session model
const Session = SessionModel(sequelize, Sequelize);

// Sync the database
sequelize.sync();

module.exports = {
  Session // Export the session model
};
