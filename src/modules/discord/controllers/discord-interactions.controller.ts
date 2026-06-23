import type { Request, Response } from 'express'

export const handleInteraction = (_req: Request, res: Response): void => {
  // TODO: verify signature, parse interaction, route to command handler
  res.status(200).json({ type: 1 })
}
