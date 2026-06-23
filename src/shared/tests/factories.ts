import { faker } from '@faker-js/faker'
import type { BotResponse } from '../models/bot-response.js'

export function makeBotResponse(overrides?: Partial<BotResponse>): BotResponse {
  return {
    content: faker.lorem.sentence(),
    ...overrides,
  }
}

export function makeDiscordPingPayload() {
  return { type: 1 }
}

export function makeDiscordCommandPayload(overrides?: { name?: string; userId?: string }) {
  return {
    type: 2,
    id: faker.string.uuid(),
    token: faker.string.alphanumeric(32),
    member: {
      user: {
        id: overrides?.userId ?? faker.string.uuid(),
        username: faker.internet.username(),
      },
    },
    data: {
      name: overrides?.name ?? 'ping',
    },
  }
}
