// Import necessary modules from Telegraf
import { Scenes } from 'telegraf';
// Import message filter for handling text messages
import { message } from 'telegraf/filters';
import { MyContext } from '../telegraf';

// Import the leave function to handle scene exits
const { leave } = Scenes.Stage;

// Create a new scene called "echo"
const echoScene = new Scenes.BaseScene<MyContext>("echo");

// Handler for when the scene is entered
echoScene.enter((ctx) => ctx.reply("Welcome to Echo Scene: Please Send\n text message\n any message\n /back command")); // Send a message when entering the echo scene

// Handler for when the scene is exited
echoScene.leave((ctx) => ctx.reply("Echo Scene: exiting echo scene")); // Send a message when leaving the echo scene

// Command to go back from the echo scene to the previous scene
echoScene.command("back", leave<MyContext>()); // Use the leave function to exit the current scene

// Handler for text messages within the scene
echoScene.on(message('text'), (ctx) => ctx.reply(`Echo Scene: ${ctx.message.text}`)); // Echo back the received text message

// Handler for non-text messages within the scene
echoScene.on("message", (ctx) => ctx.reply("Echo Scene: Only text messages please")); // Respond to non-text messages with a warning

// Export the echo scene for use in other modules
export default echoScene;