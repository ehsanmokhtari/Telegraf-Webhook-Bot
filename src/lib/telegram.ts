// Import necessary modules from Telegraf
import { Telegraf, Context, session, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { hiMessage, stickerMessage, textMessage } from "../handlers/messages";
import { helpCommand } from "../handlers/commands";
import PostgresSessionStore from "../db/sessionStore";
import { superWizard, echoScene, greeterScene } from "../scenes";
import { MyContext } from "./telegraf";
import { Request, Response } from "express"; // Import Express and its types

// Environment variables for development mode and bot configuration
const isDev = process.env.DEV === "true";
const BOT_TOKEN = process.env.BOT_TOKEN as string; // Ensure BOT_TOKEN is a string

// Creating a new Telegraf bot instance with the provided token
const bot = new Telegraf<MyContext>(BOT_TOKEN);

// Function to set up bot commands and middleware
function botUtils() {
	// Logging middleware
	bot.use(Telegraf.log());
	bot.use(logger);

	// Create an instance of the PostgresSessionStore for session management
	const store = new PostgresSessionStore();

	// Use the session middleware in the bot, configuring it with the session store
	bot.use(
		session({
			getSessionKey: (ctx) => ctx.chat?.id.toString() || "", // Optional chaining for safety
			store,
		})
	);

	// Create a new Stage instance with defined scenes
	const stage = new Scenes.Stage<MyContext>([
		superWizard,
		echoScene,
		greeterScene,
	]);

	// Use the stage middleware to manage scene transitions
	bot.use(stage.middleware());

	// Command handler for the /start command
	bot.start((ctx) => {
		console.log("Bot started:", ctx.from);
		const welcomeMessage =
			"Welcome! Here are the commands you can use:\n\n" +
			"/greeter - Enter the greeter scene.\n" +
			"/echo - Enter the echo scene.\n" +
			"/superwizard - Enter the super wizard scene.\n" +
			"/help - Get help information about commands.\n" +
			"Say 'hi' to receive a greeting!\n" +
			"Send a sticker to see a fun response.\n" +
			"You can also send any text message for a response.";

		ctx.reply(welcomeMessage);
	});

	// Command to enter the "greeter" scene when the user types /greeter
	bot.command("greeter", (ctx) => ctx.scene.enter("greeter"));

	// Command to enter the "echo" scene when the user types /echo
	bot.command("echo", (ctx) => ctx.scene.enter("echo"));

	// Command to enter the "super-wizard" scene when the user types /super-wizard
	bot.command("superwizard", (ctx) => ctx.scene.enter("super-wizard"));

	// Command handler for the /help command
	bot.help(helpCommand());

	// Handler for receiving stickers
	bot.on(message("sticker"), stickerMessage());

	// Handler for greeting messages
	bot.hears("hi", hiMessage());

	// Handler for receiving text messages
	bot.on(message("text"), textMessage());
}

// Logger middleware to track response times
const logger = async (ctx: Context, next: () => Promise<void>) => {
	const start = new Date(); // Record start time
	await next(); // Call the next middleware
	const ms = new Date().getTime() - start.getTime(); // Calculate response time
	console.log("Response time: %sms", ms); // Log the response time
};

// Function to handle webhook requests
async function useWebhook(req: Request, res: Response) {
	// Adjust types as needed
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
		if (error instanceof Error) {
			return error.message; // Now this is safe
		} else {
			return "An unknown error occurred"; // Fallback for unknown types
		}
	}
}

// Function to run the bot in local development mode
async function localBot() {
	const botInfo = await bot.telegram.getMe();

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
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// Exporting the bot, useWebhook function, and logger middleware for external use
export { bot, useWebhook };
