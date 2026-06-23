import type { BotResponse } from '../../../shared/models/bot-response.js'

export interface DiscordInteractionResponse {
  type: number
  data?: {
    content: string
    flags?: number
  }
}

export function renderPong(): DiscordInteractionResponse {
  return { type: 1 }
}

export function renderMessage(response: BotResponse): DiscordInteractionResponse {
  return {
    type: 4,
    data: {
      content: response.content,
      ...(response.ephemeral ? { flags: 64 } : {}),
    },
  }
}
