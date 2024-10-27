// Import necessary modules from Telegraf
const { Scenes } = require("telegraf");
// Import message filter for handling text messages
const { message } = require('telegraf/filters');

// Import the leave function to handle scene exits
const { leave } = Scenes.Stage;

// Create a new scene called "echo"
const echoScene = new Scenes.BaseScene("echo");

// Handler for when the scene is entered
echoScene.enter(ctx => ctx.reply("Welcom to Echo Scense: Please Send\n text message\n any message\n /back command")); // Send a message when entering the echo scene

// Handler for when the scene is exited
echoScene.leave(ctx => ctx.reply("Echo Scense: exiting echo scene")); // Send a message when leaving the echo scene

// Command to go back from the echo scene to the previous scene
echoScene.command("back", leave()); // Use the leave function to exit the current scene

// Handler for text messages within the scene
echoScene.on(message('text'), ctx => ctx.reply(`Echo Scense: ${ctx.message.text}`)); // Echo back the received text message

// Handler for non-text messages within the scene
echoScene.on("message", ctx => ctx.reply("Echo Scense: Only text messages please")); // Respond to non-text messages with a warning

// Export the echo scene for use in other modules
module.exports = echoScene;
