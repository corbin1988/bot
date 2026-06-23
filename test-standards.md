# Test Standards

## Stack

| Tool | Purpose |
|---|---|
| `vitest` | Test runner |
| `supertest` | HTTP layer for feature tests |
| `@types/supertest` | Types |
| `@faker-js/faker` | Randomised factory data |

No database. No testcontainers.

---

## Test Layers

### Unit Tests (`src/modules/<module>/tests/<name>.test.ts`)

- Instantiate services directly with hand-written in-memory mocks
- No HTTP, no Express app, no environment variables
- `setup()` helpers extract shared boilerplate
- GWT style: `// given`, `// when`, `// then`
- Test names: `given X, does Y`

**What to unit test:**
- `command-router.service.ts` — command dispatch logic
- `request-workflow.service.ts` — state transitions
- `email.service.ts` — message construction (mock the SMTP transport)
- `discord-response.view.ts` — shape of Discord response payloads

**Example:**
```ts
describe('CommandRouterService', () => {
  it('given ping command, returns pong response', async () => {
    // given
    const { router } = setup()
    const event = makeBotEvent({ command: 'ping' })
    // when
    const result = await router.handle(event)
    // then
    expect(result.content).toBe('pong. Unfortunately, yes, I am working.')
  })
})
```

---

### Feature Tests (`src/modules/<module>/tests/<name>.feature.test.ts`)

- Spin up the real Express app in-process using `buildApp()`
- Use Supertest to make real HTTP requests — no manual `app.listen()`
- No DB, no container setup, no shared state between tests
- Discord signature verification is bypassed via a functional option passed to `buildApp()`
- External side-effects (email) are swapped via `SetupOptions`
- Each test builds a fresh app instance

**`buildApp` options interface:**
```ts
export interface SetupOptions {
  emailService?: EmailService
  verifySignature?: (req: Request) => boolean  // defaults to real Discord verification
}
```

**What to feature test:**
- Interaction endpoint rejects requests with invalid Discord signatures
- `/ping` interaction returns the correct response shape
- `/start` interaction returns the menu payload
- `/request` workflow steps return correct interaction response shapes

**Example:**
```ts
describe('POST /interactions', () => {
  it('given valid ping interaction, returns pong message', async () => {
    // given
    const app = buildApp({ verifySignature: () => true })
    const payload = makeInteractionPayload({ type: 'APPLICATION_COMMAND', name: 'ping' })
    // when
    const res = await request(app).post('/interactions').send(payload)
    // then
    expect(res.status).toBe(200)
    expect(res.body.data.content).toBe('pong. Unfortunately, yes, I am working.')
  })
})
```

---

## Factories

Use `@faker-js/faker` for defaults. Overrides are always optional via `Partial<T>`.

```ts
// src/shared/tests/factories.ts
import { faker } from '@faker-js/faker'

export function makeBotEvent(overrides?: Partial<BotEvent>): BotEvent {
  return {
    command: 'ping',
    userId: faker.string.uuid(),
    ...overrides,
  }
}

export function makeRequest(overrides?: Partial<Request>): Request {
  return {
    requesterName: faker.person.fullName(),
    requesterDiscordUserId: faker.string.uuid(),
    requestType: 'status_question',
    summary: faker.lorem.sentence(),
    details: faker.lorem.paragraph(),
    urgency: 'normal',
    blockingCategory: null,
    relatedJiraKey: null,
    deadline: null,
    createdAt: faker.date.recent(),
    ...overrides,
  }
}
```

One factory file per domain if the domain has meaningful model variation.

---

## Mock Pattern

Hand-written mocks only. No `jest-mock-extended`.

```ts
function makeEmailService(overrides?: Partial<EmailService>): EmailService {
  return {
    send: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}
```

---

## File Locations

```
src/modules/bot/tests/command-router.service.test.ts
src/modules/discord/tests/discord-response.view.test.ts
src/modules/discord/tests/discord-interactions.feature.test.ts
src/modules/requests/tests/request-workflow.service.test.ts
src/modules/email/tests/email.service.test.ts
src/shared/tests/factories.ts
```

---

## Rules

- GWT separators in every test: `// given`, `// when`, `// then`
- Test names read as `given X, does Y`
- Feature tests never mock repositories or services — only swap external I/O
- Unit tests never start an HTTP server or touch the filesystem
- Do not test Discord SDK internals
- Do not snapshot Discord payloads — assert specific fields
- Do not hardcode real credentials in any test file
