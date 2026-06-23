import type { Router, RequestHandler } from 'express'

export function registerRoutes(
  router: Router,
  handleInteraction: RequestHandler,
  verifySignature: RequestHandler
): void {
  router.post('/interactions', verifySignature, handleInteraction)
}
