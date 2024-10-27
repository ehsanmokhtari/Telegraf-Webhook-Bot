const helpCommand = () => async (ctx) => {
    console.log('Help command received:', ctx.from);
    await ctx.reply('Please Send\n any sticker\n hi message\n /help command\n /echo command\n /greeter command\n /superwizard command'); // Reply with instructions
}

module.exports = helpCommand;