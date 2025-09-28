# 🤖 Telegraf Webhook Bot

A production-ready Node.js Telegram Bot built with [Telegraf](https://github.com/telegraf/telegraf), featuring webhook support, session management, scene handling, and Vercel deployment. This bot demonstrates best practices for building scalable Telegram bots with proper error handling, logging, validation, and security measures.

[![Live Demo](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@ehsanmokhtari/node-js-serverless-telegram-bot-with-telegraf-library-and-vercel-deployment-using-webhook-43262c234718)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 🚀 Live Demo

Try the bot: [@TelegrafWebhookTestBot](https://t.me/TelegrafWebhookTestBot)

## ✨ Features

### Core Functionality
- **🤖 Telegram Bot**: Full-featured bot with command handling, message processing, and scene management
- **🔄 Webhook Support**: Real-time event handling with webhook integration for production deployment
- **💾 Session Management**: Persistent user sessions using PostgreSQL with Sequelize ORM
- **🎭 Scene System**: Multi-step conversation flows with Telegraf scenes (echo, greeter, super-wizard)
- **📝 Message Handling**: Support for text messages, stickers, and various media types

### Production Ready
- **🛡️ Security**: Input validation, sanitization, CORS, and Helmet security headers
- **📊 Logging**: Comprehensive logging with Winston (file and console output)
- **⚠️ Error Handling**: Robust error handling with custom error classes and graceful degradation
- **🔍 Health Monitoring**: Health check endpoints and request/response logging
- **🚀 Performance**: Compression, request size limits, and optimized middleware

### Developer Experience
- **📘 TypeScript**: Full TypeScript support with strict type checking
- **🧪 Testing**: Jest testing framework with coverage reporting
- **🔧 Linting**: ESLint with TypeScript rules for code quality
- **📦 Build System**: Automated build process with TypeScript compilation
- **🐳 Docker**: Containerization support for easy deployment

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **PostgreSQL**: Database instance for session storage (Vercel Postgres recommended)
- **Telegram Bot Token**: Create a bot via [@BotFather](https://t.me/BotFather)
- **Vercel Account**: For deployment (optional for local development)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/ehsanmokhtari/telegraf-webhook-bot.git
cd telegraf-webhook-bot
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Telegram Bot Configuration
BOT_TOKEN=your_telegram_bot_token_here

# Environment Configuration
DEV=true
NODE_ENV=development

# Database Configuration
POSTGRES_URL=postgresql://username:password@localhost:5432/database_name

# Optional: Webhook Configuration
WEBHOOK_URL=https://your-domain.vercel.app/api

# Optional: Logging Configuration
LOG_LEVEL=info
```

### 3. Database Setup

Set up your PostgreSQL database:

```bash
# Using Vercel Postgres (recommended)
vercel postgres create my-bot-db

# Or use any PostgreSQL instance
# Update POSTGRES_URL in your .env file
```

### 4. Development

```bash
# Start development server with hot reload
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm test
```

### 5. Production Build

```bash
# Build the project
npm run build

# Start production server
npm start
```
## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set Environment Variables** in Vercel dashboard:
   - `BOT_TOKEN`: Your Telegram bot token
   - `POSTGRES_URL`: Your database connection string
   - `NODE_ENV`: `production`
   - `DEV`: `false`

3. **Set Webhook**:
   ```bash
   curl -F "url=https://your-app.vercel.app/api" \
        https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
   ```

### Docker Deployment

```bash
# Build and run with Docker
docker build -t telegraf-bot .
docker run -p 3000:3000 --env-file .env telegraf-bot
```

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🔧 Bot Commands

- `/start` - Welcome message and command list
- `/help` - Show available commands
- `/greeter` - Enter greeter scene
- `/echo` - Enter echo scene (echoes your messages)
- `/superwizard` - Enter super wizard scene
- Say `hi` - Get a friendly greeting
- Send a sticker - Get a fun response
- Send any text - Get a response

## 📊 Monitoring

- **Health Check**: `GET /health` - Bot status and uptime
- **Logs**: Check `logs/` directory for application logs
- **Metrics**: Response times and error rates logged automatically

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests
- `npm run type-check` - TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Telegraf](https://github.com/telegraf/telegraf) - Telegram Bot Framework
- [Vercel](https://vercel.com) - Serverless Deployment Platform
- [Sequelize](https://sequelize.org) - PostgreSQL ORM
- [Winston](https://github.com/winstonjs/winston) - Logging Library

## 📚 Learn More

- [Medium Article](https://medium.com/@ehsanmokhtari/node-js-serverless-telegram-bot-with-telegraf-library-and-vercel-deployment-using-webhook-43262c234718) - Detailed deployment guide
- [Telegraf Documentation](https://telegraf.js.org/) - Bot framework docs
- [Vercel Documentation](https://vercel.com/docs) - Deployment platform docs