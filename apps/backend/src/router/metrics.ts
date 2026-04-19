import { os } from '@orpc/server'
import { sql } from 'drizzle-orm'
import { db } from '../db'
import { metricsTable } from '../db/schema/metrics'

export const metrics = os
  .handler(async () => {
    const interval = sql<string>`
    date_trunc('hour', ${metricsTable.createdAt}) +
    INTERVAL '30 min' * FLOOR(EXTRACT(MINUTE FROM ${metricsTable.createdAt}) / 30)
  `

    const result = await db
      .select({
        date: interval,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(metricsTable)
      .groupBy(interval)
      .orderBy(interval)

    return result.map(row => ({ date: new Date(row.date), count: row.count }))
  })
