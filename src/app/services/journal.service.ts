import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Journal } from '../components/types/Journal';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private firestore: AngularFirestore) { }

  getJournals(): Observable<QuerySnapshot<Journal>> {
    return from(this.firestore.collection<Journal>('journals').ref.get())
  }

  addJournal(journal: Journal) {
    // first sanitize the object of any values we don't want in the db
    // ideally this could be done with typing, but need to find a cleaner way
    const { id, saved, storedInDb, ...sanitizedJournal } = journal
    let journalToWrite = {
      ...sanitizedJournal,
      versions: []
    }
    return from(this.firestore.collection('journals').add(journalToWrite))
  }

  updateJournal(journal: Journal) {
    // first sanitize the object of any values we don't want in the db
    // ideally this could be done with typing, but need to find a cleaner way
    const { id, saved, storedInDb, ...sanitizedJournal } = journal
    // start by getting the current version in db, to store in versions
    return new Promise<Journal>(resolve => {
      this.firestore.doc<Journal>(`journals/${id}`).get()
        .subscribe(snapshot => {
          let data = snapshot.data()
          const { versions, ...existingJournal } = data
          // then replace current version with latest, while adding in the existing one to versions
          let updatedJournal: Journal = {
            ...sanitizedJournal,
            versions: [
              ...versions,
              existingJournal
            ]
          }
          this.firestore.doc<Journal>(`journals/${journal.id}`).update(updatedJournal)
          resolve({
            ...updatedJournal,
            id,
            storedInDb,
            saved: true
          })
        })
    })
  }

  deleteJournal(journal: Journal) {
    return from(this.firestore.doc(`journals/${journal.id}`).delete())
  }

}