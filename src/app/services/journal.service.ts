import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Journal, JournalDb } from '../components/types/Journal';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private firestore: AngularFirestore) { }

  getJournals(): Observable<DocumentChangeAction<Journal>[]> {
    const journalsCollection = this.firestore.collection<Journal>('journals')
    return journalsCollection.snapshotChanges()
  }

  addJournal(journal: Journal) {
    let journalToWrite = {
      ...journal,
      versions: []
    }
    return from(this.firestore.collection<JournalDb>('journals').add(journalToWrite))
  }

  updateJournal(journal: Journal) {
    // first add current version to history
    this.firestore.doc<JournalDb>(`journals/${journal.id}`).get()
      .subscribe(snapshot => {
        let data = snapshot.data()
        const { versions, ...existingJournal } = data
        let newJournal = {
          ...journal,
          versions: [
            ...versions,
            existingJournal
          ]
        }
        this.firestore.doc(`journals/${journal.id}`).update(newJournal)
      })
  }

  deleteJournal(journal: Journal) {
    return from(this.firestore.doc(`journals/${journal.id}`).delete())
  }

}
