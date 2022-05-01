import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { Journal } from '../components/types/Journal';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = "http://localhost:3000/journals"

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

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

}
