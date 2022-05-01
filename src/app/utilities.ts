export function replaceEmptyQuillContent(content: string) {
    document.getElementsByClassName('ql-editor ql-blank')[0].innerHTML = content
}

export function replaceQuillContent(content: string) {
    document.getElementsByClassName('ql-editor')[0].innerHTML = content
}