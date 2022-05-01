export function replaceQuillContent(content: string) {
    let blank = document.getElementsByClassName('ql-editor ql-blank')[0]
    if (blank) {
        blank.innerHTML = content
    } else {
        document.getElementsByClassName('ql-editor')[0].innerHTML = content
    }
}