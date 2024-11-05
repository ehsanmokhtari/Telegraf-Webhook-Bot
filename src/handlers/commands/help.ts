import { Context } from "telegraf"; // Import the Context type from Telegraf

const helpCommand =
	() =>
	async (ctx: Context): Promise<void> => {
		console.log("Help command received:", ctx.from);
		await ctx.reply(
			"Please Send\n any sticker\n hi message\n /help command\n /echo command\n /greeter command\n /superwizard command"
		); // Reply with instructions
	};

export default helpCommand; // Export the helpCommand function for use in other modules
