import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { buildApp } from '../../../app.js'
import { makeDiscordPingPayload } from '../../../shared/tests/factories.js'

describe('POST /interactions', () => {
  it('given Discord PING, returns type 1 pong', async () => {
    // given
    const app = buildApp({ verifySignature: () => true })
    const payload = makeDiscordPingPayload()

    // when
    const res = await request(app).post('/interactions').send(payload)

    // then
    expect(res.status).toBe(200)
    expect(res.body.type).toBe(1)
  })

  it('given invalid signature, returns 401', async () => {
    // given
    const app = buildApp({ verifySignature: () => false })
    const payload = makeDiscordPingPayload()

    // when
    const res = await request(app).post('/interactions').send(payload)

    // then
    expect(res.status).toBe(401)
  })
})
