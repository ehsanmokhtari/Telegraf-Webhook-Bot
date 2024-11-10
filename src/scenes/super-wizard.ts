import { Composer, Markup, Scenes } from "telegraf"; // Import necessary modules from Telegraf
import { MyContext } from "../lib/telegraf";

const { leave } = Scenes.Stage;

// Create a new Composer instance to handle step actions
const stepHandler = new Composer<MyContext>();

// Action handler for the inline button with the callback "next"
stepHandler.action("next", async (ctx) => {
	await ctx.reply("Super Wizard: Step 2. Via inline button"); // Reply indicating the next step
	return ctx.wizard.next(); // Move to the next step in the wizard
});

// Command handler for the command "/next"
stepHandler.command("next", async (ctx) => {
	await ctx.reply("Super Wizard: Step 2. Via command"); // Reply indicating the next step
	return ctx.wizard.next(); // Move to the next step in the wizard
});

// Default handler for any other messages in the step
stepHandler.use(
	(ctx) =>
		ctx.replyWithMarkdownV2("Super Wizard: Press `Next` button or type /next") // Prompt the user to press the button or type the command
);

// Create a new WizardScene called "super-wizard"
const superWizard = new Scenes.WizardScene(
	"super-wizard",
	async (ctx) => {
		// Handler for the first step
		await ctx.reply(
			"Super Wizard: Step 1", // Send a message for Step 1
			Markup.inlineKeyboard([
				// Create an inline keyboard with buttons
				Markup.button.url("❤️", "https://github.com/ehsanmokhtari/test_bot"), // Button linking to Telegraf documentation
				Markup.button.callback("➡️ Next", "next"), // Inline button to trigger the "next" action
			])
		);
		return ctx.wizard.next(); // Move to the next step in the wizard
	},
	stepHandler, // Use the stepHandler for handling actions and commands
	async (ctx) => {
		// Handler for the third step
		await ctx.reply("Super Wizard: Step 3"); // Send a message for Step 3
		return ctx.wizard.next(); // Move to the next step in the wizard
	},
	async (ctx) => {
		// Final step handler
		await ctx.reply("Super Wizard: Done"); // Send a completion message
		return await ctx.scene.leave(); // Leave the scene
	}
);

// Handler for when the scene is entered
superWizard.enter((ctx) =>
	ctx.reply("Welcome to Super Wizard Scene: Please Send Message")
);

// Command to go back from the echo scene to the previous scene
superWizard.command("back", leave<MyContext>()); // Use the leave function to exit the current scene

// Handler for when the scene is exited
superWizard.leave(async (ctx) => {
	await ctx.reply("Super Wizard Scene: exiting super wizard scene");
	const mainMessage =
		"Here are the commands you can use:\n\n" +
		"/greeter - Enter the greeter scene.\n" +
		"/echo - Enter the echo scene.\n" +
		"/superwizard - Enter the super wizard scene.\n" +
		"/help - Get help information about commands.\n" +
		"Say 'hi' to receive a greeting!\n" +
		"Send a sticker to see a fun response.\n" +
		"You can also send any text message for a response.";
	await ctx.reply(mainMessage);
});

// Export the superWizard scene for use in other modules
export default superWizard;
