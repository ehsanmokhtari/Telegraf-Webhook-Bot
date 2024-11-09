import { MyContext } from "../../lib/telegraf"; // Import the Context type

const stickerMessage =
	() =>
	async (ctx: MyContext): Promise<void> => {
		// Set a default session object if it doesn't exist
		ctx.session ??= { stickerCount: 0 }; // Use nullish coalescing assignment to initialize stickerCount
		// Increment the sticker count for the current session
		ctx.session.stickerCount += 1;
		// Reply to the user with the total number of stickers seen in this session
		console.log("Received a sticker from:", ctx.from);
		await ctx.reply(`👍 Seen ${ctx.session.stickerCount} stickers.`);
	};

export default stickerMessage; // Export the stickerMessage function for use in other modules
