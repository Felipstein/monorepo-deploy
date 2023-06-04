import chalk from 'chalk'

import { app } from './app'

if (!process.env.JWT_SECRET) {
  throw new Error(chalk.red('JWT_SECRET value not setted, aborting server...'))
}

app
  .listen({
    port: 3333,
  })
  .then(() =>
    console.info(chalk.green('HTTP server running on http://localhost:3333.')),
  )
  .catch((err) => console.error(chalk.red('Fail to run server:', err)))
