import type { AppRouter } from '@backend/src'
import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

const link = new RPCLink({
  url: `${import.meta.env.PROD ? import.meta.env.VITE_SERVER_API : 'http://192.168.100.50:3000'}/rpc`,
  headers: { Authorization: 'Bearer token' },
})

const client: RouterClient<AppRouter> = createORPCClient(link)
export const orpc = createTanstackQueryUtils(client)
