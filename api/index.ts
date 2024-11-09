import express, { Request, Response } from "express"; // Import Express and its types
import { useWebhook } from "../src/lib";

const app = express(); // Create an Express application

// Middleware to parse JSON bodies
app.use(express.json());

// Main function to handle incoming requests
const handle = async (req: Request, res: Response): Promise<void> => {
	try {
		// Call the useWebhook function to process the request and response
		await useWebhook(req, res);
	} catch (e) {
		// If an error occurs, set the response status to 500 (Internal Server Error)
		res.status(500).set("Content-Type", "text/html");
		// Send an error message to the client
		res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
		// Log the error message to the console for debugging purposes
		console.error((e as Error).message);
	}
};

// Set up an endpoint for your webhook
app.post("/api", handle); // Adjust the route as needed

app.get("/", (req: Request, res: Response) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Webhook Response</title>
			<style>
				body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
				h1 { color: #333; }
				p { color: #555; }
				a { color: #007bff; text-decoration: none; }
			</style>
		</head>
		<body>
			<h1>Bot Is Running</h1>

			<p>You can see a working version of the bot at <a href="https://t.me/TelegrafWebhookTestBot">@TelegrafWebhookTestBot</a></p>
		</body>
		</html>
	`);
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing or further use
export default app;
