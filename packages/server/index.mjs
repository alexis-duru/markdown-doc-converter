import { build } from './routes.mjs'

const server = build()

try {
  await server.listen({ port: 3000 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}