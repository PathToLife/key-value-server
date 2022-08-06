import express from 'express'
import { KvStore } from '../store/kvstore'
import morgan from 'morgan'
import { kvRouter } from './handlers/kvRouter'
import cors from 'cors'
import { logger } from '../utils/logger'

export interface ServerServices {
  kvStore: KvStore
}

export interface ServerConfig {
  port: number
}

class WinstonLoggerStream {
  write(text: string) {
    logger.info(text)
  }
}

export function createServer(services: ServerServices) {
  const app = express()

  app.use(morgan('combined', { stream: new WinstonLoggerStream() }))
  app.use(
    cors({
      origin: '*',
    })
  )

  app.get('/', (_, res) => res.send('OK'))
  app.use(kvRouter(services.kvStore))
  return app
}

export async function startServer(
  services: ServerServices,
  serverConfig: ServerConfig
) {
  const app = createServer(services)

  await new Promise<void>((resolve) => app.listen(serverConfig.port, resolve))
  logger.info(`kv server started ${serverConfig.port}`)

  return app
}
