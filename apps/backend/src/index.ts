import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/node'
import { RequestHeadersPlugin } from '@orpc/server/plugins'
import cors from 'cors'
import express from 'express'
import pino from 'pino-http'
import { routers } from './router'

const PORT = 3000

export const pinoLogger = pino()

const app = express()

app.use(cors())
app.use(pinoLogger)

const handler = new RPCHandler(routers, {
  plugins: [
    new RequestHeadersPlugin(),
  ],
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

app.use('/rpc{/*path}', async (req, res, next) => {
  const { matched } = await handler.handle(req, res, {
    prefix: '/rpc',
    context: {},
  })

  if (matched) {
    return
  }

  next()
})

app.listen(PORT, () => pinoLogger.logger.info(`🚀 Server listening on port ${PORT}`))

export type AppRouter = typeof routers
