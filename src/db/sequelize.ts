import { Sequelize } from "sequelize"; // Import Sequelize constructor
import createSessionModel from "./models/session"; // Import session model

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
	dialect: "postgres", // Database dialect
	dialectModule: require("pg"), // PostgreSQL module
	logging: console.log, // Log SQL queries to the console
});

// Authenticate the connection to the database
sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully."); // Success message
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err); // Error handling
	});

// Initialize the session model
const Session = createSessionModel(sequelize);

// Sync the database
sequelize.sync();

export { Session }; // Export the session model
