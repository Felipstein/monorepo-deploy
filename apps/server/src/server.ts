import { app } from './app'
import { env } from './config/env.config'

if (!env.JWT_SECRET) {
  throw new Error('JWT_SECRET value not setted, aborting server...')
}

const port = Number(env.PORT) || 3333

app
  .listen({ port })
  .then(() => console.info(`HTTP server running on http://localhost:${port}.`))
  .catch((err) => console.error('Fail to run server:', err))
