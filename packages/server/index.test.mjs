import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { build } from './routes.mjs'
import { multipleCommentsInput, expectedMarkdown } from '../core/index.test.mjs'

describe('Hello world', () => {
  it('responds 200 with the / route', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: '/'
    })

    assert.equal(response.statusCode, 200)
  })

  it('returns correct documentation', async () => {
    const app = build()

    const response = await app.inject({
      method: 'POST',
      url: '/generate',
      payload: multipleCommentsInput,
      headers: {
        'Content-Type': 'text/plain'
      }
    })

    assert.equal(response.body, expectedMarkdown)
  })
})