# kyle-bot-1000

A bot that reduces vague, repeated, and poorly scoped project requests.

## What it does

The bot guides users through structured workflows instead of accepting free-form chaos. It supports slash commands for pinging the bot, starting a guided menu, and submitting a documented request that gets emailed to the right person.

## Commands

| Command | Description |
|---|---|
| `/ping` | Confirms the bot is running |
| `/start` | Shows the greeting and structured option menu |
| `/request` | Starts a multi-step request submission workflow |

## Setup

1. Copy `.env.example` to `.env` and fill in the required values
2. `npm install`
3. `npm run dev`

## Environment Variables

```env
PORT=3000

DISCORD_PUBLIC_KEY=
DISCORD_APPLICATION_ID=
DISCORD_TOKEN=

REQUEST_EMAIL_TO=
REQUEST_EMAIL_FROM=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## Scripts

```bash
npm run dev               # Start the server
npm run typecheck         # Type-check without emitting
npm run register:commands # Register slash commands with Discord
npm test                  # Run tests
```
