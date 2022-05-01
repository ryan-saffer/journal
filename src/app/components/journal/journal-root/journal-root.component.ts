import { replaceQuillContent } from 'src/app/utilities';
import { JournalService } from './../../../services/journal.service';
import { Component, OnInit } from '@angular/core';
import { Journal } from '../../types/Journal';

@Component({
  selector: 'app-journal',
  templateUrl: './journal-root.component.html',
  styleUrls: ['./journal-root.component.scss'],
})
export class JournalRootComponent implements OnInit {

  journals: Journal[] = []
  selectedJournal: Journal

  constructor(private journalService: JournalService) { }

  ngOnInit() {
    this.journalService.getJournals()
      .subscribe(journals => {
        this.journals = journals.map(action => {
          return {
            id: action.payload.doc.id,
            ...action.payload.doc.data(),
          }
        })
        this.selectedJournal = this.journals[0]
      })
  }

  handleJournalClick(journal: Journal) {
    this.selectedJournal = journal
    replaceQuillContent(journal.htmlContent)
  }

  handleNewJournalClick() {
    this.journals = [
      ...this.journals,
      {
        title: 'New journal entry',
        content: '',
        htmlContent: '',
        lastEdit: Date.now(),
        saved: false
      }
    ]
    this.selectedJournal = this.journals[this.journals.length - 1]
    if (this.journals.length !== 1) {
      replaceQuillContent('')
    }
  }

  handleSave(journal: Journal) {
    const { saved, ...rest } = journal
    if (journal.id) { // only existing documents will have an id, and can be updated
      this.journalService.updateJournal(rest)
    } else { // new documents need an id created
      this.journalService.addJournal(rest)
    }
  }

  handleDeleteJournalClick(journal: Journal) {
    if (journal.id) {
      this.journalService.deleteJournal(journal)
        .subscribe(() => this.journals = this.journals.filter(it => it.id !== journal.id))
    } else {
      window.alert('Journal has not yet been saved!')
    }
  }
}
