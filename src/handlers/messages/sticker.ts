import { MyContext } from "../../lib/telegraf"; // Import the Context type

const stickerMessage =
	() =>
	async (ctx: MyContext): Promise<void> => {
		// Use type assertion to assume ctx.session is never undefined
		ctx.session = ctx.session || { stickerCount: 0 }; // Ensure session is initialized
		// Increment the sticker count for the current session
		ctx.session.stickerCount = ctx.session.stickerCount + 1;
		// Reply to the user with the total number of stickers seen in this session
		console.log("Received a sticker from:", ctx.from);
		await ctx.reply(`👍 Seen ${ctx.session.stickerCount} stickers.`);
	};

export default stickerMessage; // Export the stickerMessage function for use in other modules
