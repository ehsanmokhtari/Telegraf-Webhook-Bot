import { Context } from "telegraf"; // Import the Context type from Telegraf

const textMessage =
	() =>
	async (ctx: Context): Promise<void> => {
		console.log("Text received from:", ctx.from);
		await ctx.reply("type /help for Help"); // Reply with help message
	};

export default textMessage; // Export the textMessage function for use in other modules
