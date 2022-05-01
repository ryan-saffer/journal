export interface Journal {
    id?: string,
    title: string,
    content: string,
    htmlContent: string,
    lastEdit: number,
    saved?: boolean
}