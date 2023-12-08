import Fastify from 'fastify'
import { generateDocumentation } from '../core/index.mjs'

export function build() {
  const fastify = Fastify()
  fastify.get('/', function getHomepage() {
    return { hello: 'world' }
  })

  fastify.post('/generate', function postDocumentation(request) {
    return generateDocumentation(request.body)
  })
  return fastify
}

