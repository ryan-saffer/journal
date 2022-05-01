import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Journal } from '../../types/Journal';

@Component({
  selector: 'journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss'],
})
export class JournalListComponent implements OnInit {

  @Input() journals: Journal[]
  @Output() onJournalClick = new EventEmitter<Journal>()
  @Output() onNewJournalClick = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  handleJournalClicked(journal: Journal) {
    this.onJournalClick.emit(journal)
  }

  handleNewJournalClicked() {
    this.onNewJournalClick.emit()
  }

}
