import { AuthService } from './../../../services/auth.service';
import { replaceQuillContent } from 'src/app/utilities';
import { JournalService } from './../../../services/journal.service';
import { Component, OnInit } from '@angular/core';
import { Journal } from '../../../types/Journal';

var id = 0;

@Component({
  selector: 'app-journal',
  templateUrl: './journal-root.component.html',
  styleUrls: ['./journal-root.component.scss'],
})
export class JournalRootComponent implements OnInit {

  journals: Journal[] = []
  selectedJournal: Journal
  isLoading = true

  constructor(
    private journalService: JournalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.journalService.getJournals()
      .subscribe(journals => {
        this.journals = journals.docs.map(journal => ({
              id: journal.id,
              storedInDb: true,
              ...journal.data()
            }
        ))
        this.journals.sort((first, second) => second.lastEdit - first.lastEdit)
        this.selectedJournal = this.journals[0]
        this.isLoading = false
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
        id: (id++).toString(),
        title: 'New journal entry',
        content: '',
        htmlContent: '',
        lastEdit: Date.now(),
        saved: false,
        versions: [],
        storedInDb: false
      }
    ]
    this.selectedJournal = this.journals[this.journals.length - 1]
    if (this.journals.length !== 1) {
      replaceQuillContent('')
    }
  }

  handleSave(journal: Journal) {
    if (journal.storedInDb) { // only documents with firebase ids can be updated
      this.journalService.updateJournal(journal)
        .then((updatedJournal) => {
          // replace the old version with the new version (includes all the edits)
          this.journals.forEach((item, index) => {
            if (item.id === journal.id) {
              this.journals[index] = updatedJournal
            }
          })
          this.selectedJournal = updatedJournal
        })
    } else { // new documents need an id created
      this.journalService.addJournal(journal)
        .subscribe(newJournal => {
          // now that the journal has been saved, replace its id with the firestore id
          let updatedJournal: Journal = {
            ...journal,
            id: newJournal.id,
            storedInDb: true,
            saved: true
          }
          this.journals = [
            ...this.journals.filter(it => it.id !== journal.id),
            updatedJournal
          ]
          // and ensure we set it as selected... or any new saves won't be using the correct id
          this.selectedJournal = updatedJournal
        })
    }
  }

  handleDeleteJournalClick(journal: Journal) {
    this.journalService.deleteJournal(journal)
      .subscribe(() => this.journals = this.journals.filter(it => it.id !== journal.id))
  }

  signOut() {
    this.authService.SignOut()
  }
}
