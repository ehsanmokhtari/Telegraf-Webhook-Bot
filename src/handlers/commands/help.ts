import { Context } from "telegraf"; // Import the Context type from Telegraf

const helpCommand =
	() =>
	async (ctx: Context): Promise<void> => {
		console.log("Help command received:", ctx.from);
		const helpMessage =
			"Here are the commands you can use:\n\n" +
			"/greeter - Enter the greeter scene.\n" +
			"/echo - Enter the echo scene.\n" +
			"/superwizard - Enter the super wizard scene.\n" +
			"/help - Get help information about commands.\n" +
			"Say 'hi' to receive a greeting!\n" +
			"Send a sticker to see a fun response.\n" +
			"You can also send any text message for a response.";

		await ctx.reply(helpMessage); // Reply with instructions
	};

export default helpCommand; // Export the helpCommand function for use in other modules
