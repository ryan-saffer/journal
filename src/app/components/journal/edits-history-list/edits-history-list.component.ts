import { Component, Input, OnInit } from '@angular/core';
import { unixToString } from 'src/app/utilities';
import { BaseJournal } from '../../types/Journal';

@Component({
  selector: 'edits-history-list',
  templateUrl: './edits-history-list.component.html',
  styleUrls: ['./edits-history-list.component.scss'],
})
export class EditsHistoryListComponent implements OnInit {

  @Input() journals: BaseJournal[]

  isModalOpen = false
  selectedJournal: BaseJournal

  constructor() { }

  ngOnInit() {}

  unixToString(millis: number) {
    return unixToString(millis)
  }

  setModalOpen(journal: BaseJournal) {
    this.isModalOpen = true
    this.selectedJournal = journal
  }

  resetModal() {
    this.isModalOpen = false
  }

}
