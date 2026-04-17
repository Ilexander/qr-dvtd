import { createServer } from 'node:http'
import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/node'
import { CORSPlugin } from '@orpc/server/plugins'
import { routers } from './router'

const PORT = 3000

const handler = new RPCHandler(routers, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error: Error) => {
      console.error(error)
    }),
  ],
})

const server = createServer(async (req, res) => {
  const result = await handler.handle(req, res, {
    context: { headers: req.headers },
  })

  if (!result.matched) {
    res.statusCode = 404
    res.end('No procedure matched')
  }
})

server.listen(
  PORT,
  '127.0.0.1',
  () => console.log(`🚀 Listening on 127.0.0.1:${PORT}`),
)
