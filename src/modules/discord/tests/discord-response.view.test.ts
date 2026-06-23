import { describe, it, expect } from 'vitest'
import { renderPong, renderMessage } from '../views/discord-response.view.js'
import { makeBotResponse } from '../../../shared/tests/factories.js'

describe('DiscordResponseView', () => {
  it('given pong call, returns type 1', () => {
    // given / when
    const result = renderPong()

    // then
    expect(result.type).toBe(1)
    expect(result.data).toBeUndefined()
  })

  it('given bot response, renders type 4 message with content', () => {
    // given
    const response = makeBotResponse({ content: 'pong. Unfortunately, yes, I am working.' })

    // when
    const result = renderMessage(response)

    // then
    expect(result.type).toBe(4)
    expect(result.data?.content).toBe('pong. Unfortunately, yes, I am working.')
  })

  it('given ephemeral response, sets flags to 64', () => {
    // given
    const response = makeBotResponse({ ephemeral: true })

    // when
    const result = renderMessage(response)

    // then
    expect(result.data?.flags).toBe(64)
  })

  it('given non-ephemeral response, does not set flags', () => {
    // given
    const response = makeBotResponse({ ephemeral: false })

    // when
    const result = renderMessage(response)

    // then
    expect(result.data?.flags).toBeUndefined()
  })
})
