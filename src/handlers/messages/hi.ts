import { MyContext } from "../../lib/telegraf";

const hiMessage =
	() =>
	async (ctx: MyContext): Promise<void> => {
		console.log("Greeting received from:", ctx.from);
		await ctx.reply("Hey there"); // Reply with a friendly greeting
	};

export default hiMessage; // Export the hiMessage function for use in other modules
