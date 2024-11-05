import { Model, DataTypes, Sequelize } from "sequelize";

// Define the session model for Sequelize
export default (sequelize: Sequelize) => {
	class Session extends Model {
		public chatId!: string; // Chat ID as a string
		public data!: object; // Session data stored as JSONB
	}

	// Initialize the session model with fields
	Session.init(
		{
			chatId: {
				type: DataTypes.STRING, // Chat ID as a string
				primaryKey: true, // Set chatId as the primary key
			},
			data: {
				type: DataTypes.JSONB, // Session data stored as JSONB
			},
		},
		{
			sequelize, // Pass the sequelize instance
			modelName: "session", // Name of the model
			tableName: "sessions", // Name of the table
			timestamps: false, // Disable timestamps if not needed
		}
	);

	return Session; // Return the session model
};