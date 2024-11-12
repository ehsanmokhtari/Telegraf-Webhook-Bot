import { MyContext } from "../../lib/telegraf";

const stickerMessage =
	() =>
	async (ctx: MyContext): Promise<void> => {
		// Initialize the session if it doesn't exist yet, with an zero sticker count by default.
		ctx.session = ctx.session ?? { stickerCount: 0 };   
		// Increment the sticker count for the current session
		ctx.session.stickerCount++;
		// Reply to the user with the total number of stickers seen in this session
		console.log("Received a sticker from:", ctx.from);
		await ctx.reply(`👍 Seen ${ctx.session.stickerCount} stickers.`);
	};

export default stickerMessage; // Export the stickerMessage function for use in other modules
