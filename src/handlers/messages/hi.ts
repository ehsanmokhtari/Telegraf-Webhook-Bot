import { Context } from "telegraf"; // Import the Context type from Telegraf

const hiMessage =
	() =>
	async (ctx: Context): Promise<void> => {
		console.log("Greeting received from:", ctx.from);
		await ctx.reply("Hey there"); // Reply with a friendly greeting
	};

export default hiMessage; // Export the hiMessage function for use in other modules
