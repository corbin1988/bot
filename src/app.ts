import express, { type Request, type RequestHandler } from 'express'
import { handleInteraction } from './modules/discord/controllers/discord-interactions.controller.js'
import { registerRoutes as registerDiscordRoutes } from './modules/discord/discord.routes.js'

export interface SetupOptions {
  verifySignature?: (req: Request) => boolean
}

export function buildApp(options?: SetupOptions): express.Application {
  const app = express()
  app.use(express.json())

  const sigCheck = options?.verifySignature
  const verifyMiddleware: RequestHandler = sigCheck
    ? (req, res, next) => (sigCheck(req) ? next() : res.status(401).end())
    : (_req, _res, next) => next()

  const discordRouter = express.Router()
  registerDiscordRoutes(discordRouter, handleInteraction, verifyMiddleware)
  app.use('/', discordRouter)

  return app
}
