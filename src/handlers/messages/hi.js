const hiMessage = () => async (ctx) => {
    console.log('Greeting received from:', ctx.from);
    await ctx.reply('Hey there'); // Reply with a friendly greeting
}

module.exports = hiMessage;