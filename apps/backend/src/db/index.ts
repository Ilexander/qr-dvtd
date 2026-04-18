import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { pinoLogger } from '..'
import { env } from '../config/env'
import * as schema from './schema'

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

pool.on('connect', () => {
  pinoLogger.logger.info('DB connected')
})

pool.on('error', (err) => {
  pinoLogger.logger.error(err)
})

export const db = drizzle(pool, {
  schema,
})
