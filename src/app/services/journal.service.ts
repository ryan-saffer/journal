import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Journal } from '../components/types/Journal';
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
    return from(this.firestore.collection('journals').add(journal))
  }

  updateJournal(journal: Journal) {
    return from(this.firestore.doc(`journals/${journal.id}`).update(journal))
  }

  deleteJournal(journal: Journal) {
    return from(this.firestore.doc(`journals/${journal.id}`).delete())
  }

}
