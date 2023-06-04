import { app } from './app'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET value not setted, aborting server...')
}

app
  .listen({
    port: 3333,
  })
  .then(() => console.info('HTTP server running on http://localhost:3333.'))
  .catch((err) => console.error('Fail to run server:', err))
