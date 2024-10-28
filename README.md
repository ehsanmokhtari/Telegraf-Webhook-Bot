# Node.js Telegram Bot with Telegraf Webhook and Vercel Deployment

This project demonstrates how to create a Telegram bot using Node.js and the [Telegraf](https://github.com/telegraf/telegraf) library. The bot utilizes webhooks for event handling, allowing it to respond to user interactions in real-time. The bot is deployed on [Vercel](https://vercel.com), providing a serverless environment for easy scalability and management. It can handle various commands and messages, manage user sessions, and handle complex interactions through scenes.

[![Live Demo](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/)

## Features

- Webhook Integration: Utilizes webhooks for real-time event handling and user interaction responses.
- Command Handling: Supports various commands to enhance user experience and functionality.
- Message Management: Efficiently manages incoming messages for seamless communication.
- User Session Management: Keeps track of user sessions for personalized interactions.
- Scene Handling: Facilitates complex interactions through scenes, allowing for multi-step conversations.
- Scalability: Deployed on Vercel, enabling easy scalability in a serverless environment.
- Easy Deployment: Simplifies deployment and management through Vercel's platform.
- Real-time Responses: Provides immediate feedback to users, enhancing engagement.

## Prerequisites

- Node.js: Version 14 or higher installed on your machine.
- npm: Comes with Node.js; ensure it is updated.
- PostgreSQL Database: A PostgreSQL instance to store session data. We utilize Vercel Storage for this purpose.
- Telegram Bot Token: Create a bot using BotFather and obtain your bot token.
- Vercel Account: Sign up for a free account at Vercel.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ehsanmokhtari/telegraf-webhook-bot.git
   cd telegraf-webhook-bot

2. Install the dependencies:

   ```bash
   npm install
   ```
   
### Configuration

Create a .env file based on the .env.example file provided in the project directory:

   ```bash
   cp .env.example .env
   ```
Then, Update the .env file with your specific configuration, including your Telegram bot token and database connection details.

   ```plaintext
   BOT_TOKEN = "<YOUR_BOT_TOKEN>"
   DEV = true
   POSTGRES_HOST = "<POSTGRES_DATABASE_HOST>"
   POSTGRES_DATABASE = "<POSTGRES_DATABASE>"
   POSTGRES_USER = "<POSTGRES_DATABASE_USER>"
   POSTGRES_PASSWORD = "<POSTGRES_DATABASE_PASSWORD>"
   ```

### Running the Bot 

To run your bot locally, use the following command:

   ```bash
   npm run dev
   ```
## Vercel Deployment

For detailed instructions on deploying your bot to Vercel, check out the Medium article that explains the process step-by-step, including setting up your project, configuring environment variables, and managing deployments.

[![Live Demo](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/)

## Handling Webhooks

This bot is configured to handle webhooks, allowing it to receive updates from Telegram in real-time. When deployed, you can set the webhook URL to point to your Vercel deployment.

To set the webhook, use the following command, replacing YOUR_VERCEL_URL with your actual Vercel deployment URL:

   ```bash
   curl -F "url=https://<YOUR_VERCEL_URL>/api" https://api.telegram.org/bot<TOKEN>/setWebhook
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Demo

You can see a working version of the bot at [@TelegrafWebhookTestBot](https://t.me/TelegrafWebhookTestBot)