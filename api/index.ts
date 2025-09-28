import express, { Request, Response } from "express"; // Import Express and its types
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { useWebhook } from "../src/lib";
import { validateEnv, validateTelegramUpdate } from "../src/lib/validation";
import { handleWebhookError } from "../src/lib/errorHandler";
import logger from "../src/lib/logger";

// Validate environment variables on startup
try {
  validateEnv();
  logger.info('Environment variables validated successfully');
} catch (error) {
  logger.error('Environment validation failed:', error);
  process.exit(1);
}

const app = express(); // Create an Express application

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for webhook endpoints
}));

// CORS middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://api.telegram.org'] 
    : true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Compression middleware
app.use(compression());

// Middleware to parse JSON bodies with size limit
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Main function to handle incoming requests
const handle = async (req: Request, res: Response): Promise<void> => {
	try {
		// Validate Telegram update for POST requests
		if (req.method === 'POST' && req.body) {
			validateTelegramUpdate(req.body);
		}

		// Call the useWebhook function to process the request and response
		await useWebhook(req, res);
	} catch (e) {
		handleWebhookError(e as Error, req, res);
	}
};

// Set up an endpoint for your webhook
app.post("/api", handle); // Adjust the route as needed

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
	res.json({
		status: "healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		environment: process.env.NODE_ENV,
		version: process.env.npm_package_version || "unknown"
	});
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Telegraf Webhook Bot</title>
			<style>
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					margin: 0; padding: 20px; min-height: 100vh;
					display: flex; align-items: center; justify-content: center;
				}
				.container { 
					background: white; border-radius: 12px; padding: 40px; 
					box-shadow: 0 20px 40px rgba(0,0,0,0.1);
					text-align: center; max-width: 500px;
				}
				h1 { color: #333; margin-bottom: 20px; }
				p { color: #666; line-height: 1.6; margin-bottom: 20px; }
				a { 
					color: #667eea; text-decoration: none; 
					font-weight: 600; border-bottom: 2px solid transparent;
					transition: border-color 0.3s;
				}
				a:hover { border-bottom-color: #667eea; }
				.status { 
					background: #e8f5e8; color: #2d5a2d; 
					padding: 10px; border-radius: 6px; margin: 20px 0;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h1>🤖 Telegraf Webhook Bot</h1>
				<div class="status">✅ Bot is running and ready to receive webhooks</div>
				<p>This is a production-ready Telegram bot built with Node.js, Telegraf, and deployed on Vercel.</p>
				<p>You can see a working version of the bot at <a href="https://t.me/TelegrafWebhookTestBot">@TelegrafWebhookTestBot</a></p>
				<p><a href="/health">Check bot health status</a></p>
			</div>
		</body>
		</html>
	`);
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Export the app for testing or further use
export default app;