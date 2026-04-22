import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  ADMIN_PASSWORD: z.string(),
  CLIENT_URL: z.string(),
  ADMIN_URL: z.string(),
  ENV: z.enum(['production', 'dev']),
})

export const env = envSchema.parse(process.env)
