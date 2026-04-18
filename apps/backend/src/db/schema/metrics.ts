import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const metricsTable = pgTable('metrics', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar().notNull(),
  userAgent: varchar(),
  createdAt: timestamp().defaultNow(),
})
