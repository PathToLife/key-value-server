import { ServerServices, startServer } from './server/server'
import { KvStore } from './store/kvstore'
import { logger } from './utils/logger'
import * as config from './config'

async function main() {
  const services: ServerServices = {
    kvStore: new KvStore(),
  }

  await startServer(services, {
    port: config.PORT,
  })

  logger.info(`${config.MODE} mode`)
}

main().then()
