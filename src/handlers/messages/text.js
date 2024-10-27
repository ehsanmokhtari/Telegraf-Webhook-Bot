const textMessage = () => async (ctx) => {
    console.log('Text received from:', ctx.from);
    await ctx.reply('type /help for Help');
}

module.exports = textMessage;