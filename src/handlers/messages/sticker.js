const stickerMessage = () => async (ctx) => {
    // Set a default session object if it doesn't exist
    ctx.session ??= { stickerCount: 0 }; // Use nullish coalescing assignment to initialize messageCount
    // Increment the message count for the current session
    ctx.session.stickerCount = ctx.session.stickerCount + 1;
    // Reply to the user with the total number of messages seen in this session
    console.log('Received a sticker from:', ctx.from);
    await ctx.reply(`👍 Seen ${ctx.session.stickerCount} stickers.`);
}

module.exports = stickerMessage;