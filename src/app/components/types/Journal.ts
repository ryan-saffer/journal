interface BaseJournal {
    title: string,
    content: string,
    htmlContent: string,
    lastEdit: number
}

export interface Journal extends BaseJournal {
    id?: string,
    saved?: boolean
}

export interface JournalDb extends BaseJournal {
    versions: Journal[]
}