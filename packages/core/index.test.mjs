import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
    getCommentsFromText,
    createMarkdownFromComments,
    startIdentifier,
    endIdentifier,
} from './index.mjs'

const singleCommentInput = `
${startIdentifier}
This is a comment
${endIdentifier}
function test() {}
`

export const multipleCommentsInput = `
${startIdentifier}
This is a comment
${endIdentifier}
function test() {}

${startIdentifier}
This is a second comment
${endIdentifier}
function test() {}
`

const commentArray = [{ text: 'This is a comment', line: 5 }]
const commentsArray = [
    { text: 'This is a comment', line: 5 },
    { text: 'This is a second comment', line: 10 },
]

export const expectedMarkdown =
    '# Documentation\n\n  > This is a comment\n\n_line 5_\n\n---\n\n\n> This is a second comment\n\n_line 10_\n\n---\n\n'

describe('Get comments from text', () => {
    it('add a single comment to the comments list', () => {
        assert.deepEqual(getCommentsFromText(singleCommentInput), commentArray)
    })

    it('add a multiple comments to the comments list', () => {
        assert.deepEqual(
            getCommentsFromText(multipleCommentsInput),
            commentsArray
        )
    })
})

describe('Create Markdown from comments', () => {
    it('correctly generates markdown', () => {
        assert.deepEqual(
            createMarkdownFromComments(commentsArray),
            expectedMarkdown
        )
    })
})
