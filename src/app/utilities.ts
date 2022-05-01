export function replaceQuillContent(content: string) {
    document.getElementsByClassName('ql-editor ql-blank')[0].innerHTML = content
}