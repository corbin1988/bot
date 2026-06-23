import 'dotenv/config'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  PORT: parseInt(process.env['PORT'] ?? '3000', 10),
  DISCORD_PUBLIC_KEY: requireEnv('DISCORD_PUBLIC_KEY'),
  DISCORD_APPLICATION_ID: requireEnv('DISCORD_APPLICATION_ID'),
  DISCORD_TOKEN: requireEnv('DISCORD_TOKEN'),
  REQUEST_EMAIL_TO: requireEnv('REQUEST_EMAIL_TO'),
  REQUEST_EMAIL_FROM: requireEnv('REQUEST_EMAIL_FROM'),
  SMTP_HOST: requireEnv('SMTP_HOST'),
  SMTP_PORT: parseInt(requireEnv('SMTP_PORT'), 10),
  SMTP_USER: requireEnv('SMTP_USER'),
  SMTP_PASS: requireEnv('SMTP_PASS'),
}
