import type { RequestHeadersPluginContext } from '@orpc/server/plugins'
import { ORPCError, os } from '@orpc/server'
import { eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '../db'
import { metricsTable } from '../db/schema/metrics'

export const auth = os
  .$context<RequestHeadersPluginContext>()
  .input(
    z.object({
      uuid: z.string(),
    }),
  )
  .handler(async ({ context, input }) => {
    const userAgent = context.reqHeaders?.get('user-agent')

    return db.transaction(async (tx) => {
      const existedMetric = await tx.query.metricsTable.findFirst({
        where: eq(metricsTable.uuid, input.uuid),
      })

      if (existedMetric) {
        throw new ORPCError('BAD_REQUEST', { message: 'User registred' })
      }

      await tx.insert(metricsTable).values({
        userAgent,
        uuid: input.uuid,
      })
    })
  })
