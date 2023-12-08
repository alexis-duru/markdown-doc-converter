import compose from 'lodash/fp/compose.js'

export const startIdentifier = '/*DOC'
export const endIdentifier = '*/'
export const mdBlankLine = '\n\n'
export const mdSeparator = `${mdBlankLine}---${mdBlankLine}`

export function getCommentsFromText(text) {
    const comments = []
    let comment = {
        text: '',
        line: null,
    }
    const formattedText = text.split('\n').entries()
    let inComment = false

    for (const [index, line] of formattedText) {
        if (inComment) {
            if (!line.includes(endIdentifier)) {
                comment.text += line
            } else {
                inComment = false
                comment.line = index + 2
                comments.push(comment)
                comment = {
                    text: '',
                    line: null,
                }
            }
        }

        if (line.includes(startIdentifier)) {
            inComment = true
        }
    }

    return comments
}

export function createMarkdownFromComments(comments) {
    let markdown = `# Documentation

  `

    const markdownComments = comments.map((comment) => {
        return `> ${comment.text}${mdBlankLine}_line ${comment.line}_${mdSeparator}`
    })

    markdown += markdownComments.join('\n')

    return markdown
}

export const generateDocumentation = compose(
    createMarkdownFromComments,
    getCommentsFromText
)
