import { MyContext } from "../../lib/telegraf";

const textMessage =
	() =>
	async (ctx: MyContext): Promise<void> => {
		console.log("Text received from:", ctx.from);
		await ctx.reply("type /help for Help"); // Reply with help message
	};

export default textMessage; // Export the textMessage function for use in other modules
