import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Journal } from '../types/Journal';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private subject = new Subject<Journal>()

  constructor() { }

  setSelectedJournal(journal: Journal) {
    this.subject.next(journal)
  }

  onSelectedJournalChanged() {
    return this.subject.asObservable()
  }
}
