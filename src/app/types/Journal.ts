export interface BaseJournal {
    title: string,
    content: string,
    htmlContent: string,
    lastEdit: number,
}

export interface Journal extends BaseJournal {
    id?: string
    title: string,
    content: string,
    htmlContent: string,
    lastEdit: number,
    saved?: boolean,
    versions: BaseJournal[],
    storedInDb?: boolean
}