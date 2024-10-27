// Import necessary modules from Telegraf
const { Telegraf, session, Scenes } = require('telegraf');
// Import message filter for handling text messages
const { message } = require('telegraf/filters');
// Import message handlers for specific responses
const { hiMessage, stickerMessage, textMessage } = require('../handlers/messages');
// Import command handlers for bot commands
const { helpCommand } = require('../handlers/commands');
// Import session store for PostgreSQL database
const PostgresSessionStore = require('../db/sessionStore');
// Import scenes for managing complex interactions
const { superWizard, echoScene, greeterScene } = require('../scenes');

// Environment variables for development mode and bot configuration
const isDev = process.env.DEV;
const BOT_TOKEN = process.env.BOT_TOKEN;

// Creating a new Telegraf bot instance with the provided token
const bot = new Telegraf(BOT_TOKEN);

// Function to set up bot commands and middleware
function botUtils() {
    // Logging middleware
    bot.use(Telegraf.log());
    bot.use(logger);

    // Create an instance of the PostgresSessionStore for session management
    const store = new PostgresSessionStore();

    // Use the session middleware in the bot, configuring it with the session store
    bot.use(session({
        // Define a function to get the unique session key based on the chat ID
        getSessionKey: (ctx) => ctx.chat.id.toString(), // Convert chat ID to string for use as a session key
        store, // Pass the session store instance to manage session data
    }));

    // Create a new Stage instance with defined scenes and a time-to-live (TTL) of 10 minutes
    const stage = new Scenes.Stage([superWizard, echoScene, greeterScene]);

    // Use the stage middleware to manage scene transitions
    bot.use(stage.middleware());

    // Command handler for the /start command
    bot.start((ctx) => {
        console.log('Bot started:', ctx.from);
        ctx.reply("Welcome.. Please Send\n any sticker\n hi message\n /help command\n /echo command\n /greeter command\n /superwizard command");
    });
    
    // Command to enter the "greeter" scene when the user types /greeter
    bot.command("greeter", ctx => ctx.scene.enter("greeter"));

    // Command to enter the "echo" scene when the user types /echo
    bot.command("echo", ctx => ctx.scene.enter("echo"));

    // Command to enter the "super-wizard" scene when the user types /super-wizard
    bot.command("superwizard", ctx => ctx.scene.enter("super-wizard"));

    // Command handler for the /help command
    bot.help(helpCommand());

    // Handler for receiving stickers
    bot.on(message('sticker'), stickerMessage());

    // Handler for greeting messages
    bot.hears('hi', hiMessage());

    // Handler for receiving stickers
    bot.on(message('text'), textMessage());
}

// Logger middleware to track response times
const logger = async (_, next) => {
    const start = new Date(); // Record start time
    await next(); // Call the next middleware
    const ms = new Date().getTime() - start.getTime(); // Calculate response time
    console.log("Response time: %sms", ms); // Log the response time
};

// Function to handle webhook requests
async function useWebhook(req, res) {
    try {
        // Initialize bot commands and middleware
        botUtils();

        // Handle incoming requests
        if (req.method === "POST") {
            await bot.handleUpdate(req.body, res); // Process the update
        } else {
            res.status(200).json("Listening to bot events..."); // Respond to GET requests
        }
    } catch (error) {
        console.error(error); // Log any errors
        return error.message; // Return the error message
    }
}

// Function to run the bot in local development mode
async function localBot() {
    const botInfo = await bot.telegram.getMe();
    bot.options.username = botInfo.username; // Set bot username

    console.info("Server has initialized bot username: ", botInfo.username);

    await bot.telegram.deleteWebhook(); // Delete any existing webhook

    await bot.launch(); // Start polling for updates
}

// If running in development mode, start the bot
if (isDev) {
    console.log("isDev", isDev);

    localBot().then(() => {
        // Initialize bot commands and middleware
        botUtils();

        // Launch the bot
        bot.launch();
    });
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// Exporting the bot, useWebhook function, and logger middleware for external use
module.exports = {
    bot,
    useWebhook
};
