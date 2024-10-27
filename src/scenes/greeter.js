// Import necessary modules from Telegraf
const { Scenes } = require("telegraf");

// Import the enter function to manage scene transitions
const { enter, leave } = Scenes.Stage;

// Create a new scene called "greeter"
const greeterScene = new Scenes.BaseScene("greeter");

// Handler for when the scene is entered
greeterScene.enter(ctx => ctx.reply("Welcome to Greeter Scense: Please Send\n hi message\n any message\n /back command")); // Send a greeting message when entering the greeter scene

// Handler for when the scene is exited
greeterScene.leave(ctx => ctx.reply("Greeter Scense: Bye")); // Send a farewell message when leaving the greeter scene

// Command to go back from the echo scene to the previous scene
greeterScene.command("back", leave()); // Use the leave function to exit the current scene

// Listen for the "hi" message and re-enter the greeter scene
greeterScene.hears("hi", enter("greeter")); // If the user says "hi", re-enter the greeter scene

// Handler for any other messages in the scene
greeterScene.on("message", ctx => ctx.replyWithMarkdownV2("Greeter Scense: Send `hi`")); // Prompt the user to send "hi" using Markdown formatting

// Export the greeter scene for use in other modules
module.exports = greeterScene;
