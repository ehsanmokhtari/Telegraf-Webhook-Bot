import { Scenes } from "telegraf"; // Import necessary modules from Telegraf
import { MyContext } from "../lib/telegraf";

const { enter, leave } = Scenes.Stage;
// Create a new scene called "greeter"
const greeterScene = new Scenes.BaseScene<MyContext>("greeter");

// Handler for when the scene is entered
greeterScene.enter((ctx) => {
	const helpMessage =
		"Welcome to the Greeter Scene! Here’s how to use it:\n\n" +
		"1. Send 'hi' to re-enter the greeter scene.\n" +
		"2. If you want to exit this scene, type /back.\n" +
		"3. I will prompt you to send 'hi' if you send any other message.";

	ctx.reply(helpMessage);
}); // Send a greeting message when entering the greeter scene

// Handler for when the scene is exited
greeterScene.leave((ctx) => ctx.reply("Greeter Scene: Bye")); // Send a farewell message when leaving the greeter scene

// Command to go back from the echo scene to the previous scene
greeterScene.command("back", leave<MyContext>()); // Use the leave function to exit the current scene

// Listen for the "hi" message and re-enter the greeter scene
greeterScene.hears("hi", enter<MyContext>("greeter")); // If the user says "hi", re-enter the greeter scene

// Handler for any other messages in the scene
greeterScene.on("message", (ctx) =>
	ctx.replyWithMarkdownV2("Greeter Scene: Send `hi`")
); // Prompt the user to send "hi" using Markdown formatting

// Export the greeter scene for use in other modules
export default greeterScene; // Use export default for TypeScript compatibility
