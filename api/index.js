// Import the useWebhook function from the specified module
const { useWebhook } = require("../src/lib");

// Main function to handle incoming requests
async function handle(req, res) {
    try {
        // Call the useWebhook function to process the request and response
        await useWebhook(req, res);
    } catch (e) {
        // If an error occurs, set the response status to 500 (Internal Server Error)
        res.statusCode = 500;
        // Set the Content-Type header to HTML
        res.setHeader("Content-Type", "text/html");
        // Send an error message to the client
        res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
        // Log the error message to the console for debugging purposes
        console.error(e.message);
    }
}

// Export the handle function for use in other modules
module.exports = handle;
