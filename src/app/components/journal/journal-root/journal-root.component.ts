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
        this.journals = journals
        this.selectedJournal = journals[0]
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
        lastEdit: Date.now().toLocaleString()
      }
    ]
    this.selectedJournal = this.journals[this.journals.length -1]
    replaceQuillContent('')
  }

}
