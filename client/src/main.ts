import { marked } from 'marked';

const apiUrl = 'http://localhost:3000/generate';

function postCode(input: string) {
    return fetch(apiUrl, {
        method: 'POST',
        body: input,
    })
}

// const testCode = `
// /*DOC
// Hello I'm a comment
// */
// `

const inputArea = document.querySelector('#input') as HTMLTextAreaElement;
const generateButton = document.querySelector('#generate') as HTMLButtonElement; 
const renderArea = safeQuerySelector('#render');


function safeQuerySelector(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element with selector ${selector} not found`);
    }
    return element;
}


generateButton.addEventListener('click', async () => {
    try {
        const response = await postCode(inputArea.value).then(res => res.text());
        console.log(response)
        renderArea.innerHTML = await marked.parse(response);
    }
    catch (e) {
        console.log(e);
    }
  });

export {}