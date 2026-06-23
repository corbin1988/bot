import { env } from './config/env.js'
import { buildApp } from './app.js'

const app = buildApp()

app.listen(env.PORT, () => {
  console.log(`kyle-bot-1000 listening on port ${env.PORT}`)
})
