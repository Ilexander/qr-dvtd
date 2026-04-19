import type { AppRouter } from '@backend/src'
import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

const link = new RPCLink({
  url: 'http://127.0.0.1:3000/rpc',
  headers: { Authorization: 'Bearer token' },
})

const client: RouterClient<AppRouter> = createORPCClient(link)
export const orpc = createTanstackQueryUtils(client)
