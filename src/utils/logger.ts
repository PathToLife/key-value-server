import winston, { createLogger, transports } from 'winston'

export const logger = createLogger({
  format: winston.format.simple(),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
  ],
})
