import { Journal } from '../../../types/Journal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { unixToString } from 'src/app/utilities';


@Component({
  selector: 'journal-list-item',
  templateUrl: './journal-list-item.component.html',
  styleUrls: ['./journal-list-item.component.scss'],
})
export class JournalListItemComponent implements OnInit {

  @Input() journal: Journal
  @Input() selectedJournal: Journal
  @Output() onJournalClicked = new EventEmitter<Journal>()
  @Output() onDeleteClicked = new EventEmitter<Journal>()

  isModalOpen = false

  constructor() { }

  ngOnInit() {}

  handleClick() {
    this.onJournalClicked.emit(this.journal)
  }

  handleDeleteClick() {
    this.onDeleteClicked.emit(this.journal)
  }

  unixToString(millis: number) {
    return unixToString(millis)
  }

  showVersionsModal() {
    this.isModalOpen = true
  }

  resetModal() {
    this.isModalOpen = false
  }
}
